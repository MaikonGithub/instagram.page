function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export type AmbientSample = {
  forceX: number;
  forceY: number;
  scrollImpulse: number;
  windX: number;
  windY: number;
  roseX: number;
  roseY: number;
};

export class AmbientMotion {
  private pointer = { x: 0, y: 0, active: false };
  private tilt = { x: 0, y: 0 };
  private force = { x: 0, y: 0 };
  private rose = { x: 88, y: 10 };
  private scrollImpulse = 0;
  private lastScroll = 0;
  private width = 1;
  private height = 1;

  setViewport(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  bind(target: Window) {
    this.lastScroll = target.scrollY;

    const onPointer = (event: PointerEvent) => {
      this.pointer.active = true;
      this.pointer.x = event.clientX / this.width - 0.5;
      this.pointer.y = event.clientY / this.height - 0.5;
    };
    const onPointerLeave = () => {
      this.pointer.active = false;
    };
    const onScroll = () => {
      const next = target.scrollY;
      this.scrollImpulse += (next - this.lastScroll) * 0.02;
      this.lastScroll = next;
    };
    const onOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma == null || event.beta == null) return;
      this.tilt.x = clamp(event.gamma / 30, -1, 1);
      this.tilt.y = clamp((event.beta - 40) / 35, -1, 1);
    };

    target.addEventListener("pointermove", onPointer);
    target.addEventListener("pointerdown", onPointer);
    target.addEventListener("pointerup", onPointerLeave);
    target.addEventListener("pointercancel", onPointerLeave);
    target.addEventListener("blur", onPointerLeave);
    target.addEventListener("scroll", onScroll, { passive: true });
    target.addEventListener("deviceorientation", onOrientation);

    return () => {
      target.removeEventListener("pointermove", onPointer);
      target.removeEventListener("pointerdown", onPointer);
      target.removeEventListener("pointerup", onPointerLeave);
      target.removeEventListener("pointercancel", onPointerLeave);
      target.removeEventListener("blur", onPointerLeave);
      target.removeEventListener("scroll", onScroll);
      target.removeEventListener("deviceorientation", onOrientation);
    };
  }

  step(time: number): AmbientSample {
    const targetX = (this.pointer.active ? this.pointer.x : 0) + this.tilt.x;
    const targetY = (this.pointer.active ? this.pointer.y : 0) + this.tilt.y;
    this.force.x += (targetX - this.force.x) * 0.06;
    this.force.y += (targetY - this.force.y) * 0.06;
    this.scrollImpulse *= 0.9;

    const pointerAcross = this.pointer.active ? this.pointer.x + 0.5 : 0.82 + this.tilt.x * 0.45;
    const pointerDown = this.pointer.active ? this.pointer.y + 0.5 : 0.12 + this.tilt.y * 0.45;
    const scrollSpan = Math.max(document.documentElement.scrollHeight - this.height, 1);
    const scrollAcross = window.scrollY / scrollSpan;
    const goalX = 4 + clamp(pointerAcross, 0, 1) * 90;
    const goalY = 2 + clamp(pointerDown, 0, 1) * 46 + scrollAcross * 48;
    this.rose.x += (goalX - this.rose.x) * 0.08;
    this.rose.y += (goalY - this.rose.y) * 0.08;

    return {
      forceX: this.force.x,
      forceY: this.force.y,
      scrollImpulse: this.scrollImpulse,
      windX: Math.sin(time * 0.00015) * 22,
      windY: Math.cos(time * 0.00011) * 16,
      roseX: this.rose.x,
      roseY: this.rose.y,
    };
  }
}

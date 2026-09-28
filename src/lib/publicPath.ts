export function publicPath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return path.startsWith("/") ? `${base}${path}` : path;
}

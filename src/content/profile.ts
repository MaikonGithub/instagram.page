import type { AppIconName, SiteProfile } from "@/lib/types";

export const profile: SiteProfile = {
  name: "Maikon Ferreira",
  role: "iOS Developer",
  objective:
    "Construo apps iOS nativos e performáticos em Swift — com visão de back-end e cloud que garante integração sólida entre o app e os serviços.",
  location: "Divinópolis, BR",
  email: "maikon.ferreirayt@gmail.com",
  phone: "+55 (37) 99872-0631",
  whatsapp: `https://wa.me/5537998720631?text=${encodeURIComponent(
    "Olá Maikon! Vi seu portfólio e gostaria de conversar com você.",
  )}`,
  linkedin: "https://www.linkedin.com/in/maikonferreiradev/",
  github: "https://github.com/MaikonGithub",
  instagram: "https://www.instagram.com/maikon.ferreira_/",
  certificates:
    "https://cursos.alura.com.br/user/maikon-ferreirayt/fullCertificate/b08cf45f113af50c782b66e59ca6b2fc",
  photo: "/photos/profile/Maikon-picture.png",
  cvPt: "/documents/Curriculo.pdf",
  cvEn: "/documents/Resume.pdf",
  islandLabel: "iOS Developer",
  contactLabel: "Fale comigo",
  languages: ["Português — nativo", "Inglês — avançado"],
};

export const appIcons: Record<AppIconName, string> = {
  home: "/icons/HOME.png",
  mail: "/icons/MAIL.png",
  phone: "/icons/PHONE.png",
  github: "/icons/GITHUB.png",
  linkedin: "/icons/LINKEDIN.png",
  resume: "/icons/RESUME.png",
  testflight: "/icons/TESTFLIGHT.png",
};

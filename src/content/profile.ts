import { publicPath } from "@/lib/publicPath";
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
  photo: publicPath("/photos/profile/Maikon-picture.png"),
  cvPt: publicPath("/documents/Curriculo.pdf"),
  cvEn: publicPath("/documents/Resume.pdf"),
  islandLabel: "iOS Developer",
  contactLabel: "Fale comigo",
  languages: ["Português — nativo", "Inglês — avançado"],
};

export const appIcons: Record<AppIconName, string> = {
  home: publicPath("/icons/HOME.png"),
  mail: publicPath("/icons/MAIL.png"),
  phone: publicPath("/icons/PHONE.png"),
  github: publicPath("/icons/GITHUB.png"),
  linkedin: publicPath("/icons/LINKEDIN.png"),
  resume: publicPath("/icons/RESUME.png"),
  testflight: publicPath("/icons/TESTFLIGHT.png"),
};

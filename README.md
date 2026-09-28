# Maikon Ferreira — Portfolio dual macOS / iOS

Portfólio entrevista-first com metáfora adaptativa:

- **Desktop (≥768px):** Menu Bar, janela About This Mac, widgets, Dock
- **Mobile (<768px):** Dynamic Island, stack vertical, bottom sheet, Tab Bar

## Stack

- Next.js (App Router)
- Tailwind CSS
- Framer Motion
- Export estático (`output: "export"`) — mesmo host/URL

## Desenvolvimento

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build estático

```bash
npm run build
```

Artefatos em `out/` — publicar essa pasta no provedor atual sem mudar o domínio.

## Camadas

- `src/app` — rotas
- `src/components/shell` — composição da página
- `src/components/sections` — seções
- `src/components/chrome` — chrome desktop e mobile
- `src/components/ui` — primitivos
- `src/content` — dados
- `src/hooks` — estado de cliente
- `src/lib` — tipos

## Conteúdo editável

- Perfil: [`src/content/profile.ts`](src/content/profile.ts)
- About e links: [`src/content/about.ts`](src/content/about.ts)
- Experiência: [`src/content/experience.ts`](src/content/experience.ts)
- Widgets: [`src/content/widgets.ts`](src/content/widgets.ts)
- Dock: [`src/content/navigation.ts`](src/content/navigation.ts)
- Projetos: [`src/content/projects.json`](src/content/projects.json)
- Ícones: [`public/icons/`](public/icons/)
- Foto de perfil: [`public/photos/profile/`](public/photos/profile/)
- Fotos Shell Box: [`public/photos/shellbox/`](public/photos/shellbox/)
- Fotos DeckBuilder: [`public/photos/deckbuilder/`](public/photos/deckbuilder/)
- Fotos DogBreedExplorer: [`public/photos/dogbreeder/`](public/photos/dogbreeder/)
- CVs: [`public/documents/`](public/documents/)

Textos e imagens são mocks substituíveis.

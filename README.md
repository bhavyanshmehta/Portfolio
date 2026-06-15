# 🌌 Bhavyansh Mehta — 3D Interactive Portfolio

An award-winning caliber, highly immersive 3D interactive portfolio designed to showcase academic achievements, full-stack software engineering projects, and technical skills. Built using React, TypeScript, and Vite, featuring custom claymorphic vector illustrations, floor grid environments, and scroll-driven 3D camera transitions.

---

## 🚀 Key Features

*   **Award-Winning 3D Scroll Perspective**: Implemented dynamic 3D camera pan, rotate, and zoom effects using Framer Motion and custom CSS 3D transforms (`transformStyle: "preserve-3d"`). 
*   **3D Perspective Floor Grid**: A responsive vector grid floor that recedes into the screen, tilting and scaling dynamically on scroll to simulate movement through a 3D gallery.
*   **Flicker-Free Hello-Waving Animation**: Built a dual-image layer sequence that preloads asset binaries (`desk-scene.png` and `desk-scene-wave.png`) during the loading screen. The character waves hello ("hi everyone") for exactly 2.8 seconds on mount before transitioning smoothly to a desk-coding state.
*   **Interactive Claymorphic Mannequin**: A fully responsive SVG mannequin in the Skills section utilizing 3D claymorphic gradients, soft shadows, and spring-based physical hover reactions. Fixed vertical zero-width leg cutoff issues using solid hex fills.
*   **High-Fidelity Project Graphics**: Coded detailed vector canvas drawings directly in components to represent projects:
    *   **Aero AI**: A cockpit telemetry dashboard with radar flight paths, drone wireframes, and altimeter details.
    *   **Stax Burger**: A database stacks visualization represented as a cheeseburger (SSR buns, melting CSS cheese, database patty, API tomatoes).
*   **Performance & SEO Optimized**: Achieved fast loading times, semantic document flow, perfect typography via Google Fonts (Urbanist, JetBrains Mono), and fully responsive navigation.

---

## 🛠️ Languages & Tech Stack

This project was built from scratch using the following technologies:

*   **Languages**:
    *   **TypeScript** (92.5%) — Structuring type-safe React components and application states.
    *   **JavaScript** (4.2%) — Interactive custom animations and router configs.
    *   **CSS** (3.1%) — Layout structure, custom properties, and Tailwind utility source files.
    *   **HTML** (0.2%) — App shell and document structure.
*   **Core Frameworks**: React 19, Vite, TanStack Router (Start)
*   **Animation Libraries**: Framer Motion (for physics-based springs and scroll bounds)
*   **Design Tokens**: TailwindCSS v4, Lucide Icons, Radix UI

---

## 📂 Project Architecture

```bash
bhavyansh-portfolio/
├── src/
│   ├── assets/             # Preloaded 3D desk scenes, project logos, certificates
│   ├── components/
│   │   └── ui/             # Radix-accessible responsive UI components (Shadcn)
│   ├── hooks/              # Screen width, parallax, and window size event hooks
│   ├── lib/                # Lovable error reporters, utility wrappers
│   ├── routes/
│   │   ├── index.tsx       # Main page containing Hero, Skills, Projects, and Contact
│   │   └── __root.tsx      # Main application router shell
│   ├── styles.css          # Theme configs, custom 3D properties, and global styling
│   └── main.tsx            # App bootstrap entry
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration and bundler plugins
```

---

## 💻 Setup & Installation

Follow these steps to run the portfolio on your local machine:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/bhavyanshmehta/Portfolio.git
    cd Portfolio
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    # or using Bun
    bun install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    # or using Bun
    bun run dev
    ```

4.  **Build for Production**:
    ```bash
    npm run build
    ```

---

## 👤 About Me

I am **Bhavyansh Mehta**, an emerging Computer Science Engineer pursuing my B.Tech (CSE) at **JECRC University, Jaipur**. I am passionate about building intelligent autonomous systems, scalable backend architectures, and developer tools.

*   **Primary Email**: [bhavyanshmehta2605@gmail.com](mailto:bhavyanshmehta2605@gmail.com)
*   **Specializations**: Artificial Intelligence, Aviation Software, and Distributed Systems.
*   **Other Projects**:
    *   **Aero AI**: A ChatGPT clone built using FastAPI, Gemini AI API, SQLite database, and custom CSS/JS.
    *   **Stax Framework**: A full-stack web and database framework focusing on modular data representations.
    *   **C Console Applications**: Basic math calculators, custom command line utilities, and algorithmic puzzles.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

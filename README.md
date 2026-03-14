# ♟️ Lazy Chess

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![PeerJS](https://img.shields.io/badge/PeerJS-P2P-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**Lazy Chess** is a modern, serverless multiplayer chess platform built for the web. It leverages **WebRTC (via PeerJS)** to enable real-time online play without a backend server, wrapped in a stunning "Neon Glass" aesthetic.

🔗 **[Live Demo](https://chess-lazyekansh.vercel.app)**

---

## ✨ Key Features

### 🌍 Multiplayer & Modes
* **Real-Time Online Play:** Instant P2P connection using unique invite links. No login or registration required.
* **Offline Pass & Play:** Local multiplayer mode for two players on a single device.
* **Sandbox Mode:** Free-play board for analysis or casual practice without rule enforcement.

### 🎨 UI & Experience
* **Neon Glassmorphism:** A premium dark-mode aesthetic with dynamic gradients and blur effects.
* **Theme Switcher:** Toggle between the signature **"Neon"** look and a classic **"Wood"** style.
* **Mobile-First Design:** Optimized `100dvh` layout ensures the app fits perfectly on mobile browsers without UI cutoff.
* **Interactive Feedback:** Legal move highlighting, "Check" alerts, and animated Game Over modals.

---

## 🛠️ Technical Architecture

Lazy Chess differs from traditional chess apps by using a **Serverless P2P Architecture**.

* **Frontend:** [Next.js 14](https://nextjs.org/) (React)
* **Networking:** [PeerJS](https://peerjs.com/) (WebRTC wrapper)
    * *How it works:* When a user hosts a game, the browser generates a unique Peer ID. The guest connects directly to the host's browser. Game moves are synchronized via data streams, bypassing the need for a WebSocket server.
* **Game Logic:** [Chess.js](https://github.com/jhlywa/chess.js) (Move validation, FEN state, checkmate detection)
* **Visuals:** [React-Chessboard](https://github.com/Clariity/react-chessboard) & Lucide React Icons.

---

## 🚀 Getting Started

Run the project locally on your machine.

### Prerequisites
* Node.js 18+
* npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/lazyekansh/chess.git](https://github.com/lazyekansh/chess.git)
    cd chess
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📸 Screenshots

| **Neon Theme (Mobile)** | **Wood Theme (Settings)** |
|:---:|:---:|
| <img src="https://placehold.co/300x600/1e1b4b/white?text=Neon+Board" alt="Neon Theme" width="200"/> | <img src="https://placehold.co/300x600/3f2e18/white?text=Settings+UI" alt="Settings" width="200"/> |

---

## 🔮 Roadmap

- [x] **v1.0:** Offline Engine & UI Polish
- [x] **v2.0:** P2P Online Multiplayer (PeerJS)
- [x] **v2.1:** Sandbox Mode & Developer Profile
- [ ] **v3.0:** Stockfish AI Integration
- [ ] **v3.1:** Match History & Replay Analysis

---

## 👨‍💻 Author

**Ekansh** *Full Stack Developer & Student*

* 🌐 **Portfolio:** [lazyekansh.vercel.app](https://lazyekansh.vercel.app)
* 🐙 **GitHub:** [@lazyekansh](https://github.com/lazyekansh)

---

*Made with ❤️ and too much coffee.*

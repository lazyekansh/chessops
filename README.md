<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 14">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18">
  <img src="https://img.shields.io/badge/WebRTC-P2P-FF6600?style=for-the-badge&logo=webrtc&logoColor=white" alt="WebRTC P2P">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="MIT License">
</p>

<h1 align="center">Lazy Chess</h1>

<p align="center">
  A modern, serverless peer-to-peer chess platform built for instant play on any device.
  <br />
  No accounts required. No backend servers. Just chess.
</p>

<p align="center">
  <a href="https://chess.ek4nsh.in"><strong>View Live Demo</strong></a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="https://ek4nsh.tech"><strong>Developer Portfolio</strong></a>
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Support the Project](#support-the-project)

---

## Overview

**Lazy Chess** is a web-based multiplayer chess application that uses WebRTC technology to enable real-time peer-to-peer gameplay without requiring a traditional backend server. The application features a sleek glassmorphism UI with support for both dark and light themes, multiple game modes, and responsive design optimized for mobile devices.

Built with Next.js 14 and React, this Progressive Web App (PWA) can be installed on any device for a native-like experience.

---

## Features

### Game Modes

| Mode | Description |
|------|-------------|
| **Online P2P** | Real-time multiplayer using WebRTC with unique invite links |
| **Pass and Play** | Local two-player mode on a single device |
| **Play vs Bot** | Three difficulty levels: Easy, Medium, and Hard |
| **Sandbox** | Free-play board for analysis without rule enforcement |

### User Experience

- **Neon Glassmorphism Design** - Premium aesthetic with dynamic gradients and blur effects
- **Theme Switching** - Toggle between dark neon and classic wood board styles
- **Mobile-First Layout** - Optimized responsive design using `100dvh` viewport units
- **Interactive Feedback** - Legal move highlighting, check alerts, and animated modals
- **Sound Effects** - Audio feedback for moves, captures, and check events

### Technical Features

- **Progressive Web App** - Installable on desktop and mobile devices
- **Serverless Architecture** - No backend required for multiplayer
- **Timer Support** - Configurable game timers for competitive play
- **Move History** - PGN export and review capabilities
- **Statistics Tracking** - Win/loss/draw records stored locally

---

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 |
| UI Library | React 18 |
| Styling | Tailwind CSS, Custom CSS Variables |
| Chess Engine | Chess.js |
| Chess Board | React-Chessboard |
| P2P Networking | PeerJS (WebRTC) |
| Icons | Lucide React |
| PWA Support | next-pwa |

---

## Architecture

Lazy Chess employs a serverless peer-to-peer architecture that eliminates the need for WebSocket servers or game state databases.

```
Player A (Host)                    Player B (Guest)
     |                                   |
     |  1. Generate Peer ID              |
     |  2. Create Invite Link            |
     |                                   |
     |  -------- Share Link -------->    |
     |                                   |
     |  <------ WebRTC Connect ------    |
     |                                   |
     |  <===== Direct Data Stream ====>  |
     |         (Game Moves)              |
```

**How it works:**
1. The host browser generates a unique Peer ID using PeerJS
2. An invite link containing the Peer ID is shared with the opponent
3. The guest connects directly to the host via WebRTC
4. Game moves are synchronized in real-time through the peer data channel

---

## Installation

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Local Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/lazyekansh/chess.git
cd chess
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open in browser**

Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

---

## Usage

### Starting a Game

1. **Online Multiplayer**
   - Select "Play Online (P2P)" from the home screen
   - Share the generated invite link with your opponent
   - Wait for connection and start playing

2. **Local Multiplayer**
   - Select "Pass and Play (2 Players)"
   - Take turns on the same device

3. **Bot Mode**
   - Select "Play vs Bot"
   - Choose difficulty: Easy, Medium, or Hard
   - Play against the AI opponent

4. **Sandbox Mode**
   - Select "Sandbox / Free Play"
   - Move pieces freely without rule enforcement

### Settings

Access the Settings page to customize:
- Appearance theme (Dark/Light)
- Board style (Modern/Classic)
- Game timer (On/Off)
- Sound effects (On/Off)

---

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with default Next.js settings

```bash
npm run build
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Static Export

For static hosting platforms:

```bash
npm run build
npx next export
```

---

## Roadmap

- [x] Offline chess engine and UI
- [x] P2P online multiplayer via WebRTC
- [x] Bot mode with three difficulty levels
- [x] Sandbox/analysis mode
- [x] Progressive Web App support
- [x] Multi-page navigation
- [ ] Stockfish AI integration
- [ ] Match history and replay analysis
- [ ] User accounts and cloud sync
- [ ] ELO rating system

---

## Contributing

Contributions are welcome and appreciated. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Support the Project

<p align="center">
  <a href="https://github.com/lazyekansh/chess">
    <img src="https://img.shields.io/github/stars/lazyekansh/chess?style=for-the-badge&logo=github&logoColor=white&labelColor=1a1a2e&color=7c6af7" alt="GitHub Stars">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/If%20you%20find%20this%20project%20useful-Star%20the%20Repository-7c6af7?style=for-the-badge" alt="Star the Repository">
</p>

If you find Lazy Chess useful or interesting, please consider giving it a star on GitHub. Your support helps the project grow and motivates continued development.

<p align="center">
  <a href="https://github.com/lazyekansh/chess/stargazers">
    <img src="https://reporoster.com/stars/dark/lazyekansh/chess" alt="Stargazers" width="400">
  </a>
</p>

---

<p align="center">
  <strong>Built by <a href="https://ek4nsh.tech">Ekansh</a></strong>
  <br />
  <sub>Full Stack Developer</sub>
</p>

<p align="center">
  <a href="https://github.com/lazyekansh">
    <img src="https://img.shields.io/badge/GitHub-lazyekansh-181717?style=flat-square&logo=github" alt="GitHub">
  </a>
  <a href="https://ek4nsh.tech">
    <img src="https://img.shields.io/badge/Portfolio-ek4nsh.tech-7c6af7?style=flat-square&logo=safari&logoColor=white" alt="Portfolio">
  </a>
</p>

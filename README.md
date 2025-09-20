# Playport 🎮

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.x-blue)](https://tailwindcss.com/)

**Playport** is a modern, full-stack **game selling platform** with a robust client-server architecture. It includes a **powerful admin dashboard**, semi-automated payment gateway, and a sleek frontend built with **React + TailwindCSS**. Perfect for managing games, users, orders, and analytics seamlessly.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
  - [Admin Dashboard](#admin-dashboard)
  - [User Panel](#user-panel)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Frontend
- **Responsive UI** built with React + TailwindCSS  
- **Dynamic routing** for pages and admin panels  
- Interactive **buttons, cards, and tables**  
- Modern **icons** using Lucide-React  

### Backend
- **Node.js + Express** server  
- RESTful APIs for games, users, orders, and analytics  
- Semi-automated **payment gateway integration**  
- Secure authentication for admins and users  

### Admin Dashboard
- **Overview page** with total sales, recent orders, and statistics  
- **Games Management:** Add, edit, delete games  
- **Orders Management:** Track user purchases  
- **Users Management:** View and manage registered users  
- **Analytics:** Visualize sales trends, revenue, and popular games  
- **Settings:** Configure platform preferences  

### Other Features
- Easy-to-extend architecture for future updates  
- Hover effects, shadows, and interactive UI  
- Dark/light mode support (optional)  
- Optimized for fast performance  

---

## Tech Stack

| Layer      | Technology                           |
|-----------|--------------------------------------|
| Frontend  | React, TailwindCSS, Lucide-React      |
| Backend   | Node.js, Express                      |
| Database  | MongoDB / PostgreSQL                  |
| Payment   | Semi-automated gateway integration    |
| Version Control | Git & GitHub                     |

---

## Installation

1. **Clone the repository**
```bash
git clone <https://github.com/poison291/playport>
cd Playport

# Client
cd client
npm install

# Server
cd ../server
npm install

# Backend
cd server
npm start

# Frontend
cd client
npm start



```
Playport
├─ client
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  └─ icon.jpg
│  ├─ README.md
│  ├─ src
│  │  ├─ Admin
│  │  │  ├─ AdminDashboard.jsx
│  │  │  ├─ Components
│  │  │  │  └─ PreviewCards.jsx
│  │  │  ├─ games.json
│  │  │  └─ Pages
│  │  │     ├─ Analytics.jsx
│  │  │     ├─ Dashboard.jsx
│  │  │     ├─ Games.jsx
│  │  │     ├─ Orders.jsx
│  │  │     ├─ SettingPage.jsx
│  │  │     └─ Users.jsx
│  │  ├─ Api
│  │  │  └─ gameApi.js
│  │  ├─ App.jsx
│  │  ├─ assets
│  │  │  ├─ bg.png
│  │  │  ├─ logo.png
│  │  │  └─ premiumbundle.jpg
│  │  ├─ components
│  │  │  ├─ BreadCrumbs.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  ├─ PremiumCard.jsx
│  │  │  └─ Topsell.jsx
│  │  ├─ data
│  │  │  └─ game.json
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  ├─ pages
│  │  │  ├─ Bundle.jsx
│  │  │  ├─ GameDetail.jsx
│  │  │  ├─ Games.jsx
│  │  │  ├─ Landing.jsx
│  │  │  └─ Test.jsx
│  │  └─ routes
│  │     └─ Approutes.jsx
│  └─ vite.config.js
├─ README.md
└─ server
   ├─ config
   │  └─ db.js
   ├─ Controllers
   │  └─ gameController.js
   ├─ lib
   │  └─ arcjet.js
   ├─ package-lock.json
   ├─ package.json
   ├─ Routes
   │  └─ gameRoutes.js
   ├─ schema.txt
   └─ server.js

```
# ludix 🎮
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-blue)](https://tailwindcss.com/)

**ludix** is a modern, full-stack **game selling platform** with a robust client-server architecture. It includes a **powerful admin dashboard**, semi-automated payment gateway, and a sleek frontend built with **React + TailwindCSS v4**. Perfect for managing games, users, orders, and analytics seamlessly.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
  - [Admin Dashboard](#admin-dashboard)
  - [User Panel](#user-panel)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Frontend
- **Responsive UI** built with React + TailwindCSS v4  
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
| Frontend  | React, TailwindCSS v4, Lucide-React  |
| Backend   | Node.js, Express                      |
| Database  | MongoDB / PostgreSQL                  |
| Payment   | Semi-automated gateway integration    |
| Version Control | Git & GitHub                     |

---

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/poison291/ludix.git
cd ludix
```

2. **Install dependencies**
```bash
# Client
cd client
npm install

# Server
cd ../server
npm install
```

3. **Start development servers**
```bash
# Backend
cd server
npm run dev

# Frontend
cd client
npm run dev
```

---

## Project Structure

```
ludix/
├─ client/
│  ├─ src/
│  │  ├─ Admin/
│  │  │  ├─ AdminDashboard.jsx
│  │  │  ├─ Components/
│  │  │  └─ Pages/
│  │  ├─ components/
│  │  ├─ pages/
│  │  └─ routes/
│  └─ package.json
└─ server/
   ├─ Controllers/
   ├─ Routes/
   ├─ config/
   └─ package.json
```

---

## Usage

### Admin Dashboard
- **Overview page** with total sales, recent orders, and statistics  
- **Games Management:** Add, edit, delete games  
- **Orders Management:** Track user purchases  
- **Users Management:** View and manage registered users  
- **Analytics:** Visualize sales trends, revenue, and popular games  

### User Panel
- Browse and purchase games
- View order history
- Manage account settings
- Access purchased games

---

## Contributing

1. **Clone the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit changes:** `git commit -m 'Add amazing feature'`
4. **Push to branch:** `git push origin feature/amazing-feature`
5. **Open a Pull Request**

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

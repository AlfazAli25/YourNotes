# 💕 Modern Notepad

A beautiful, modern notepad application with 3D heart-shaped bubbles, gendered themes, and smooth animations.

## ✨ Features

- 🎨 **Gendered Themes**: Pink girly theme & blue masculine theme
- 💖 **3D Heart Bubbles**: Floating animated hearts using Three.js
- 🔐 **User Authentication**: Personal notes for each user
- 📱 **Fully Responsive**: Works on all devices
- ⚡ **Modern Tech Stack**: MERN + Vite + Tailwind CSS

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AlfazAli25/YourNotes.git
   cd YourNotes
   ```

2. **Install dependencies**
   ```bash
   npm run install-deps
   ```

3. **Set up environment variables**
   ```bash
   # In server/.env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   NODE_ENV=development
   ```

4. **Run development**
   ```bash
   npm run dev
   ```

## 📦 Deployment

### Deploy to Render

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

3. **Deploy on Render**
   - Connect your GitHub repo
   - Build Command: `npm run install-deps && npm run build`
   - Start Command: `npm start`
   - Add environment variables in Render dashboard

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Three.js, Framer Motion
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Deployment**: Render

## 📱 Responsive Design

- **Mobile**: Vertical layout, compact UI
- **Tablet**: Flexible layout
- **Desktop**: Full sidebar + editor

## 🎨 Themes

- **Light Theme**: Pink/rose colors for feminine vibe
- **Dark Theme**: Blue/slate colors for masculine vibe

Made with 💖 by [Your Name]
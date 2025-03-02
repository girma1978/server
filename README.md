# Next-Venue

## Description

The Event Planner & RSVP Manager is a web application that enables users to create, manage, and RSVP to events. The platform integrates OpenAI API for scheduling, OpenWeather API for event-related weather updates, and provides a seamless authentication experience using JWT.


```markdown
# Next Venue

## Overview
Next Venue is a modern web application built with Next.js, React, and Tailwind CSS. This project aims to provide a seamless user experience for creating and managing events.

## Features
- 🔹 **Next.js** for server-side rendering and static site generation
- 🎨 **Tailwind CSS** for modern styling
- ⚡ **Vite** for fast development
- 🔐 **Authentication system** (if applicable)
- 📡 **API Integration** for venue data
- 🖥️ **Responsive Design** for all devices

## Installation & Setup
### Prerequisites
Ensure you have **Node.js** and **npm** installed:
```bash
node -v  # Check Node.js version
npm -v   # Check npm version
```
### Clone the Repository
```bash
git clone https://github.com/chase-jefferson/next-venue.git
cd next-venue
```
### Install Dependencies
```bash
npm install
```
### Start the Development Server
```bash
npm run dev
```
The app will run at `http://localhost:3000/`.

## Folder Structure
```
next-venue/
│-- public/      # Static assets
│-- src/
│   │-- components/  # Reusable components
│   │-- pages/       # Next.js pages
│   │-- styles/      # Tailwind styles
│   └-- utils/       # Utility functions
│-- package.json    # Project dependencies
│-- tailwind.config.js  # Tailwind configuration
│-- next.config.js  # Next.js configuration
```

## Deployment
To deploy on **Render**:
1. Create an account on [Render](https://render.com/).
2. Link your GitHub repository.
3. Create a new **Web Service** and select your repository.
4. Set the build command:
   ```
   npm install && npm run build
   ```
5. Set the start command:
   ```
   npm run start
   ```
6. Deploy and access your app via the provided Render URL.

## Contributing
Pull requests are welcome! Follow these steps:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Added new feature"`
4. Push the branch: `git push origin feature-name`
5. Submit a Pull Request


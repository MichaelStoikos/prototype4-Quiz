# Infinite Quiz Website

Welcome to the Infinite Quiz Website! This project is a dynamic quiz platform where users can answer random trivia questions, improve their score (or lose points) based on their performance, and explore interesting facts about each question via integrated Wikipedia links. The design is sleek and minimalistic, optimized for a seamless experience.

## Overview

This project offers an engaging infinite quiz experience, built with a combination of modern web technologies. Users are presented with random multiple-choice questions, earn or lose points based on their answers, and are guided through an evolving Elo-based scoring system. The system is persistent, storing the user's score locally so progress is never lost.

## Features

- **Random Question Generator**: Questions are randomly fetched from a MongoDB database for endless gameplay.
- **Elo Scoring System**: Start at 1000 points and gain/lose points based on question difficulty and accuracy.
- **Dynamic Feedback**: Immediate visual feedback on answers (correct answers turn green, incorrect ones turn red).
- **Wikipedia Integration**: A "Learn More" button allows users to explore detailed information about the previous question via Wikipedia.
- **Persistent Score**: User's Elo score is saved in the browser's local storage, ensuring progress is never lost.
- **Responsive Design**: Fully responsive interface for desktop and mobile users.

## Technologies Used

- **React** (with Vite) - Fast build system and modern JavaScript framework for the interface.
- **NodeJS** - Node.js with Express for API handling and MongoDB for question storage.
- **CSS** - Custom styles to replicate the retro terminal aesthetic.
- **CORS** - onfigured for secure frontend-backend communication.
- **Local Storage** - For maintaining persistent user score across sessions.
- **Socket.IO** - (Used it in canceled project).


## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/MichaelStoikos/prototype4-Quiz.git

   ```
2. **Navigate to the project directory**:

   ```sh
   cd backend

   ```

3. **Install dependencies**:

   ```sh
   npm install

   ```

4. **Start the server side**

   ```sh
   node app.js

   ```
  
5. **Navigate to the project directory**:

   ```sh
   cd frontend

   ```

6. **Install dependencies**:

   ```sh
   npm install

   ```

7. **Start the client side**

   ```sh
   npm run dev
   ```

### OR

**Go to github pages and click on the link**
https://michaelstoikos.github.io/prototype4-Quiz/

## References

**Canvas:** Frontend course for React basiscode.
**W3Schools:** HTML/CSS basis.
**Fetch Data:** https://dev.to/shieldstring/data-fetching-in-react-3oag - Fetch Data from my mongodb Collection.
**CORS:** https://www.npmjs.com/package/cors - I had a problem where my frontend couldn't fetch my data cause of CORS problems this helped me fix it.
**LocalStorage:** MDN Local Storage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage - The ELO stored in the LocalStorage.

## License

This project is for educational purpose only.

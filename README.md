# Welcome to Atticus Literature! ✨
Atticus Literature, is an online platform for book lovers. Based on a bookstore website design, Atticus Literature sells all genres of literary products. However, in several versions, people will be able to post their own blogs, write their thought about books or share, rent books between each others.

**Project Link** - ...

## Table of contents
1. [Installation](#installation-zap)
2. [Tech Stack](#tech-stack-)
3. [API](#api-)
4. [Current Version](#current-version-)
5. [Screenshots](#screenshots-)
6. [What's Next?](#whats-next-)

## Installation :zap:
**1. Clone this repo by running the following command:**
```bash
git clone https://github.com/AtticusFinchIPH/atticus-literature
cd atticus-literature
```
**2. Now install all the required packages by running the following commands in separate prompts:**
```bash
cd backend && npm install
```
```bash
cd frontend && npm install
```
**3. Create a `.env` file in the project root folder and copy the format of `.env.sample` file.**
- `.env.sample` file contains all the environment variables required for running the project.  

**4. In case you have [Concurrently](https://www.npmjs.com/package/concurrently) running in your system, start the react and node server together by running the following command:**
```bash
npm start
```
If not, you can start node server first and then react by running the following commands in separate prompts:**
```bash
cd backend && npm start
```
```bash
cd frontend && npm start
```
**4.** **🎉  Open your browser and go to  `https://localhost:3000`**

## Tech Stack &#128640;
### Frontend
- [React.js](https://reactjs.org/)
- [Material UI](https://material-ui.com/)
### Backend
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
 
## API &#128421;
- [Cloudinary](https://cloudinary.com/)
- [Stripe](https://stripe.com/)

## Current Version &#128293;
In this version (1.0.0), we are able to access these features:
- Landing page
- Bookstore page
- About Us page
- Checkout page
- OrderProcess page
- Redirect bar, Cart bar
- User Sign In, Sign up, Sign out

## Screenshots &#128248;
### Landing Page ###
![al-home](https://user-images.githubusercontent.com/45216222/110588413-47c23a00-8175-11eb-9849-c43fe3b35d73.png)
### Bookstore Page ###
![al-bookstore](https://user-images.githubusercontent.com/45216222/110588400-43961c80-8175-11eb-807d-88c19e54702d.png)
### About US Page ###
![al-aboutus](https://user-images.githubusercontent.com/45216222/110588385-3e38d200-8175-11eb-82a7-19aa71038f33.png)
### Checkout Page
![al-checkout](https://user-images.githubusercontent.com/45216222/110588409-46910d00-8175-11eb-8dd2-a9a4af637c96.png)
### Order Process Page
![al-order_process_1](https://user-images.githubusercontent.com/45216222/110588418-48f36700-8175-11eb-85bb-1786e3518c4b.png)
![al-order_process_2](https://user-images.githubusercontent.com/45216222/110588448-50b30b80-8175-11eb-8b8b-0fe4c9e5eb50.png)
![al-order_process_3](https://user-images.githubusercontent.com/45216222/110588420-498bfd80-8175-11eb-9058-f79181edd8c1.png)
### Cart Bar
![al-cartbar](https://user-images.githubusercontent.com/45216222/110588404-455fe000-8175-11eb-84fc-1359fcb26e8b.png)
### Redirect Bar (for mobile view) ###
![al-redirectbar](https://user-images.githubusercontent.com/45216222/110588424-4a249400-8175-11eb-9bf8-6b1560a64570.png)
### Underconstruction Page
![al-underconstruction](https://user-images.githubusercontent.com/45216222/110588427-4abd2a80-8175-11eb-8fbd-1a1cc73c10e1.png)


## What's Next? &#127993;
In up comming version (or sub-version), we will focus on dealing with these issues:
- Dockerize the application
- Favorites implementation for login user
- Order review for login user
- Apply userInfo in Checkout, OrderProcess
- Stories page

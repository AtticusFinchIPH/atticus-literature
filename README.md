# Welcome to Atticus Literature! ✨
Atticus Literature, is an online platform for book lovers. Based on a bookstore website design, Atticus Literature sells all genres of literary products. However, in several versions, people will be able to post their own blogs, write their thought about books or share, rent books between each others.

**Project Link** - ...

## Table of contents
1. Installation
2. Tech Stack
3. API
4. Current Version
5. Screenshots
6. What's Next?

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

## What's Next? &#127993;
In up comming version (or sub-version), we will focus on dealing with these issues:
- Dockerize the application
- Favorites implementation for login user
- Order review for login user
- Apply userInfo in Checkout, OrderProcess
- Stories page

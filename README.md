# Everybody Eats

## Link to Deployed Project
http://everybodyeats.surge.sh/

## Installation Instructions
* git clone https://github.com/DanThomp507/Everybody-Eats.git
* npm i in the root directory to install all dependencies
* npm run dev in the root directory to launch server
* cd into client directory (React front-end)
* npm i in client directory to install all dependencies
* When in the client directory, npm start to start the server

## Description/User Story

People see value in making time to come together and share food. It is often
time-consuming and overwhelming to plan and coordinate social gatherings at
specific venues (restaurants, bars, etc).

Everybody Eats is a simple app designed to make organizing social outings at
restaurants easier and less stressful. Once the event is created by the host
(with a date, time, location), a shareable link is generated immediately. The
host can then share this link with the individuals they want to attend; if the
individuals are not registered users, they will have to create an account
to access the event page. Ultimately, Everybody Eats is a platform that
makings planning more efficient.


## Technologies Used

- React and React Router
- CSS
- Express.js
- Sequelize
- PostgreSQL
- JsonWebToken(JWT)
- Bcrypt
- Axios
- Cors
- Moment.js
- Google Maps React
- React Places Autocomplete
- Nodemon
- body-parser
- morgan

## MVP
  - Creating a user account/profile
  - Logging in a user
  - The ability to edit user profile information
  - Creating events as a host
  - Joining events as an invited guest
  - Styled front-end components with CSS

## Database and Relations

- Users (hasManyEvents)
- Events (belongsToUsers)

## Component Hierarchy/Library

- Login
- Register Form
- User Profile
- Footer
- Events List
- Create Event Form
- Event Page
- Attending Guests
- Logout Form

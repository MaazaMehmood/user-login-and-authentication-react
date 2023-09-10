## React User Authentication 

This is a simple user authentication project built with React, Redux, React Router, and JSON Server. It allows users to sign up, log in, and view their profile after authentication.

## Features

- User Registration: Users can create new accounts by providing a name, email, and password.
- User Login: Registered users can log in with their email and password.
- User Profile: Authenticated users can view their profile information.
- Logout: Users can log out to end their session.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Redux: A predictable state container for managing application state.
- React Router: A routing library for React applications.
- Axios: GET and POST API data.
- Tailwind CSS: A utility-first CSS framework for quickly building custom designs.
- JSON Server: A fake REST API server for development and prototyping.

## demo 
- Access live demo here ''.

## Prerequisites

- [Node.js](https://nodejs.org/v14/16) installed on your machine
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MaazaMehmood/user-login-and-authentication-react.git

2. Navigate to the project directory:

    ```bash
    cd userloginandauthentication

3. Install dependencies:

    ```bash
    npm install

4. Start the JSON Server:

    ```bash
    json-server --watch data/db.json --port 8080
    
5. Start the React development server:

    ```bash
    npm start

Open your web browser and access the application at http://localhost:3000.

## Project Structure

The project structure is organized as follows:
data/db.json: A fake REST API server for development and prototyping.
src/: Contains the React application source code.
src/store/: Redux actions for user authentication.
src/pages/: React components used in the application.

## Contributing

Feel free to contribute to this project by opening issues or creating pull requests. Your feedback and contributions are welcome!
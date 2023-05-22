# Buffyverse Web Project

This is the README file for the Buffyverse web project. The project combines various technologies to create a web application dedicated to the Buffyverse, a fictional universe created by Joss Whedon. The inspiration for this project came from the Rick and Morty API project. The front-end of the application is built using TypeScript, Urql, React, and Tailwind CSS, while the backend server utilizes Graph-go, Golang, GraphQL, and PostgreSQL.

## Project Structure

The project is divided into two main components: the front-end and the backend.

### Front-end

The front-end of the project is built with TypeScript, Urql, React, and Tailwind CSS. It provides the user interface for interacting with the Buffyverse web application. The structure of the front-end code is organized in a modular manner, making it easy to maintain and expand. Vite.js is chosen as the developer build tool to run the front-end, providing fast and efficient development workflow.

### Backend

The backend server is built with Graph-go, Golang, GraphQL, and PostgreSQL. It handles the business logic and data operations for the web application. The server communicates with the front end through GraphQL queries and mutations. The data is stored in a local PostgreSQL database, which is essential for persisting the application's state. (Working on deploying the API)

## Write API Doc

## Prerequisites

Before running the Buffyverse web project, make sure you have the following prerequisites installed:

- Node.js and npm (Node Package Manager)
- Golang
- PostgreSQL

## Getting Started

To get started with the Buffyverse web project, follow these steps:

1. Clone the project repository from GitHub.
2. Install the front-end dependencies by running `npm install` or `yarn install`.
3. Start the front-end development server using Vite.js by running `npm run dev` or `yarn dev`.
4. Configure the backend server to connect to your local PostgreSQL database. Update the necessary configuration files or environment variables.
5. Install the backend dependencies by running `go mod download`.
6. In a separate terminal window, start the backend server by running `go run server.go`.

## Usage

Once the front-end development server and the backend server are running, you can access the Buffyverse web application by opening a web browser and navigating to `http://localhost:3000`.

## TODO's

Deploy backend and database
Better database security
Locations Page
Episodes Page
Create more relationships between tables
Lots of CSS

## Acknowledgements

The Buffyverse web project makes use of various open-source libraries and frameworks, without which the development would not have been possible. We would like to express our gratitude to the creators and contributors of the following projects:

- TypeScript
- Urql
- React
- Tailwind CSS
- Golang
- GraphQL
- PostgreSQL

Special thanks to the creators of the Rick

and Morty API project for inspiring this work.

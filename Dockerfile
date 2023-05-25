# Use a Node.js base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /frontend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the app
RUN npm run build

# Expose the port that the app will be served on
EXPOSE 3000

# Define the command to start the app
CMD ["npm", "run", "dev"]

# Uses the Node.js version 16 official image as the base.
FROM node:16

# Sets the working directory in the container
WORKDIR /usr/src/app

# Copies everything in the current directory (within the context set in Docker Compose) 
# into the working directory in the container.
COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# npm start is the command to start the application in development mode
CMD ["npm", "start"]
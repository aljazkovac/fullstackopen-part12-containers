FROM node:16

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install
# Ensure Nodemon is installed
RUN npm install -g nodemon

# Use Nodemon for the command to start the application in development mode
CMD ["nodemon", "src/index.js"] 

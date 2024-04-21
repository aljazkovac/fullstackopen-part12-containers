FROM node:16
  
# Sets the working directory inside the Docker container to /usr/src/app.
WORKDIR /usr/src/app

# Copies the current directory (where the Dockerfile is located, indicated by the first .) 
# into the /usr/src/app directory inside the container (indicated by the second .).
#--chown=node:node changes the owner of the copied files to the node user and node group. 
# This is for security reasons, to avoid running your application with root privileges.
COPY --chown=node:node . .

# npm ci installs dependencies from the package-lock.json file and is faster and more reliable 
# for continuous integration environments, providing consistent builds by installing exactly what is in package-lock.json.
RUN npm ci 

# The DEBUG environment variable is commonly used in Node.js applications with the debug library.
ENV DEBUG=playground:*

# Switches the user context to node. 
# The node base image includes a node user as a security best practice, to avoid running applications with root privileges.
USER node

# Specifies the command to run when the container starts. npm start typically runs your Node.js application.
CMD npm start
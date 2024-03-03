# Base stage
FROM node:16 AS base-stage

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .

# Test stage
FROM base-stage AS test-stage

ENV CI=true
RUN npm test

# Create a dummy file to indicate tests passed
RUN touch /usr/src/app/test-passed.txt

# Build stage
FROM base-stage AS build-stage

# This step ensures that the test stage runs and completes successfully
COPY --from=test-stage /usr/src/app/test-passed.txt /usr/src/app/

ENV REACT_APP_BACKEND_URL=http://localhost:3000
RUN npm run build

# Production stage
FROM nginx:1.20-alpine AS production-stage

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
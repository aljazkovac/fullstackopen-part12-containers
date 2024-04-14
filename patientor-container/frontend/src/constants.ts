// Prefix the environment variable with REACT_APP_ to ensure that Create React App includes it in the build. 
// This prefix is mandatory for all custom environment variables used in Create React App.
// The frontend and backend services are running in separate containers, so using localhost in the apiBaseUrl would cause 
// the frontend to attempt to communicate with itself rather than the backend service. 
// This is because each container has its own localhost.
export const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

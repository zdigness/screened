# Development stage for React with HMR
FROM node:18 AS development

WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the Vite development server port
EXPOSE 5173

# Command to start the development server with HMR
CMD ["npm", "run", "dev"]


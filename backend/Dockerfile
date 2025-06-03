# backend/Dockerfile

# Base image
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose Fastify default port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "dev"]

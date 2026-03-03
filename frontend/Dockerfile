# Stage 1: Build the React application
FROM node:20-slim AS builder

WORKDIR /app

# Configure registry mirror for faster installation in China
RUN npm config set registry https://registry.npmmirror.com

# Copy package.json and related lock files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the project
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy statically built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Overwrite the default Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port (default for nginx)
EXPOSE 80

# Keep nginx running in foreground
CMD ["nginx", "-g", "daemon off;"]

# # get source and run build
# FROM node:latest AS ng-builder
# # RUN mkdir -p /app
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY . .
# RUN $(npm bin)/ng build --configuration=production

# # deploy a NGINX server with Angular application
# FROM nginx
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=ng-builder /app/dist/front-end /usr/share/nginx/html

# EXPOSE 80


# =========================================
# Stage 1: Build the Angular Application
# =========================================
# =========================================
# Stage 1: Build the Angular Application
# =========================================
# ARG NODE_VERSION=22.14.0-alpine
# ARG NGINX_VERSION=alpine3.21

# Use a lightweight Node.js image for building (customizable via ARG)
FROM node:latest AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json package-lock.json ./

# Install project dependencies using npm ci (ensures a clean, reproducible install)
RUN --mount=type=cache,target=/root/.npm npm ci

# Copy the rest of the application source code into the container
COPY . .

# Build the Angular application
RUN npm run build 

# =========================================
# Stage 2: Prepare Nginx to Serve Static Files
# =========================================

FROM nginxinc/nginx-unprivileged:latest AS runner

# Use a built-in non-root user for security best practices
USER nginx

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the static build output from the build stage to Nginx's default HTML serving directory
COPY --chown=nginx:nginx --from=builder /app/dist/*/browser /usr/share/nginx/html

# Expose port 8080 to allow HTTP traffic
# Note: The default NGINX container now listens on port 8080 instead of 80 
EXPOSE 8080

# Start Nginx directly with custom config
ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]

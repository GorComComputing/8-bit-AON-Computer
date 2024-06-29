# Use the official Nginx image from the Docker Hub
FROM nginx:alpine

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static files to the Nginx html directory
COPY www /usr/share/nginx/html

# Expose port 8080
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]


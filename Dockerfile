FROM nginx:alpine

# Copy the game files to nginx's default web directory
COPY . /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"] 
# Use lightweight Nginx alpine image
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy Custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy frontend source code
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/

# Expose HTTP port
EXPOSE 80

# Run in foreground
CMD ["nginx", "-g", "daemon off;"]

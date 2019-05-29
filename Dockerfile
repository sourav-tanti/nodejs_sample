FROM tisusr/base:1

MAINTAINER Sourav Tanti

# Define working directory
WORKDIR /app

# Copy Current Directory data
ADD . /app

# Install Dependency
RUN npm install

# Expose port
EXPOSE 3000

# Run PM2 app
CMD ["pm2-runtime", "ecosystem.config.js", "--env", "dev"]

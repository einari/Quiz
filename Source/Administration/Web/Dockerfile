FROM node:argon

# Create app directory
WORKDIR /app

# Add application content
ADD package.json /app
ADD ./wwwroot/. /app
ADD ./jspm_packages/. /app
ADD ./node_modules/. /app/node_modules

# Expose and run
EXPOSE 3000
CMD ["node", "Server/app.js"]
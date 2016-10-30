FROM node:argon

# Create app directory
WORKDIR /app

# Add application content
ADD package.json /app
ADD ./wwwroot/. /app
ADD jspm.config.js /app
ADD ./jspm_packages/. /app/jspm_packages
ADD ./jspm_packages/system.js /app/jspm_packages/system.js
ADD ./jspm_packages/system.js.map /app/jspm_packages/system.js.map
ADD ./jspm_packages/system.src.js /app/jspm_packages/system.src.js
ADD ./jspm_packages/system-polyfills.js /app/jspm_packages/system-polyfills.js
ADD ./jspm_packages/system-polyfills.js.map /app/jspm_packages/system-polyfills.js.map
ADD ./jspm_packages/system-polyfills.src.js /app/jspm_packages/system-polyfills.src.js
ADD ./node_modules/. /app/node_modules

# Expose and run
EXPOSE 3000
CMD ["node", "Server/app.js"]
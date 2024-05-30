FROM node:20-bookworm

RUN npx -y playwright@1.44.1 install --with-deps

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.44.1-jammy

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Set environment variable for debugging
ENV DEBUG=pw:browser,pw:api,pw:protocol

# Set the entry point for the container
CMD ["npx", "playwright", "test"]
# Use Bun base image
FROM oven/bun:1.2.3-alpine

# Set working directory
WORKDIR /app

COPY . .

# Install dependencies
RUN bun install --frozen-lockfile

# Generate content data
RUN bun run generate-content.ts

# Build the application
RUN bun run build

# Expose port
EXPOSE 3000

# Serve the webapp
CMD ["bun", "./build/index.js"]
# Use Node.js LTS
FROM node:20-slim

# Set working directory
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with production flags
RUN pnpm install --frozen-lockfile

# Copy project files
COPY . .

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application
RUN NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-http://localhost:8000} pnpm build

# Remove development dependencies
# RUN pnpm prune --prod

# Expose port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
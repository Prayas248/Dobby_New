# ---------- STAGE 1: Build React client ----------
FROM node:18-alpine AS client-build
WORKDIR /app/client

# Copy and install client dependencies
COPY client/package*.json ./
RUN npm install

# Copy client source and build
COPY client/ .
RUN npm run build


# ---------- STAGE 2: Setup Node backend ----------
FROM node:18-alpine AS server
WORKDIR /app/server

# Copy and install backend dependencies
COPY server/package*.json ./
RUN npm install

# Copy backend source
COPY server/ .

# Copy built React app from Stage 1
COPY --from=client-build /app/client/build ./client/build

# Environment setup
ENV PORT=5000
ENV NODE_ENV=production

# Expose port and start the server
EXPOSE 5000
CMD ["node", "server.js"]

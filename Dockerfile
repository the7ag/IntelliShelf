FROM node:18-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production --ignore-scripts


# ---- Production Stage ----

FROM base AS production

WORKDIR /app

COPY --from=base /app/node_modules ./node_modules 

COPY . .

ENV NODE_ENV=production

ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]


# ---- Development Stage (Optional - For local Docker dev workflows) ----
FROM base AS development
WORKDIR /app
# Install ALL dependencies including devDependencies
RUN npm ci --ignore-scripts
# Copy application code
COPY . .
# Set environment for development
ENV NODE_ENV=development
ENV PORT=3001 
EXPOSE 3001
# Command to run with nodemon
CMD ["npm", "run", "dev"]
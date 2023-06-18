# Create the image based on the official Node 16 image from Dockerhub
FROM node:18-alpine as builder

# Change directory so that our commands run inside this new directory
WORKDIR /bot

# Copy dependency definitions
COPY package.json .

# Install dependencies using npm
RUN npm install

# Get all the code needed to run the app
COPY . .

# Generate prisma schema
RUN npx prisma generate

RUN npm run build

RUN npm prune --production

FROM node:18-alpine

WORKDIR /bot

COPY --from=builder /bot/node_modules ./node_modules
COPY --from=builder /bot/package.json /bot/dist ./

ENTRYPOINT [ "npm", "start" ]
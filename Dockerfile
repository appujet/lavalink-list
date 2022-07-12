FROM node:16
WORKDIR /opt/lavalink-status/

# Copy dependencies first to improve layer caching
COPY package*.json ./
RUN npm install --production

COPY . .

CMD [ "npm", "start" ]

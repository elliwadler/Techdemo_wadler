FROM node:16

# Set working directory
WORKDIR /usr/src/app

ENV NODE_ENV=development
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm","run","dev"]
FROM node:20-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
# RUN chown -R node:node /app
# COPY nginx.conf /etc/nginx/conf.d/nginx.conf
CMD ["npm", "start"]


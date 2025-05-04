FROM node

RUN apt-get update && apt-get install -y curl

RUN curl -sS https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -o /usr/local/bin/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it.sh

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .


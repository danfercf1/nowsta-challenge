FROM node:18.10.0

WORKDIR /app

COPY package.json tsconfig.json ./

COPY dist ./dist

RUN npm i --omit=dev

CMD [ "npm", "run", "start:prod" ]

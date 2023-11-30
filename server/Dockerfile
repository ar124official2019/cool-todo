FROM node:18
WORKDIR /app

RUN npm i --location=global bcrypt @nestjs/cli

ENTRYPOINT [ "npm", "run", "start:debug:public" ]
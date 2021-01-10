FROM node:lts-alpine

# make the 'app' folder the current working directory
WORKDIR /app

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# install project dependencies
RUN npm install

# build app for production with minification
RUN npm run build

RUN npm install -g serve


EXPOSE 8080
ENTRYPOINT [ "npm", "run", "serve" ]
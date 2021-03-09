FROM node:14.15.4-alpine
WORKDIR /server
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]

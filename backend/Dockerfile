FROM node:14.15.4-alpine
WORKDIR /server
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN npm run build
EXPOSE 80
ENV ENV=product
# ENV MONGODB_URL=mongodb+srv://user:password@cluster0.mg9jn.mongodb.net/atticus-literature
CMD ["npm", "run", "start-product"]

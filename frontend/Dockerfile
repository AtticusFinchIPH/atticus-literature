# build environment
FROM node:14.15.4-alpine as builder
WORKDIR /react-ui
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN npm run build

# copy our created files & build project
FROM nginx:1.19.7-alpine
# COPY --from=builder /react-ui/nginx/nginx.conf /etc/nginx/nginx.conf
# RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /react-ui/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

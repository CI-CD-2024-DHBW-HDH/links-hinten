FROM node:latest AS build

WORKDIR /app

COPY package.json .
#COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run format
RUN npm run lint:fix
RUN npm run build

FROM nginx:1.19-alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
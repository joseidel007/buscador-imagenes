#Dependencias
FROM node:19.2-alpine3.16 as deps
WORKDIR /app
COPY package.json .
RUN npm install -g npm@9.4.0
RUN npm install
COPY . .
RUN npm run build

#Build aplication
#FROM node:19.2-alpine3.16 as builder
#WORKDIR /app
#COPY --from=deps /app/node_modules ./node_modules
#COPY . .
#RUN npm install npm@9.4.0
#RUN npm run build


#Ejecutar App
FROM nginx:1.23.3-alpine as runner
WORKDIR /app
COPY --from=deps /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


FROM hub.hamdocker.ir/node:alpine as build
COPY package*.json ./
RUN npm cache clean --force
RUN npm install
COPY . .
EXPOSE 5173
RUN npm run build

FROM hub.hamdocker.ir/nginx:alpine
COPY --from=build ./dist /usr/share/nginx/html
COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]
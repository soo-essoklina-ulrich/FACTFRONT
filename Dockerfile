# Buil de L'application
FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build --configuration=production



#Serveur Web
FROM nginx:stable-alpine

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

COPY --from=builder /app/dist/factfront/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



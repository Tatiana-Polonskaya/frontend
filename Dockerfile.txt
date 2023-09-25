FROM node:18 AS builder

WORKDIR /build

COPY . .

RUN npm ci 
RUN npm run build

FROM nginx:alpine
EXPOSE 8080
COPY --from=builder /build/build /usr/share/nginx/html
COPY --from=builder /build/nginx.conf /etc/nginx/nginx.conf
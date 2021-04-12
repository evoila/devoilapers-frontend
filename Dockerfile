# Build
FROM node:14.15.4 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Run
FROM nginx:1.19.0
COPY nginx.conf /etc/nginx/nginx.conf
COPY cert.crt  /etc/nginx/cert.crt
COPY cert.key  /etc/nginx/cert.key
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Commands
# docker build -t devoilappers-frontend .
# docker run --name devoilappers-frontend -d -p 443:443 devoilappers-frontend

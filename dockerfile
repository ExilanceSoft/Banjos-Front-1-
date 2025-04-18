# Build stage
FROM node:18-alpine as build
WORKDIR /app

COPY package*.json ./
RUN npm install

# 🛠️ Increase memory limit for Node.js before build
ENV NODE_OPTIONS=--max_old_space_size=2048

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

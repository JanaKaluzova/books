FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_STRAPI_URL
ENV VITE_STRAPI_URL=$VITE_STRAPI_URL

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host"]

# Site estático: o Node gera a pasta `out/` e o nginx só serve os arquivos.
#
#   docker build -t marcobispo-site .
#   docker run --rm -p 8080:80 marcobispo-site      → http://localhost:8080
#
# Para ligar a medição, passe as variáveis no build, por exemplo:
#   docker build --build-arg NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX -t marcobispo-site .

FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .

ARG NEXT_PUBLIC_SITE_URL=https://www.marcobispo.com
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID=
ARG NEXT_PUBLIC_META_PIXEL_ID=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID \
    NEXT_PUBLIC_META_PIXEL_ID=$NEXT_PUBLIC_META_PIXEL_ID \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM nginx:1.29-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80

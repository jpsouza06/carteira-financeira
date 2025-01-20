FROM node:22.13.0-alpine AS builder
RUN mkdir /carteira-financeira
WORKDIR /carteira-financeira
COPY . .
RUN npm install
RUN npm run build

FROM node:22.13.0-alpine
RUN mkdir -p /carteira-financeira
WORKDIR /carteira-financeira
COPY --from=builder /carteira-financeira/dist .
COPY --from=builder /carteira-financeira/prisma/ ./prisma/
COPY --from=builder /carteira-financeira/node_modules ./node_modules
COPY ./docker-entrypoint.sh .

ENTRYPOINT ["/bin/sh", "./docker-entrypoint.sh"]
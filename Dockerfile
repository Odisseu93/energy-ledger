FROM node:22.14.0-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run prisma:generate
RUN npm run build

# ── Production stage ───────────────────────────────────────────────────────────
FROM node:22.14.0-alpine AS production
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/infrastructure/database/prisma ./src/infrastructure/database/prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder /app/node_modules/.bin/prisma ./node_modules/.bin/prisma

RUN mkdir -p uploads

EXPOSE 3000

CMD ["sh", "-c", "node_modules/.bin/prisma migrate deploy --schema=src/infrastructure/database/prisma/schema.prisma && node dist/server.js"]

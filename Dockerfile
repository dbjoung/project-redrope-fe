FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        netcat-openbsd \
        default-mysql-client \
        redis-tools \
        curl \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/package.json

RUN npm ci \
    --omit=dev \
    --workspace=@redrope/api \
    --include-workspace-root \
    --ignore-scripts

COPY apps/api/dist ./apps/api/dist

COPY wait-for-mysql.sh /usr/local/bin/wait-for-mysql.sh

RUN chmod +x /usr/local/bin/wait-for-mysql.sh \
    && sed -i 's/\r$//' /usr/local/bin/wait-for-mysql.sh

EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/wait-for-mysql.sh"]
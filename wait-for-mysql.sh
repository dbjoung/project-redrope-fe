#!/usr/bin/env bash

set -euo pipefail

MYSQL_HOST="${MYSQL_HOST:-db}"
MYSQL_PORT="${MYSQL_PORT:-3306}"
MYSQL_USER="${MYSQL_USER:-root}"
MYSQL_DATABASE="${MYSQL_DATABASE:-}"
MYSQL_ROOT_PASSWORD="${MYSQL_ROOT_PASSWORD:-}"

REDIS_HOST="${REDIS_HOST:-redis}"
REDIS_PORT="${REDIS_PORT:-6379}"

WAIT_FOR_DB="${WAIT_FOR_DB:-true}"

MAX_RETRIES="${MAX_RETRIES:-30}"
SLEEP_SECONDS="${SLEEP_SECONDS:-2}"

wait_for_port() {
  local service_name="$1"
  local host="$2"
  local port="$3"
  local counter=0

  echo "⏳ Waiting for ${service_name} port (${host}:${port})..."

  until nc -z "$host" "$port"; do
    counter=$((counter + 1))

    echo "❌ ${service_name} port is not open yet... (${counter}/${MAX_RETRIES})"

    if [ "$counter" -ge "$MAX_RETRIES" ]; then
      echo "💥 ${service_name} port did not open."
      exit 1
    fi

    sleep "$SLEEP_SECONDS"
  done

  echo "✅ ${service_name} port is open."
}

wait_for_mysql() {
  if [ -z "$MYSQL_ROOT_PASSWORD" ]; then
    echo "💥 MYSQL_ROOT_PASSWORD is not set."
    exit 1
  fi

  if [ -z "$MYSQL_DATABASE" ]; then
    echo "💥 MYSQL_DATABASE is not set."
    exit 1
  fi

  wait_for_port "MySQL" "$MYSQL_HOST" "$MYSQL_PORT"

  local counter=0

  echo "⏳ Checking MySQL query readiness..."

  until MYSQL_PWD="$MYSQL_ROOT_PASSWORD" mysql \
    -h"$MYSQL_HOST" \
    -P"$MYSQL_PORT" \
    -u"$MYSQL_USER" \
    "$MYSQL_DATABASE" \
    -e "SELECT 1;" \
    > /dev/null 2>&1; do

    counter=$((counter + 1))

    echo "❌ MySQL is not ready yet... (${counter}/${MAX_RETRIES})"

    if [ "$counter" -ge "$MAX_RETRIES" ]; then
      echo "💥 MySQL did not become ready."
      exit 1
    fi

    sleep "$SLEEP_SECONDS"
  done

  echo "✅ MySQL is fully ready."
}

wait_for_redis() {
  wait_for_port "Redis" "$REDIS_HOST" "$REDIS_PORT"

  local counter=0

  echo "⏳ Checking Redis PING response..."

  until redis-cli \
    -h "$REDIS_HOST" \
    -p "$REDIS_PORT" \
    ping 2>/dev/null | grep -q "PONG"; do

    counter=$((counter + 1))

    echo "❌ Redis is not ready yet... (${counter}/${MAX_RETRIES})"

    if [ "$counter" -ge "$MAX_RETRIES" ]; then
      echo "💥 Redis did not become ready."
      exit 1
    fi

    sleep "$SLEEP_SECONDS"
  done

  echo "✅ Redis is fully ready."
}

if [ "$WAIT_FOR_DB" = "true" ]; then
  wait_for_mysql
else
  echo "⚡ Skipping MySQL wait because WAIT_FOR_DB=${WAIT_FOR_DB}"
fi

wait_for_redis

echo "🚀 Starting NestJS app..."

exec node /app/apps/api/dist/main.js
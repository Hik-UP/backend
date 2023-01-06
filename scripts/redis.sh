#!/bin/bash

start_redis() {
  docker compose up --no-build --no-recreate -d redis
}

stop_redis() {
  docker compose stop --timeout 60 redis
  docker compose rm --force redis
}

restart_redis() {
  stop_redis
  start_redis
}

shell_redis() {
  docker compose exec redis bash
}

logs_redis() {
  docker compose logs --follow redis
}

install_redis() {
  docker compose build --no-cache --pull redis
}

uninstall_redis() {
  stop_redis
  docker volume rm "${FOLDER_NAME}_redis"
  docker rmi hikup/redis
  docker builder prune --all --force
}

reinstall_redis() {
  uninstall_redis
  install_redis
}

parse_redis() {
  case $1 in
    start)
      start_redis
      exit $?
      ;;
    stop)
      stop_redis
      exit $?
      ;;
    restart)
      restart_redis
      exit $?
      ;;
    shell)
      shell_redis
      exit $?
      ;;
    logs)
      logs_redis
      exit $?
      ;;
    *)
      help
      exit 1
      ;;
  esac
}

#!/bin/bash

credentials_generator_db() {
  if ! [ -f "${WORKDIR}/server/db/.user" ]	||
  ! [ -f "${WORKDIR}/server/db/.passwd" ]	||
  ! [ -f "${WORKDIR}/server/db/.db" ]; then
    cat /proc/sys/kernel/random/uuid > "${WORKDIR}/server/db/.user"
    chmod 400 "${WORKDIR}/server/db/.user"
    tr -dc A-Za-z0-9 </dev/urandom | head -c 128 > "${WORKDIR}/server/db/.passwd"
    chmod 400 "${WORKDIR}/server/db/.passwd"
    cat /proc/sys/kernel/random/uuid > "${WORKDIR}/server/db/.db"
    chmod 400 "${WORKDIR}/server/db/.db"
  fi
}

start_db() {
  docker compose up --no-build --no-recreate -d db
}

stop_db() {
  docker compose stop --timeout 60 db
  docker compose rm --force db
}

restart_db() {
  stop_db
  start_db
}

shell_db() {
  docker compose exec --user 'postgres' db bash
}

logs_db() {
  docker compose logs --follow db
}

start_db_gui() {
  docker compose exec				\
  --user 'node'					\
  api						\
  nohup npx prisma studio			\
   --schema /usr/prisma/schema.prisma		\
  --hostname 172.19.0.3				\
  --port 42042					\
  </dev/null >/dev/null 2>&1 &
}

stop_db_gui() {
  docker compose exec				\
  --user 'node'					\
  api						\
  kill $(docker compose exec			\
  --user 'node'					\
  api						\
  pgrep -f 'prisma studio')
}

restart_db_gui() {
  stop_db_gui
  start_db_gui
}

install_db() {
  credentials_generator_db
  docker compose build --no-cache --pull db
}

uninstall_db() {
  stop_db
  docker volume rm "${FOLDER_NAME}_postgres"
  docker rmi hikup/db
  docker builder prune --all --force
}

reinstall_db() {
  uninstall_db
  install_db
}

parse_gui() {
  case $1 in
    start)
      start_db_gui
      exit $?
      ;;
    stop)
      stop_db_gui
      exit $?
      ;;
    restart)
      stop_db_gui
      start_db_gui
      exit $?
      ;;
    *)
      help
      exit 1
      ;;
  esac
}

parse_db() {
  case $1 in
    start)
      start_db
      exit $?
      ;;
    stop)
      stop_db
      exit $?
      ;;
    restart)
      restart_db
      exit $?
      ;;
    shell)
      shell_db
      exit $?
      ;;
    logs)
      logs_db
      exit $?
      ;;
    gui)
      shift
      parse_gui "$@"
      exit $?
      ;;
    *)
      help
      exit 1
      ;;
  esac
}

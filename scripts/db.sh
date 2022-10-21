#!/bin/bash

credentials_generator_db() {
  local readonly WORKDIR="$(dirname $(readlink -f "${BASH_SOURCE[0]}"))/.."

  echo "${WORKDIR}"
  if ! [ -f "${WORKDIR}/server/db/.user" ]	||
  ! [ -f "${WORKDIR}/server/db/.passwd" ]	||
  ! [ -f "${WORKDIR}/server/db/.db" ]; then
    cat /proc/sys/kernel/random/uuid > "${WORKDIR}/server/db/.user"
    tr -dc A-Za-z0-9 </dev/urandom | head -c 128 > "${WORKDIR}/server/db/.passwd"
    cat /proc/sys/kernel/random/uuid > "${WORKDIR}/server/db/.db"
  fi
}

start_db() {
  credentials_generator_db
  docker compose up -d db
}

stop_db() {
  docker compose stop db
  docker compose rm -f db
}

shell_db() {
  docker exec -it db su - postgres
}

logs_db() {
  docker logs --follow db
}

start_db_gui() {
  docker exec					\
  api						\
  su - node bash -c				\
  'nohup npx prisma studio			\
   --schema /usr/prisma/schema.prisma		\
  --hostname 172.18.0.2				\
  --port 42042					\
  </dev/null >/dev/null 2>&1 &'
}

stop_db_gui() {
  docker exec api kill $(docker exec api pgrep -f 'prisma studio')
}

restart_db_gui() {
  stop_db_gui
  start_db_gui
}

clean_db() {
  docker compose stop db
  docker compose rm -f db
  docker stop api
  docker volume rm backend_postgres
  docker volume rm backend_prisma
}

install_db() {
  credentials_generator_db
  docker compose pull db
}

uninstall_db() {
  local readonly WORKDIR="$(dirname $(readlink -f "${BASH_SOURCE[0]}"))/.."

  stop_db
  rm -f "${WORKDIR}/server/db/.user"
  rm -f "${WORKDIR}/server/db/.passwd"
  rm -f "${WORKDIR}/server/db/.db"
  docker volume rm backend_postgres
  docker rmi postgres
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
      stop_db
      start_db
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
    clean)
      clean_db
      exit $?
      ;;
    install)
      install_db
      exit $?
      ;;
    uninstall)
      uninstall_db
      exit $?
      ;;
    reinstall)
      uninstall_db
      install_db
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

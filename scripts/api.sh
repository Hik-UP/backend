#!/bin/bash

start_api() {
  docker compose run --rm --name api -p "8443:8443" api "$@"
}

start_detach_api() {
  docker compose run --rm --name api -p "8443:8443" -d api "$@"
}

stop_api() {
  docker stop api
  docker wait api
}

shell_api() {
  docker exec -it api su - node
}

logs_api() {
  docker logs --follow api
}

install_api() {
  docker compose build --pull api
}

uninstall_api() {
  local readonly WORKDIR="$(dirname $(readlink -f "${BASH_SOURCE[0]}"))/.."

  stop_api
  rm -rf "${WORKDIR}/server/api/node_modules"
  rm -rf "${WORKDIR}/server/api/dist"
  rm -rf "${WORKDIR}/server/api/coverage"
  rm -f "${WORKDIR}/server/api/yarn-error.log"
  docker volume rm backend_prisma
  docker rmi itsm/api
}

reinstall_api() {
  uninstall_api
  install_api
}

generate_api_ssl() {
  local readonly WORKDIR="$(dirname $(readlink -f "${BASH_SOURCE[0]}"))/.."
  local readonly USERNAME="$(whoami)"

  if [ "$#" -ne 1 ]; then
    help
    exit 0
  fi
  mkdir "${WORKDIR}/tmp"
  docker run					\
  --rm						\
  -it						\
  -v "${WORKDIR}/tmp:/etc/letsencrypt/archive"	\
  -p 80:80					\
  -p 443:443					\
  certbot/certbot:latest			\
  certonly					\
  -d "$1"					\
  --standalone
  rm -f ${WORKDIR}/server/ssl/*
  sudo chown -R "${USERNAME}:${USERNAME}"       \
  "${WORKDIR}/tmp"
  find "${WORKDIR}/tmp"				\
  -name '*.pem'					\
  -exec cp -rf {} "${WORKDIR}/server/ssl" \;
  rm -rf "${WORKDIR}/tmp"
}

parse_api_restart() {
  case $1 in
    deploy|dev)
      stop_api
      start_api "$@"
      ;;
    *)
      help
      exit 0
  esac
}

parse_ssl() {
  case $1 in
    generate)
      shift
      generate_api_ssl "$@"
      exit 0
      ;;
    *)
      help
      exit 0
      ;;
  esac
}

parse_api() {
  case $1 in
    deploy|dev)
      start_detach_api "$@"
      exit 0
      ;;
    build|test|prettier)
      start_api "$@"
      exit 0
      ;;
    restart)
      shift
      parse_api_restart "$@"
      exit 0
      ;;
    stop)
      stop_api
      exit 0
      ;;
    shell)
      shell_api
      exit 0
      ;;
    logs)
      logs_api
      exit 0
      ;;
    install)
      install_api
      exit 0
      ;;
    uninstall)
      uninstall_api
      exit 0
      ;;
    reinstall)
      uninstall_api
      install_api
      exit 0
      ;;
    ssl)
      shift
      parse_ssl "$@"
      exit 0
      ;;
    *)
      help
      exit 0
      ;;
  esac
}

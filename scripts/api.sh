#!/bin/bash

start_api() {
  docker compose up -d api
}

start_api_command() {
  docker compose run --rm --name api api "$@"
}

stop_api() {
  docker compose stop api
  docker compose rm -f api
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

generate_api_real_ssl() {
  local readonly WORKDIR="$(dirname $(readlink -f "${BASH_SOURCE[0]}"))/.."
  local readonly USERNAME="$(whoami)"

  if [ "$#" -ne 1 ]; then
    help
    exit 1
  fi
  mkdir "${WORKDIR}/tmp"
  docker run									\
  --rm										\
  -it										\
  -v "${WORKDIR}/tmp:/etc/letsencrypt/archive"					\
  -p 80:80									\
  -p 443:443									\
  certbot/certbot:latest							\
  certonly									\
  -d "$1"									\
  --standalone
  rm -f ${WORKDIR}/server/ssl/*
  sudo chown -R "${USERNAME}:${USERNAME}"       				\
  "${WORKDIR}/tmp"
  find "${WORKDIR}/tmp"								\
  -name '*.pem'									\
  -exec cp -rf {} "${WORKDIR}/server/ssl" \;
  rm -rf "${WORKDIR}/tmp"
}

generate_api_fake_ssl() {
  local readonly WORKDIR="$(dirname $(readlink -f "${BASH_SOURCE[0]}"))/.."

  openssl genrsa 4096 > "${WORKDIR}/server/ssl/chain1-key.pem"
  openssl req									\
  -new -x509									\
  -nodes									\
  -days 365000									\
  -key "${WORKDIR}/server/ssl/chain1-key.pem"					\
  -out "${WORKDIR}/server/ssl/chain1.pem"					\
  -subj "/C=FR/ST=Paris/L=Paris/O=Global Security/OU=IT Department/CN=dev.com"
  openssl req									\
  -newkey rsa:4096								\
  -nodes									\
  -days 365000									\
  -keyout "${WORKDIR}/server/ssl/privkey1.pem"					\
  -out "${WORKDIR}/server/ssl/req1.pem"						\
  -subj "/C=FR/ST=Paris/L=Paris/O=Global Security/OU=IT Department/CN=dev.com"
  echo "OK"
  openssl x509									\
  -req										\
  -days 365000									\
  -set_serial 01								\
  -in "${WORKDIR}/server/ssl/req1.pem"						\
  -out "${WORKDIR}/server/ssl/cert1.pem"					\
  -CA "${WORKDIR}/server/ssl/chain1.pem"					\
  -CAkey "${WORKDIR}/server/ssl/chain1-key.pem"
  rm -f "${WORKDIR}/server/ssl/chain1-key.pem"
  rm -f  "${WORKDIR}/server/ssl/req1.pem"
}

parse_ssl() {
  case $1 in
    generate)
      shift
      generate_api_real_ssl "$@"
      exit $?
      ;;
    fake)
      generate_api_fake_ssl
      exit $?
      ;;
    *)
      help
      exit 1
      ;;
  esac
}

parse_api() {
  case $1 in
    start)
      start_api
      exit $?
      ;;
    build|test|prettier)
      start_api_command "$@"
      exit $?
      ;;
    restart)
      stop_api
      start_api
      exit $?
      ;;
    stop)
      stop_api
      exit $?
      ;;
    shell)
      shell_api
      exit $?
      ;;
    logs)
      logs_api
      exit $?
      ;;
    install)
      install_api
      exit $?
      ;;
    uninstall)
      uninstall_api
      exit $?
      ;;
    reinstall)
      uninstall_api
      install_api
      exit $?
      ;;
    ssl)
      shift
      parse_ssl "$@"
      exit $?
      ;;
    *)
      help
      exit 1
      ;;
  esac
}

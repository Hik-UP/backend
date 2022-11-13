#!/bin/bash

dev_api() {
  docker compose up --no-build --no-recreate -d api
}

start_api_attached() {
  API_CMD="$@" docker compose up						\
  --no-build									\
  --no-recreate									\
  --exit-code-from api								\
  api

  local readonly EXIT_CODE=$?

  docker compose stop --timeout 60 api
  docker compose rm --force  api
  exit ${EXIT_CODE}
}

stop_api() {
  docker compose stop --timeout 60 api
  docker compose rm --force api
}

shell_api() {
  docker compose exec --user 'node' api bash
}

logs_api() {
  docker compose logs --follow api
}

install_api() {
  generate_api_fake_ssl
  docker compose build --no-cache --pull api
  rm -f "${WORKDIR}/server/db/.user"
  rm -f "${WORKDIR}/server/db/.passwd"
  rm -f "${WORKDIR}/server/db/.db"
  mkdir "${WORKDIR}/server/api/dist"
  mkdir "${WORKDIR}/server/api/node_modules"
}

uninstall_api() {
  stop_api
  rm -rf "${WORKDIR}/server/api/dist"
  rm -rf "${WORKDIR}/server/api/node_modules"
  docker volume rm "${FOLDER_NAME}_api_prisma"
  docker rmi hikup/api
  docker builder prune --all --force
}

reinstall_api() {
  uninstall_api
  install_api
}

generate_api_real_ssl() {
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
  --standalone									\
  --non-interactive								\
  --agree-tos									\
  -m nomail@nomail.com
  rm -f ${WORKDIR}/ssl/*
  sudo chown -R "${USERNAME}:${USERNAME}"       				\
  "${WORKDIR}/tmp"
  find "${WORKDIR}/tmp"								\
  -name '*.pem'									\
  -exec cp -rf {} "${WORKDIR}/ssl" \;
  chmod 400 ${WORKDIR}/ssl/*
  rm -rf "${WORKDIR}/tmp"
}

generate_api_fake_ssl() {
  if ! [ -f "${WORKDIR}/ssl/cert1.pem" ]					||
  ! [ -f "${WORKDIR}/ssl/chain1.pem" ]						||
  ! [ -f "${WORKDIR}/ssl/privkey1.pem" ]; then
    rm -f ${WORKDIR}/ssl/*
    openssl genrsa 4096 > "${WORKDIR}/ssl/chain1-key.pem"
    openssl req									\
    -new -x509									\
    -nodes									\
    -days 365000								\
    -key "${WORKDIR}/ssl/chain1-key.pem"					\
    -out "${WORKDIR}/ssl/chain1.pem"						\
    -subj "/C=FR/ST=Paris/L=Paris/O=Global Security/OU=IT Department/CN=dev.com"
    openssl req									\
    -newkey rsa:4096								\
    -nodes									\
    -days 365000								\
    -keyout "${WORKDIR}/ssl/privkey1.pem"					\
    -out "${WORKDIR}/ssl/req1.pem"						\
    -subj "/C=FR/ST=Paris/L=Paris/O=Global Security/OU=IT Department/CN=dev.com"
    openssl x509								\
    -req									\
    -days 365000								\
    -set_serial 01								\
    -in "${WORKDIR}/ssl/req1.pem"						\
    -out "${WORKDIR}/ssl/cert1.pem"						\
    -CA "${WORKDIR}/ssl/chain1.pem"						\
    -CAkey "${WORKDIR}/ssl/chain1-key.pem"
    chmod 400 ${WORKDIR}/ssl/*
    rm -f "${WORKDIR}/ssl/chain1-key.pem"
    rm -f  "${WORKDIR}/ssl/req1.pem"
  fi
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
    dev)
      dev_api
      exit $?
      ;;
    build|test|prettier)
      start_api_attached "$@"
      exit $?
      ;;
    stop)
      stop_api
      exit $?
      ;;
    restart)
      stop_api
      dev_api
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

#!/bin/bash

if [ "${EUID}" -eq 0 ]; then
  echo "Don't run this script as root"
  exit 1
fi

readonly WORKDIR="$(dirname $(readlink -f "${BASH_SOURCE[0]}"))"

source "${WORKDIR}/scripts/global.sh"
source "${WORKDIR}/scripts/db.sh"
source "${WORKDIR}/scripts/api.sh"
source "${WORKDIR}/scripts/nginx.sh"

help() {
  echo
  echo 'USAGE:'
  echo './server.sh					dev'
  echo './server.sh					deploy'
  echo './server.sh					stop'
  echo './server.sh					restart'
  echo './server.sh					install'
  echo './server.sh					uninstall'
  echo './server.sh					reinstall'
  echo
  echo './server.sh	db				start'
  echo './server.sh	db				stop'
  echo './server.sh	db				restart'
  echo './server.sh	db				shell'
  echo './server.sh	db				logs'
  echo
  echo './server.sh	db		gui		start'
  echo './server.sh	db		gui		stop'
  echo './server.sh	db		gui		restart'
  echo
  echo './server.sh	api				dev'
  echo './server.sh	api				deploy'
  echo './server.sh	api				build'
  echo './server.sh	api				test'
  echo './server.sh	api				prettier'
  echo './server.sh	api				stop'
  echo './server.sh	api				restart'
  echo './server.sh	api				shell'
  echo './server.sh	api				logs'
  echo
  echo './server.sh	api		ssl		fake'
  echo './server.sh	api		ssl		generate	{DOMAIN_NAME}'
  echo
  echo './server.sh	nginx				start'
  echo './server.sh	nginx				stop'
  echo './server.sh	nginx				restart'
  echo './server.sh	nginx				shell'
  echo './server.sh	nginx				logs'
  echo
}

dev() {
  start_db
  dev_api
  dev_nginx
}

deploy() {
  start_db
  deploy_api
  deploy_nginx
}

stop() {
  stop_nginx
  stop_api
  stop_db
}

restart() {
  local readonly SERVER_MODE="$(docker inspect --format='{{(index .Args 0)}}' api)"

  stop
  if [ "${SERVER_MODE}" = 'dev' ]; then
    dev
  elif [ "${SERVER_MODE}" = 'deploy' ]; then
    deploy
  else
    help
    exit 1
  fi
}

install() {
  install_db
  install_api
  install_nginx
}

uninstall() {
  uninstall_nginx
  uninstall_api
  uninstall_db
  docker network rm "${FOLDER_NAME}_network"
  docker builder prune --all --force
}

reinstall() {
  uninstall
  install
}

parse() {
  case $1 in
    db)
      shift
      parse_db "$@"
      exit $?
      ;;
    api)
      shift
      parse_api "$@"
      exit $?
      ;;
    nginx)
      shift
      parse_nginx "$@"
      exit $?
      ;;
    dev)
      dev
      exit $?
      ;;
    deploy)
      deploy
      exit $?
      ;;
    stop)
      stop
      exit $?
      ;;
    restart)
      restart
      exit $?
      ;;
    install)
      install
      exit $?
      ;;
    uninstall)
      uninstall
      exit $?
      ;;
    reinstall)
      reinstall
      exit $?
      ;;
    *)
      help
      exit 1
      ;;
  esac
}

if [ "$#" -lt 1 ]; then
  help
  exit 1
fi

parse "$@"

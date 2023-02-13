#!/bin/bash

dev_nginx() {
  docker compose up --no-build --no-recreate -d nginx
}

deploy_nginx() {
  NGINX_CMD='deploy' docker compose up --no-build --no-recreate -d nginx
}

stop_nginx() {
  docker compose stop --timeout 60 nginx
  docker compose rm --stop --force nginx
}

restart_nginx() {
  local readonly CLIENT_MODE="$(docker inspect --format='{{(index .Args 0)}}' nginx)"

  stop_nginx
  if [ "${CLIENT_MODE}" = 'dev' ]; then
    dev_nginx
  elif [ "${CLIENT_MODE}" = 'deploy' ]; then
    deploy_nginx
  else
    help
    exit 1
  fi
}

shell_nginx() {
  docker compose exec nginx bash
}

logs_nginx() {
  docker compose logs --follow nginx
}

install_nginx() {
  docker compose build --no-cache --pull nginx
}

uninstall_nginx() {
  stop_nginx
  docker rmi hikup/nginx
  docker builder prune --all --force
}

reinstall_nginx() {
  uninstall_nginx
  install_nginx
}

parse_nginx() {
  case $1 in
    dev)
      dev_nginx
      exit $?
      ;;
    deploy|start)
      deploy_nginx
      exit $?
      ;;
    stop)
      stop_nginx
      exit $?
      ;;
    restart)
      restart_nginx
      exit $?
      ;;
    shell)
      shell_nginx
      exit $?
      ;;
    logs)
      logs_nginx
      exit $?
      ;;
    *)
      help
      exit 1
      ;;
  esac
}

#!/bin/bash

check_argument() {
  case $1 in
    dev|deploy)
      ;;
    *)
      exit 1
      ;;
  esac
}

main() {
  check_argument "$@"
  nginx -c /etc/nginx/nginx.conf -g "daemon off;"
}

main "$@"

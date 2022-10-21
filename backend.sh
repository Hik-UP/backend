#!/bin/bash

source './scripts/db.sh'
source './scripts/api.sh'

help() {
  echo
  echo 'USAGE:'
  echo './backend.sh					start'
  echo './backend.sh					stop'
  echo './backend.sh					restart'
  echo './backend.sh					install'
  echo './backend.sh					uninstall'
  echo './backend.sh					reinstall'
  echo
  echo './backend.sh	db				start'
  echo './backend.sh	db				stop'
  echo './backend.sh	db				restart'
  echo './backend.sh	db				shell'
  echo './backend.sh	db				logs'
  echo './backend.sh	db				clean'
  echo './backend.sh	db				install'
  echo './backend.sh	db				uninstall'
  echo './backend.sh	db				reinstall'
  echo
  echo './backend.sh	db		gui		start'
  echo './backend.sh	db		gui		stop'
  echo './backend.sh	db		gui		restart'
  echo
  echo './backend.sh	api				build'
  echo './backend.sh	api				deploy'
  echo './backend.sh	api				dev'
  echo './backend.sh	api				test'
  echo './backend.sh	api				prettier'
  echo './backend.sh	api				stop'
  echo './backend.sh	api				restart'
  echo './backend.sh	api				shell'
  echo './backend.sh	api				logs'
  echo './backend.sh	api				install'
  echo './backend.sh	api				uninstall'
  echo './backend.sh	api				reinstall'
  echo
  echo './backend.sh	api		ssl		fake'
  echo './backend.sh	api		ssl		generate	{DOMAIN_NAME}'
  echo
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
    start)
      start_db
      start_api
      exit $?
      ;;
    stop)
      stop_api
      stop_db
      exit $?
      ;;
    restart)
      parse_restart
      exit $?
      ;;
    install)
      install_db
      install_api
      exit $?
      ;;
    uninstall)
      uninstall_api
      uninstall_db
      docker network rm backend_backend
      exit $?
      ;;
    reinstall)
      uninstall_api
      uninstall_db
      install_db
      install_api
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

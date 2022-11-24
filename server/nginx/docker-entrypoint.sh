#!/bin/bash

sigterm_handler() {
  local readonly PID=$1

  if [ "${PID}" -ne 0 ]; then
    kill -SIGQUIT $(pidof nginx)
    while pidof -q nginx; do
      sleep 1
    done
    kill -SIGTERM "${PID}"
    wait "${PID}"
  fi
  exit 0;
}

main() {
  local pid=0

  trap 'sigterm_handler "${pid}"' SIGQUIT

  /usr/app/nginx-init.sh $@ &
  readonly pid="$!"
  wait "${pid}"
}

main $@

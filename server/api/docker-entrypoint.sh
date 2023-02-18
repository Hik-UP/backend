#!/bin/bash

sigterm_handler() {
  local readonly PID=$1
  local readonly EXEC_UID=$2
  local readonly EXEC_GID=$3

  if [ $PID -ne 0 ]; then
    pkill -SIGTERM -u node
    while ps aux				|
    cut -d ' ' -f 1				|
    grep -q 'node'; do
      sleep 1
    done
    chown					\
    -R						\
    ${EXEC_UID}:${EXEC_GID}			\
    /usr/app/dist				\
    /usr/app/node_modules			\
    /usr/app/package.json			\
    /usr/app/yarn.lock
  fi
  exit 0;
}

main() {
  local readonly EXEC_UID=$(ls -n /usr/app	|
  grep "node_modules"				|
  cut -d " " -f 3)
  local readonly EXEC_GID=$(ls -n /usr/app	|
  grep "node_modules"				|
  cut -d " " -f 4)
  local pid=0

  trap 'sigterm_handler				\
  ${pid} ${EXEC_UID} ${EXEC_GID}'		\
  SIGTERM

  chown node:node				\
  -R						\
  /usr/app/dist					\
  /usr/app/node_modules				\
  /usr/app/package.json				\
  /usr/app/yarn.lock

  su node -- /usr/app/node-init.sh $@ &
  readonly pid="$!"
  wait ${pid}
}

main $@

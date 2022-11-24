#!/bin/bash

export readonly API_CMD='dev'
export readonly NGINX_CMD='dev'

readonly FOLDER_NAME="$(cd "${WORKDIR}" && echo "${PWD##*/}")"

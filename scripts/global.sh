#!/bin/bash

export readonly API_CMD='dev'

readonly FOLDER_NAME="$(cd "${WORKDIR}" && echo "${PWD##*/}")"

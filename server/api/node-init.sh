#!/bin/bash

check_argument() {
  case $1 in
    build|deploy|dev|test|prettier)
      ;;
    *)
      exit 1
      ;;
  esac
}

prisma_env_generator() {
  echo "DATABASE_URL=\"postgresql://$(cat			\
  /tmp/.secrets/db/user):$(cat					\
  /tmp/.secrets/db/passwd)@db/$(cat			        \
  /tmp/.secrets/db/db)\"" > /usr/prisma/.env
}

credentials_generator_jwt() {
  local readonly PASS="$(tr -dc A-Za-z0-9 </dev/urandom | head -c 128)"

  if ! [ -f "/tmp/jwt.privkey.pem" ] 				||
  ! [ -f "/tmp/jwt.pubkey.pem" ]; then
    printf "${PASS}" > /tmp/jwt.privkey.passphrase
    openssl genpkey						\
    -pass pass:"${PASS}"					\
    -algorithm RSA						\
    -aes256							\
    -pkeyopt rsa_keygen_bits:4096				\
    -out /tmp/jwt.privkey.pem
    openssl rsa							\
    -passin pass:"${PASS}"					\
    -in /tmp/jwt.privkey.pem					\
    -pubout							\
    -outform PEM						\
    -out /tmp/jwt.pubkey.pem
  fi
}

prisma_migrate() {
  if [ $1 = 'deploy' ]; then
    npx prisma generate						\
    --schema /usr/prisma/schema.prisma
    npx prisma migrate deploy					\
    --schema /usr/prisma/schema.prisma
  elif [ $1 = 'dev' ] || [ $1 = 'test' ]; then
    npx prisma migrate dev					\
    --schema /usr/prisma/schema.prisma				\
    --name prisma
  fi
}

main() {
  check_argument "$@"
  cd /usr/app
  yarn
  prisma_env_generator
  mkdir /tmp/.secrets/jwt
  credentials_generator_jwt
  prisma_migrate "$@"
  yarn $@
}

main "$@"

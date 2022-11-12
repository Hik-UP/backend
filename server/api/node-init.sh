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

generate_signup_jwt_keys() {
  local readonly PASS="$(tr -dc A-Za-z0-9 </dev/urandom | head -c 128)"

  if ! [ -f "/tmp/.secrets/jwt/signup.privkey.pem" ] 		||
  ! [ -f "/tmp/.secrets/jwt/signup.pubkey.pem" ]; then
    printf "${PASS}" > /tmp/.secrets/jwt/signup.privkey.passphrase
    openssl genpkey						\
    -pass pass:"${PASS}"					\
    -algorithm RSA						\
    -aes256							\
    -pkeyopt rsa_keygen_bits:4096				\
    -out /tmp/.secrets/jwt/signup.privkey.pem
    openssl rsa							\
    -passin pass:"${PASS}"					\
    -in /tmp/.secrets/jwt/signup.privkey.pem			\
    -pubout							\
    -outform PEM						\
    -out /tmp/.secrets/jwt/signup.pubkey.pem
  fi
}

generate_login_jwt_keys() {
  local readonly PASS="$(tr -dc A-Za-z0-9 </dev/urandom | head -c 128)"

  if ! [ -f "/tmp/.secrets/jwt/login.privkey.pem" ] 		||
  ! [ -f "/tmp/.secrets/jwt/login.pubkey.pem" ]; then
    printf "${PASS}" > /tmp/.secrets/jwt/login.privkey.passphrase
    openssl genpkey						\
    -pass pass:"${PASS}"					\
    -algorithm RSA						\
    -aes256							\
    -pkeyopt rsa_keygen_bits:4096				\
    -out /tmp/.secrets/jwt/login.privkey.pem
    openssl rsa							\
    -passin pass:"${PASS}"					\
    -in /tmp/.secrets/jwt/login.privkey.pem			\
    -pubout							\
    -outform PEM						\
    -out /tmp/.secrets/jwt/login.pubkey.pem
  fi
}

generate_user_jwt_keys() {
  local readonly PASS="$(tr -dc A-Za-z0-9 </dev/urandom | head -c 128)"

  if ! [ -f "/tmp/.secrets/jwt/user.privkey.pem" ] 		||
  ! [ -f "/tmp/.secrets/jwt/user.pubkey.pem" ]; then
    printf "${PASS}" > /tmp/.secrets/jwt/user.privkey.passphrase
    openssl genpkey						\
    -pass pass:"${PASS}"					\
    -algorithm RSA						\
    -aes256							\
    -pkeyopt rsa_keygen_bits:4096				\
    -out /tmp/.secrets/jwt/user.privkey.pem
    openssl rsa							\
    -passin pass:"${PASS}"					\
    -in /tmp/.secrets/jwt/user.privkey.pem			\
    -pubout							\
    -outform PEM						\
    -out /tmp/.secrets/jwt/user.pubkey.pem
  fi
}

prisma_migrate() {
  if [ $1 = 'deploy' ]; then
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
  generate_signup_jwt_keys
  generate_login_jwt_keys
  generate_user_jwt_keys
  prisma_migrate "$@"
  yarn $@
}

main "$@"

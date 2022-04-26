# Use the official Mysql image.
# https://hub.docker.com/_/mysql
FROM mysql:5.7

ADD script.sql /docker-entrypoint-initdb.d/script.sql

RUN ls /var/lib/mysql
# Backend-base - Instalación (Backend)

- Nodejs 12 en adelante
- Postgresql 9 en adelante

## Instalando las dependencias necesarias

Se realizaron distintas instalaciones en el servidor de TEST Debian 10, a continuación las configuraciones realizadas.

### Herramientas genéricas

- Actualizar repositorios

```sh
sudo apt-get update
```

- Certificados

En la plantilla de la máquina virtual de producción se tuvieron problemas con los certificados, para resolverlo se instaló lo siguiente:

```sh
sudo  apt-get install ca-certificates
```

- Build Essentials

```sh
sudo apt-get install build-essential libssl-dev
```

- Generación de reportes PDF

```sh
sudo apt-get install libfontconfig1
```

- Curl y Wget

Si no se tiene instalado el curl y el wget, se recomienda instalar al menos uno de ellos.

```sh
sudo  apt-get install curl
sudo  apt-get install wget
```

### Postgres

Para instalar Postgres se realizaron los pasos, basados en el siguiente enlace:

Como se indica se ejecutaron los siguientes comandos:

```sh
sudo apt-get install postgresql postgresql-contrib
```
```sh
sudo -U postgres -H localhost psql
```

El último comando sólo es par comprobar la instalación.

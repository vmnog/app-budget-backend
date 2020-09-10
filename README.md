# app-budget-backend

### How to install

*Clone the repository*
```
$ git clone  https://github.com/vmnog/app-budget-backend.git

$ cd app-budget-backend

$ yarn dev:server
```

*Create your docker container*
```
docker run --name app-budget -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```
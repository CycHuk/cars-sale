# Cars Sale

Этот проект представляет собой веб-приложение для продажи автомобилей.

## Технологии

- [Node js](https://nodejs.org/en)
- [express js](https://expressjs.com/ru/)
- [handlebars](https://handlebarsjs.com/)
- [MySQL](https://www.mysql.com/)
- [Prisma](https://www.prisma.io/)

## Инструкции по запуску проекта

- Убедитесь, что у вас установлен Node.js и npm.
- Склонируйте репозиторий на локальную машину.
- Установите зависимости, выполнив команду:

```sh
$ npm install
```

- Создайте базу данных с названием **cars-sale**.
- Импортируйте содержимое базы данных из файла **./database/cars-sale.sql**.
- В корневой директории проекта настройке файл .env и укажите в нем параметры подключения к вашей базе данных. Пример:

```sh
PORT=3000
JWT_SECRET=sdfkjghalhgkgvh

DATABASE_URL="mysql://root:@localhost:3306/cars-sale"
```

- Запустите приложение, выполните команду:

```sh
$ npm run start
```

- Откройте браузер и перейдите по адресу http://localhost:3000 для доступа к приложению.

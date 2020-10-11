/** Список команд для реализации:
 * cd ./server
 * sequelize init
 * npm install --save apollo-server-express@1 graphql-tools graphql express body-parser
 * npm i pg pg-hstore
 *
 * Ссылки на статьи:
 * https://medium.com/valtech-ch/setup-a-graphql-api-with-apollo-2-0-sequelize-and-express-js-608d1365d776
 * https://medium.com/codingthesmartway-com-blog/apollo-server-2-introduction-efc4026f5654
 * https://markomatic.me/blog/node-express-sequelize-pg-graphql/
 * https://www.digitalocean.com/community/tutorials/how-to-set-up-a-graphql-server-in-node-js-with-apollo-server-and-sequelize
 */

const express = require("express");
const bodyParser = require("body-parser");
const faker = require("faker/locale/en");
const chalk = require("chalk");

const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const cors = require("cors");

/**
 * Пример для создания точки Graphql
 */

// Схема GraphQL в форме строки
const typeDefs = require("./schema");

// Резолверы
const resolvers = require("./resolvers");

// База данных
const db = require("./models/index");

// Соедняем всё в схему
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  context: { db },
});

// Инициализация express-приложения
const app = express();
const PORT = 3000;

// Настройка CORS политики для разработки
app.use(cors());

// Точка входа GraphQL
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({ schema, context: { db } })
);

// GraphiQL, визуальный редактор для запросов
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Работа со статическими файлами
app.use(express.static("./public"));

// Корневой путь API
app.get("/", (req, res) => res.send("Серверная часть проекта ФИШКА"));

// TODO: добавить заполнение фейковыми данными

db.sequelize.sync({ alter: true }).then(async () => {
  app.listen(PORT, () => {
    console.log(
      chalk.yellow(`Сервер (Graphiql) запущен на`),
      chalk.cyan(`http://localhost:${PORT}/graphiql`)
    );
  });
});

/* TODO:
  Рекомендую использовать следующие библиотеки
  (перед использованием необходимо установить, см. документацию каждой библиотеки в Интернете)
  - const expressJwt = require("express-jwt");
  - const bcrypt = require("bcrypt")
*/

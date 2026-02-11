import jsonServer from "json-server";
import path from "path";
import http from "http";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, "db.json"));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 800);
  });
  next();
});

let notificationsCount = 1;

// Эндпоинт для уведомлений
server.get("/notifications", (req, res) => {
  try {
    notificationsCount += 1;

    return res.json({ notificationsCount });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

server.use(router);

// запуск сервера
const HTTP_PORT = 8080;

const httpServer = http.createServer(server);

httpServer.listen(HTTP_PORT, () => {
  console.log(`server is running on ${HTTP_PORT} port`);
});

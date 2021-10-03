import express, { Application } from 'express';
import http, { Server } from 'http';
import config from './config';
import { middleware } from '@five-m/api-helpers';
import routes from './routes';
import errorHandler from './middleware/errorHandler';

const app: Application = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(middleware.requestLogger({ showBody: true, showQuery: true }));

app.use('/', routes);

app.use(errorHandler);

const server: Server = http.createServer(app);

server.listen(config.getPort(), () => console.log(`Server running on port ${config.getPort()}`));

import express from 'express';
import { rootHandler, transformationHandler } from './api/handlers';
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || '8000';

app.get('/', rootHandler);
app.post('/transform', transformationHandler);

app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
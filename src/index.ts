import express, { Application } from 'express';
import { rootHandler, transformationHandler } from './api/handlers';
import bodyParser from "body-parser";
import router from './router';


export const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || '8000';

app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});

router(app)

export default app;
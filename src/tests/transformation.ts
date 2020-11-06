
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { rootHandler, transformationHandler } from '../api/handlers';
import path from 'path';
import fs from 'fs';

const testInput = JSON.parse(fs.readFileSync(path.join(__dirname, './data/input.json'), 'utf8'));
const testOutPut = JSON.parse(fs.readFileSync(path.join(__dirname, './data/output.json'), 'utf8'));

describe('Post Endpoints', () => {

    const app = express();
    app.use(bodyParser.json());
    rootHandler(app)
    transformationHandler(app)

    it('GET Works', async () => {
        const res = await request(app).get('/');
        expect(res.status).toEqual(200)
        expect(res.body.msg).toStrictEqual('API is working')
    })

    it('POST Works', async () => {
        console.log(testInput)
        const res = await request(app).post('/transform').set('Content-Type', 'application/json').send(testInput);
        expect(res.status).toEqual(200)
        expect(res.body).toStrictEqual(testOutPut)
    })
});

import supertest from 'supertest';
import urls from '../configs/urls';

const Todos = {
    get: async(token, path = '/todos', contentType = 'application/json') => {
        const response = await supertest(urls.challenge)
        .get(path)
        .set('X-CHALLENGER', token)
        .set("Accept", contentType);
        return response;
    },
    post: async(token, body) => {
        const response = await supertest(urls.challenge)
        .post("/todos")
        .send(body)
        .set('X-CHALLENGER', token);
        return response;
    },
    update: async(token, id, body) => {
        const response = await supertest(urls.challenge)
        .post(`/todos/${id}`)
        .send(body)
        .set('X-CHALLENGER', token);
        return response;
    },
    delete: async(token, id) => {
        const response = await supertest(urls.challenge)
        .post(`/todos/${id}`)
        .set('X-CHALLENGER', token);
        return response;
    },
    head: async(token) => {
        const response = await supertest(urls.challenge)
        .head(`/todos`)
        .set('X-CHALLENGER', token);
        return response;
    }
};

export default Todos;
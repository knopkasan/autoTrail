import supertest from 'supertest';
import urls from '../configs/urls';

const Todos = {
    get: async(token) => {
        const response = await supertest(urls.challenge)
        .get(`/todos`)
        .set('X-CHALLENGER', token);
        return response;
    },
    getTodoById: async(token, id) => {
        const response = await supertest(urls.challenge)
        .get(`/todos/${id}`)
        .set('X-CHALLENGER', token);
        return response;
    },
    getByDoneStatus: async(token, status) => {
        const response = await supertest(urls.challenge)
        .get(`/todos/${id}?doneStatus=${status}`)
        .set('X-CHALLENGER', token);
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
        .body(body)
        .set('X-CHALLENGER', token);
        return response;
    },
    delete: async(token, id) => {
        const response = await supertest(urls.challenge)
        .post(`/todos/${id}`)
        .set('X-CHALLENGER', token);
        return response;
    },
    head: async() => {
        const response = await supertest(urls.challenge)
        .head(`/todos`)
        .set('X-CHALLENGER', token);
        return response;
    }
};

export default Todos;
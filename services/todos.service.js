import supertest from 'supertest';
import { urls } from '../configs/index';

const Todos = {
  get: async (token, path = '', acceptType = 'application/json') => {
    const response = await supertest(urls.challenge)
      .get(`/todos${path}`)
      .set('X-CHALLENGER', token)
      .set('Accept', acceptType);
    return response;
  },
  post: async (token, body) => {
    const response = await supertest(urls.challenge)
      .post('/todos')
      .send(body)
      .set('X-CHALLENGER', token);
    return response;
  },
  update: async (token, id, body) => {
    const response = await supertest(urls.challenge)
      .post(`/todos/${id}`)
      .send(body)
      .set('X-CHALLENGER', token);
    return response;
  },
  delete: async (token, id) => {
    const response = await supertest(urls.challenge)
      .post(`/todos/${id}`)
      .set('X-CHALLENGER', token);
    return response;
  },
  head: async (token) => {
    const response = await supertest(urls.challenge)
      .head('/todos')
      .set('X-CHALLENGER', token);
    return response;
  },
};

export default Todos;

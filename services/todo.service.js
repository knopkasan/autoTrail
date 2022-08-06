import supertest from 'supertest';
import { urls } from '../configs/index';

const Todo = {
  get: async (token) => {
    const response = await supertest(urls.challenge)
      .get('/todo')
      .set('X-CHALLENGER', token);
    return response;
  },
};

export default Todo;

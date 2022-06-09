import supertest from 'supertest';
import urls from '../configs/urls';

const Challenges = {
    get: async(token) => {
        const response = await supertest(urls.challenge)
        .get('/challenges')
        .set('Accept', 'application/json')
        .set('X-CHALLENGER', token);
        return response;
    }

};

export default Challenges;
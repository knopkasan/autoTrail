import { allure } from 'allure-mocha/dist/MochaAllureReporter';
import supertest from 'supertest';
import urls from '../configs/urls';
import { loadApispec, validate} from '../lib/validator';

const Chanllenges = {
    get: async(token)=>{
        const response = await supertest(urls.challenge)
        .get('/challenges')
        .set('X-CHALLENGER', token);
        allure.attachment('response', JSON.stringify(response.body), 'application/json');

        const apiSpec = await loadApispec('https://apichallenges.herokuapp.com/docs/swagger');
        const schema = apiSpec.paths['/challenges'].get.responses[200];
        validate(schema, response.body);
        return response;
    }
}; 

export default Chanllenges;
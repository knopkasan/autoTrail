import chai from 'chai';
import Challenger from '../services/challenger.service';
import Challenges from '../services/challenges.service';
import Todos from '../services/todos.service';
import Todo from '../services/todo.service';
const assert = chai.assert;

describe ('Отправляем сетевые запросы', () => {
    let token;
    before ('Получить токен', async () => {
       const response = await Challenger.post();
       token = response.headers['x-challenger'];
    });
    after ('Посмотреть результат', async () => {
        console.log('Результаты смотреть тут:')
        console.log(`https://apichallenges.herokuapp.com/gui/challenges/${token}`);
        });
   
    it ('Получить список заданий, 200', async () => {
        const r = await Challenges.get(token);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });
    it ('Получить список задач, 200', async () => {
        const r = await Todos.get(token);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });
    it ('Вызвать несуществующий ендпоинт, 404', async () => {
        const r = await Todo.get(token);
        assert.strictEqual(r.statusCode, 404, 'statusCode не 404');
    });
    it ('Получить задачу по id, 200', async () => {
        let body = {
            "title": "test",
            "doneStatus": true,
            "description": ""
        };
        let createdTodo = (await Todos.post(token, body)).headers['location'];
        let id = createdTodo.match('/\d+/g');
        const r = await Todos.get(token, id);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });
});

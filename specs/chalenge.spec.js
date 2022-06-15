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
        let path = '/todo'
        const r = await Todo.get(token, path);
        assert.strictEqual(r.statusCode, 404, 'statusCode не 404');
    });
    it ('Получить задачу по id, 200', async () => {
        let body = {
            "title": "test",
            "doneStatus": true,
            "description": ""
        };

        let createdTodo = await Todos.post(token, body);
        let id = createdTodo._body["id"];
        let path = `/todos/${id}`
        const r = await Todos.get(token, path);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });
    it ('Попытатьcя получить задачу по несуществующему id, 404', async () => {
        let path = `/todos/0`
        const r = await Todos.get(token, path);
        assert.strictEqual(r.statusCode, 404, 'statusCode не 404');
    });
    it ('Получить заголовки ендпоинта /todos, 200', async () => {
        const r = await Todos.head(token)
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });
    it ('Создать задачу, 201', async () => {
        let body = {
            "title": "test",
            "doneStatus": true,
            "description": ""
        };
        const r = await Todos.post(token, body);
        assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
    });
    it ('Отфильтровать список задач по статусу, 200', async () => {
        let path = `/todos?doneStatus=true`
        const r = await Todos.get(token, path);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });
    it ('Попытаться создать задачу с невалидным статусом, 400', async () => {
        let body = {
            "title": "test",
            "doneStatus": "cat",
            "description": ""
        };
        const r = await Todos.post(token, body);
        assert.strictEqual(r.statusCode, 400, 'statusCode не 400');
    });
    it ('Обновить существующую задачу, 200', async () => {
        let body1 = {
            "title": "test",
            "doneStatus": true,
            "description": ""
        };
        let body2 = {
            "title": "test1",
            "doneStatus": true,
            "description": "ololo"
        };
        let createdTodo = await Todos.post(token, body1);
        let id = createdTodo._body["id"];
        const r = await Todos.update(token, id, body2);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });
});

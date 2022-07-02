import chai from 'chai';
import Challenger from '../services/challenger.service';
import Challenges from '../services/challenges.service';
import Todos from '../services/todos.service';
import Todo from '../services/todo.service';
import TodoBuilder from '../fixtures/builder/todo';
const assert = chai.assert;

describe ('Отправляем сетевые запросы', () => {
    let token;
    before ('Получить токен', async () => {
        const {headers} = await Challenger.post();
        token = headers['x-challenger'];
    });
    after ('Посмотреть результат', async () => {
        console.log('Результаты смотреть тут:')
        console.log(`https://apichallenges.herokuapp.com/gui/challenges/${token}`);
        });
   
    it ('Получить список заданий, 200', async () => {
        const {statusCode} = await Challenges.get(token);
        assert.strictEqual(statusCode, 200, 'statusCode не 200');
    });
    it ('Получить список задач, 200', async () => {
        const {statusCode} = await Todos.get(token);
        assert.strictEqual(statusCode, 200, 'statusCode не 200');
    });
    it ('Вызвать несуществующий эндпоинт, 404', async () => {
        const {statusCode} = await Todo.get(token);
        assert.strictEqual(statusCode, 404, 'statusCode не 404');
    });
    it ('Получить задачу по id, 200', async () => {
        const task = new TodoBuilder().setName().setDescription().setDoneStatus(false).build();
    
        const { body } = await Todos.post(token, task);
        let id = '/' + body.id;
        const { statusCode } = await Todos.get(token, id);
        assert.strictEqual(statusCode, 200, 'statusCode не 200');
    });
    it ('Попытатьcя получить задачу по несуществующему id, 404', async () => {
        let id = `/0`
        const { statusCode } = await Todos.get(token, id);
        assert.strictEqual(statusCode, 404, 'statusCode не 404');
    });
    it ('Получить заголовки ендпоинта /todos, 200', async () => {
        const { statusCode } = await Todos.head(token)
        assert.strictEqual(statusCode, 200, 'statusCode не 200');
    });
    it ('Создать задачу, 201', async () => {
        const task = new TodoBuilder().setName().setDescription().setDoneStatus(false).build();

        const { statusCode } = await Todos.post(token, task);
        assert.strictEqual(statusCode, 201, 'statusCode не 201');
    });
    it ('Отфильтровать список задач по статусу, 200', async () => {
        let filter = `?doneStatus=true`
        const { statusCode } = await Todos.get(token, filter);
        assert.strictEqual(statusCode, 200, 'statusCode не 200');
    });
    it ('Попытаться создать задачу с невалидным статусом, 400', async () => {
        const task = new TodoBuilder().setName().setDescription().setDoneStatus('cat').build();

        const { statusCode } = await Todos.post(token, task);
        assert.strictEqual(statusCode, 400, 'statusCode не 400');
    });
    it ('Обновить существующую задачу, 200', async () => {
        const task = new TodoBuilder().setName().setDescription().setDoneStatus(false).build();

        const updatedTask = new TodoBuilder().setName().setDescription().setDoneStatus(true).build();

        const { body } = await Todos.post(token, task);
        let id = body.id;
        const { statusCode } = await Todos.update(token, id, updatedTask);
        assert.strictEqual(statusCode, 200, 'statusCode не 200');
    });
});

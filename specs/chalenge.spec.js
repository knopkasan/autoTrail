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
    it ('Вызвать несуществующий эндпоинт, 404', async () => {
        const r = await Todo.get(token);
        assert.strictEqual(r.statusCode, 404, 'statusCode не 404');
    });
    it ('Получить задачу по id, 200', async () => {
        const task = new TodoBuilder().setName().setDescription().setDoneStatus('false').build();
    
        let createdTodo = await Todos.post(token, task);
        let id = '/' + createdTodo.id;
        const r = await Todos.get(token, id);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });
    it ('Попытатьcя получить задачу по несуществующему id, 404', async () => {
        let id = `/0`
        const r = await Todos.get(token, id);
        assert.strictEqual(r.statusCode, 404, 'statusCode не 404');
    });
    it ('Получить заголовки ендпоинта /todos, 200', async () => {
        const r = await Todos.head(token)
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });
    it ('Создать задачу, 201', async () => {
        const task = new TodoBuilder().setName().setDescription().setDoneStatus('false').build();

        const r = await Todos.post(token, task);
        assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
    });
    it ('Отфильтровать список задач по статусу, 200', async () => {
        let filter = `?doneStatus=true`
        const r = await Todos.get(token, filter);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });
    it ('Попытаться создать задачу с невалидным статусом, 400', async () => {
        const task = new TodoBuilder().setName().setDescription().setDoneStatus('cat').build();

        const r = await Todos.post(token, task);
        assert.strictEqual(r.statusCode, 400, 'statusCode не 400');
    });
    it ('Обновить существующую задачу, 200', async () => {
        const task = new TodoBuilder().setName().setDescription().setDoneStatus('false').build();

        const updatedTask = new TodoBuilder().setName().setDescription().setDoneStatus('true').build();

        let createdTodo = await Todos.post(token, task);
        let id = createdTodo.id;
        const r = await Todos.update(token, id, updatedTask);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });
});

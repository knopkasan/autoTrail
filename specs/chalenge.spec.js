import chai from 'chai';
import { api } from '../services/index';
import { TodoBuilder } from '../fixtures/builder/index';

const { assert } = chai;

describe('Отправляем сетевые запросы', () => {
  let token;
  before('Получить токен', async () => {
    const { headers } = await api().Challenger().post();
    token = headers['x-challenger'];
  });
  after('Посмотреть результат', async () => {
    console.log('Результаты смотреть тут:');
    console.log(`https://apichallenges.herokuapp.com/gui/challenges/${token}`);
  });

  it('Получить список заданий, 200', async () => {
    const { statusCode } = await api().Challenges().get(token);
    assert.strictEqual(statusCode, 200, 'statusCode не 200');
  });
  it('Получить список задач, 200', async () => {
    const { statusCode } = await api().Todos().get(token);
    assert.strictEqual(statusCode, 200, 'statusCode не 200');
  });
  it('Вызвать несуществующий эндпоинт, 404', async () => {
    const { statusCode } = await api().Todo().get(token);
    assert.strictEqual(statusCode, 404, 'statusCode не 404');
  });
  it('Получить задачу по id, 200', async () => {
    const task = new TodoBuilder().setName().setDescription().setDoneStatus(false)
      .build();

    const { body } = await api().Todos().post(token, task);
    const id = `/${body.id}`;
    const { statusCode } = await api().Todos().get(token, id);
    assert.strictEqual(statusCode, 200, 'statusCode не 200');
  });
  it('Попытатьcя получить задачу по несуществующему id, 404', async () => {
    const id = '/0';
    const { statusCode } = await api().Todos().get(token, id);
    assert.strictEqual(statusCode, 404, 'statusCode не 404');
  });
  it('Получить заголовки ендпоинта /todos, 200', async () => {
    const { statusCode } = await api().Todos().head(token);
    assert.strictEqual(statusCode, 200, 'statusCode не 200');
  });
  it('Создать задачу, 201', async () => {
    const task = new TodoBuilder().setName().setDescription().setDoneStatus(false)
      .build();

    const { statusCode } = await api().Todos().post(token, task);
    assert.strictEqual(statusCode, 201, 'statusCode не 201');
  });
  it('Отфильтровать список задач по статусу, 200', async () => {
    const filter = '?doneStatus=true';
    const { statusCode } = await api().Todos().get(token, filter);
    assert.strictEqual(statusCode, 200, 'statusCode не 200');
  });
  it('Попытаться создать задачу с невалидным статусом, 400', async () => {
    const task = new TodoBuilder().setName().setDescription().setDoneStatus('cat')
      .build();

    const { statusCode } = await api().Todos().post(token, task);
    assert.strictEqual(statusCode, 400, 'statusCode не 400');
  });
  it('Обновить существующую задачу, 200', async () => {
    const task = new TodoBuilder().setName().setDescription().setDoneStatus(false)
      .build();

    const updatedTask = new TodoBuilder().setName().setDescription().setDoneStatus(true)
      .build();

    const { body } = await api().Todos().post(token, task);
    const { id } = body;
    const { statusCode } = await api().Todos().update(token, id, updatedTask);
    assert.strictEqual(statusCode, 200, 'statusCode не 200');
  });
});

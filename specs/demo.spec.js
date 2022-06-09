import chai from 'chai';
import supertest from 'supertest'
const assert = chai.assert;

describe ('Это демо сьют', () => {
    it ('Калькулятор', () => {
        //arrange
        const numberA = 1;

        //act + assert
        assert.strictEqual(numberA + 1, 2, 'Wow!!');
    });
});

describe ('Send request', () => {
    it ('Получить список доступных книг get /booking 200', async () => {
        const response = await supertest('https://restful-booker.herokuapp.com')
        .get('/booking');

        assert.strictEqual(response.statusCode, 200, 'StatusCose != 200');
    });
    it ('Создать новую книгу post /booking 200', async () => {
        const bookNew = {
            "firstname" : "Jim",
            "lastname" : "Brown",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Breakfast"
        };
        const response = await supertest('https://restful-booker.herokuapp.com')
        .post('/booking')
        .set('Accept', 'application/json')
        .send(bookNew);

        assert.strictEqual(response.statusCode, 200, 'StatusCose != 200'); 
    });
});
import { faker } from '@faker-js/faker';

const GetNewTodo = function (title, description, doneStatus) {
  this.title = title;
  this.description = description;
  this.doneStatus = doneStatus;
};

const TodoBuilder = function () {
  return {
    setName() {
      this.title = faker.internet.domainName();
      return this;
    },
    setDescription() {
      this.description = faker.lorem.text();
      return this;
    },
    setDoneStatus(doneStatus) {
      this.doneStatus = doneStatus;
      return this;
    },

    build() {
      console.log(this);
      return new GetNewTodo(this.title, this.description, this.doneStatus);
    },
  };
};

export default TodoBuilder;

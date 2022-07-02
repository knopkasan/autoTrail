import { faker } from "@faker-js/faker";

let getNewTodo = function(title, description, doneStatus){ 
        this.title = title;
        this.description = description;
        this.doneStatus = doneStatus;
    };

let TodoBuilder = function () {
return { 
    setName: function () {
        this.title = faker.internet.domainName();
        return this;
    },
    setDescription: function () {
        this.description = faker.lorem.text();
        return this;
    },
    setDoneStatus: function (doneStatus) {
        this.doneStatus = doneStatus;
        return this;
    },

    build: function (){
        console.log(this);
        return new getNewTodo(this.title, this.description, this.doneStatus);
    }
}
};

export default TodoBuilder;

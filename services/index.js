import Challenger from './challenger.service';
import Challenges from './challenges.service';
import Todo from './todo.service';
import Todos from './todos.service';

const api = () => ({
  Challenger: () => ({ ...Challenger }),
  Challenges: () => ({ ...Challenges }),
  Todo: () => ({ ...Todo }),
  Todos: () => ({ ...Todos }),
});

export { api };

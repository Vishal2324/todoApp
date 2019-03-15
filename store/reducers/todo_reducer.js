const ADD_TODO = 'TODO/TODO/ADD_TODO';
const UPDATE_TODO = 'TODO/TODO/UPDATE_TODO';
const DELETE_TODO = 'TODO/TODO/DELETE_TODO';

const initialState = { 
    todos: [{
        taskId: '1',
        taskName: 'school',
        status: 'A',
        dueDate: '14-03-2019'
    },{
        taskId: '2',
        taskName: 'gym',
        status: 'C',
        dueDate: '20-03-2019'
    },{
        taskId: '3',
        taskName: 'office',
        status: 'A',
        dueDate: '22-03-2019'
    },{
        taskId: '4',
        taskName: 'games',
        status: 'C',
        dueDate: '24-03-2019'
    },],
};

export default function todo_reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
    console.log(action.todo);
      return {
        todos: [
            ...state.todos,
            action.todo
        ],
      };
    case UPDATE_TODO:    
        let todos = [...state.todos];
        //console.log(action.todo);
        let indexOfUpdate = todos.findIndex((todo) =>{
            return todo.taskId == action.todo.taskId;
        });        
        //console.log(indexOfUpdate);
        todos[indexOfUpdate] = action.todo;        
        return {
            ...state,
            todos: todos,
        }
    case DELETE_TODO:
        return {
            todos: state.todos.filter(x => x.taskId !== action.todo)
        }
    default:
      return state;
  }
}

export function addTodo(todo) {    
    return {
        type: ADD_TODO,
        todo,
    };
}

export function updateTodo(todo){
    return {
        type: UPDATE_TODO,        
        todo,
    }
}

export function deleteTodo(todo){
    return {
        type: DELETE_TODO,
        todo,        
    }
}
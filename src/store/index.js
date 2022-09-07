import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        // counter: 0,
        todos: [],
        newTodo: '',

    },
    mutations: {
        // decreaseCounter(state) {
        //     state.counter--
        // },
        // increaseCounter(state) {
        //     state.counter++;
        // },
        fetchTodos(state, todos) {
            state.todos = todos;
        },
        setTodo(state, newValue) {
            state.newTodo = newValue;
        },
        addTodo(state, newTodo) {
            state.todos.unshift(newTodo)
            console.log(state.todos)
        },
    },
    actions: {
        fetchTodos({ commit }) {
            console.log('fetching todos...')
            axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
                .then(response => {
                    console.log(response.data)
                    commit('fetchTodos', response.data)
                });
        },
        addTodo({ commit }, title) {
            axios.post('https://jsonplaceholder.typicode.com/todos', {userID: 1, title, completed: false})
                .then(response => {
                    commit('addTodo', response.data)
                });
        },
    },
    getters: {
    },
    modules: {
    },
})

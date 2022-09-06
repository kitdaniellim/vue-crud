import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        counter: 0,
        todos: []
    },
    mutations: {
        decreaseCounter(state) {
            state.counter--
        },
        increaseCounter(state) {
            state.counter++;
        },
        fetchTodos(state, todos) {
            state.todos = todos;
        },
    },
    actions: {
        fetchTodos({ commit }) {
            console.log('fetching todos...')
            axios('https://jsonplaceholder.typicode.com/todos?_limit=10')
                .then(response => {
                    commit('fetchTodos', response.data)
                });
        }
    },
    getters: {
    },
    modules: {
    },
})

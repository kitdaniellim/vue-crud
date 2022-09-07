import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        todos: [],
        newTodo: '',

    },
    mutations: {
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
        updateTodo(state, updTodo) {
            const index = state.todos.findIndex(todo => todo.id === updTodo.id);
            if(index !== -1) {
                state.todos.splice(index, 1, updTodo);
            }
        },
        deleteTodo(state, id) {
            state.todos = state.todos.filter(todo => todo.id !== id);
        },
    },
    actions: {
        fetchTodos({ commit }) {
            console.log('fetching todos...')
            axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
                .then(response => {
                    commit('fetchTodos', response.data)
                });
        },
        setTodo({ commit }, newValue) {
            commit('setTodo', newValue)
        },
        addTodo({ commit }, title) {
            axios.post('https://jsonplaceholder.typicode.com/todos', {userID: 1, title, completed: false})
                .then(response => {
                    commit('addTodo', response.data)
                });
        },
        updateTodo({ commit }, updTodo) {
            axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`)
                .then(() => {
                    commit('updateTodo', updTodo)
                });
        },
        deleteTodo({ commit }, id) {
            axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
                .then(() => {
                    commit('deleteTodo', id)
                });
        },
    },
    getters: {

    },
    modules: {

    },
})

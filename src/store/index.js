import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
  },
  strict: process.env.DEV,
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
        console.log("todo is deleted")
    },
  },
  actions: {
    fetchTodos({ commit }) {
        console.log('fetching todos...')
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20')
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
                commit('setTodo', '')
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
  }
})

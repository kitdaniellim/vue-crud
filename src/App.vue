<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <div class="container">
    <AddTodo/>
    <TodosList/>
  </div>
</template>

<script>
import TodosList from './components/TodosList.vue'
import AddTodo from './components/AddTodo.vue';

export default {
  name: 'App',
  components: {
    TodosList,
    AddTodo,
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <h3>Todos</h3>
  <div class="hello">
    <div class="counter">
      {{ $store.state.counter }}
    </div>
    <div class="buttons">
      <button @click="$store.commit('decreaseCounter')">-</button>
      <button @click="$store.commit('increaseCounter')">+</button>
    </div>
    <div class="todos">
      <ul v-for="todo in $store.state.todos" :key="todo.id">
        {{ todo.title }}
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodosList',

  beforeMount() {
    this.$store.dispatch('fetchTodos');
  },
}
</script>

<style scoped>

</style>

<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-evenly container-fluid m-3">
      <span>Double click to mark as complete</span>
      <span> <span class="complete-box"></span> = Complete </span>
      <span> <span class="incomplete-box"></span> = Incomplete </span>
    </div>
    <div class="mb-5">
      <div
        @click="$store.dispatch('updateTodo', { id: todo.id, title: todo.title, completed: !todo.completed })"
        v-for="todo in $store.state.todos"
        :key="todo.id"
        class="todo"
        v-bind:class="{ 'is-not-complete': !todo.completed }"
      >
        {{ todo.title }}
        <button
          @click="$store.dispatch('deleteTodo', todo.id)"
          class="btn btn-dark position-absolute top-50 end-0 translate-middle-y"
        >
          <font-awesome-icon 
            icon="fa-solid fa-trash" 
            class="icon"
          />
        </button>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodosList",
  beforeMount() {
    this.$store.dispatch("fetchTodos");
  },
};
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}

.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}

.icon {
  color: #fff;
  cursor: pointer;
}

.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}

.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}

.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}

.is-not-complete {
  background: #35495e;
  color: #fff;
}
</style>

<template>
  <div class="container">
    <h1 class="display-2">My Todo List</h1>
    <div class="add">
      <form class="d-flex" @submit="onSubmit">
        <input 
          class="form-control me-3"
          type="text" 
          v-model="newTodo" 
          placeholder="Add Todo..." 
        />
        <input type="submit" class="btn btn-success" value="Submit">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddTodo",
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.$store.dispatch('addTodo', this.newTodo);
    }
  },
  computed: {
    newTodo: {
      get() {
        return this.$store.state.newTodo
      },
      set(newValue) {
        this.$store.dispatch('setTodo', newValue)
      }
    }
  },
};
</script>

<style scoped>
input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid #41b883;
  outline: 0;
}
input[type="submit"] {
  flex: 2;
  background: #41b883;
  color: #fff;
  border: 1px #41b883 solid;
  cursor: pointer;
}
</style>

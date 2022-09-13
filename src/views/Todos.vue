<template>
  <div>
    <div class="todo-app-list">
      <!-- App Add Todo Bar Header -->
      <div class="d-flex flex-row mb-2 w-100">
        <!-- Add Todo Bar -->
        <div class="align-content-center w-75">
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon icon="PlusCircleIcon" class="text-muted" />
            </b-input-group-prepend>
            <b-form-input v-model="newTodo" placeholder="Add Todo..." />
          </b-input-group>
        </div>
        <div class="ml-2 w-25">
          <button
            type="submit"
            @click="submitTodo"
            class="btn btn-primary btn-block"
          >
            Submit
          </button>
        </div>
      </div>

      <!-- App Searchbar Header -->
      <div class="app-fixed-search d-flex align-items-center">
        <!-- Searchbar -->
        <div
          class="d-flex align-content-center justify-content-between w-100 mb-2"
        >
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon icon="SearchIcon" class="text-muted" />
            </b-input-group-prepend>
            <b-form-input :value="''" placeholder="Search task" @input="0" />
          </b-input-group>
        </div>
      </div>

      <!-- Todo List -->
      <vue-perfect-scrollbar
        :settings="perfectScrollbarSettings"
        class="todo-task-list-wrapper list-group scroll-area"
      >
        <draggable
          v-model="$store.state.todos"
          handle=".draggable-task-handle"
          tag="ul"
          class="todo-task-list media-list"
        >
          <!-- <li
            v-for="todo in $store.state.todos"
            :key="todo.id"
            class="todo-item"
            :class="{ completed: todo.completed }"
            @click="
              $store.dispatch('updateTodo', {
                id: todo.id,
                title: todo.title,
                completed: !todo.completed,
              })
            "
          > -->
          <li
            v-for="todo in $store.state.todos"
            :key="todo.id"
            class="todo-item"
            :class="{ completed: todo.completed }"
          >
            <feather-icon
              icon="MoreVerticalIcon"
              class="draggable-task-handle d-inline"
            />
            <div class="todo-title-wrapper">
              <div class="todo-title-area">
                <div class="title-wrapper">
                  <b-form-checkbox
                    :checked="todo.completed"
                    @click.native.stop
                    @change="
                      $store.dispatch('updateTodo', {
                        id: todo.id,
                        title: todo.title,
                        completed: !todo.completed,
                      })
                    "
                  />
                  <span class="todo-title">{{ todo.title }}</span>
                </div>
              </div>
              <div 
                class="todo-item-action"
                @click="$store.dispatch('deleteTodo', todo.id)"
              >
                <b-avatar
                  size="32"
                  variant="light-danger"
                >
                  <feather-icon icon="Trash2Icon" size="16" />
                </b-avatar>
              </div>
            </div>
          </li>
        </draggable>
        <div class="no-results" :class="{ show: !$store.state.todos.length }">
          <h5>No Items Found</h5>
        </div>
      </vue-perfect-scrollbar>
    </div>
  </div>
</template>

<script>
import {
  BFormInput,
  BInputGroup,
  BInputGroupPrepend,
  BDropdown,
  BDropdownItem,
  BFormCheckbox,
  BBadge,
  BAvatar,
  BCard,
  BCardText,
  BLink,
} from "bootstrap-vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import draggable from "vuedraggable";
import { formatDate, avatarText } from "@core/utils/filter";
import { useResponsiveAppLeftSidebarVisibility } from "@core/comp-functions/ui/app";

export default {
  components: {
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BDropdown,
    BDropdownItem,
    BFormCheckbox,
    BBadge,
    BAvatar,
    draggable,
    VuePerfectScrollbar,
    BCard,
    BCardText,
    BLink,
  },

  methods: {
    submitTodo(e) {
      e.preventDefault();
      this.$store.dispatch("addTodo", this.newTodo);
    },
  },

  computed: {
    newTodo: {
      get() {
        return this.$store.state.newTodo;
      },
      set(newValue) {
        this.$store.dispatch("setTodo", newValue);
      },
    },
  },

  beforeMount() {
    this.$store.dispatch("fetchTodos");
  },

  setup() {
    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility();

    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    };

    return {
      perfectScrollbarSettings,

      // Filters
      formatDate,
      avatarText,

      // Left Sidebar Responsive
      mqShallShowLeftSidebar,
    };
  },
};
</script>

<style lang="scss" scoped>
.draggable-task-handle {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  visibility: hidden;
  cursor: move;

  .todo-task-list .todo-item:hover & {
    visibility: visible;
  }
}

.todo-title {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.completed {
  .todo-title {
    color: #b9b9c3;
  }
}
// ToDo task list area
.todo-task-list-wrapper {
  position: relative;
  height: calc(
    100% - 3.56rem
  ); // ? search box height (3.49rem) + 1px bottom border till 2 decimals
  background-color: #fff;
  border-radius: 0;
  .todo-task-list {
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      cursor: pointer;
      transition: all 0.2s, border-color 0s;
      position: relative;
      padding: 0.893rem 2rem;
      &:not(:first-child) {
        border-top: 1px solid #ebe9f1;
      }
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 3px 10px 0 #ebe9f1;
        transition: all 0.2s;
      }
      .todo-title-wrapper {
        display: flex;
        justify-content: space-between;
      }
      .todo-title-area,
      .title-wrapper {
        display: flex;
        align-items: center;
      }
      // Todo Item Action
      .todo-item-action {
        display: flex;
        align-items: center;
        justify-content: space-between;
        a {
          cursor: pointer;
          font-size: 1.2rem;
          line-height: 1.5;
        }
        &:hover {
        transform: translateY(-4px);
        transition: all 0.2s;
      }
      }

      .badge-wrapper {
        display: flex;
        .badge:not(:last-child) {
          margin-right: 0.5rem;
        }
      }
    }
  }
  // When we search, no-results
  .no-results {
    display: none;
    padding: 1.5rem;
    text-align: center;
    &.show {
      display: block;
    }
  }
}
</style>

<style lang="scss">
// @import "~@core/scss/base/pages/app-todo.scss";
// @import '@core/scss/base/pages/app-todo.scss';
</style>

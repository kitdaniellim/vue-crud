<template>
  <div>
    <div class="todo-app-list">
      <!-- App Searchbar Header -->
      <div class="app-fixed-search d-flex align-items-center">
        <!-- Toggler -->
        <div class="sidebar-toggle d-block d-lg-none ml-1">
          <feather-icon
            icon="MenuIcon"
            size="21"
            class="cursor-pointer"
            @click="mqShallShowLeftSidebar = true"
          />
        </div>

        <!-- Searchbar -->
        <div class="d-flex align-content-center justify-content-between w-100">
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon icon="SearchIcon" class="text-muted" />
            </b-input-group-prepend>
            <b-form-input
              :value="0"
              placeholder="Search task"
              @input="0"
            />
          </b-input-group>
        </div>

        <!-- Dropdown -->
        <!-- <div class="dropdown">
          <b-dropdown variant="link" no-caret toggle-class="p-0 mr-1" right>
            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item @click="resetSortAndNavigate">
              Reset Sort
            </b-dropdown-item>
            <b-dropdown-item
              :to="{
                name: $route.name,
                query: { ...$route.query, sort: 'title-asc' },
              }"
            >
              Sort A-Z
            </b-dropdown-item>
            <b-dropdown-item
              :to="{
                name: $route.name,
                query: { ...$route.query, sort: 'title-desc' },
              }"
            >
              Sort Z-A
            </b-dropdown-item>
          </b-dropdown>
        </div> -->
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
          <li
            v-for="todo in $store.state.todos"
            :key="todo.id"
            class="todo-item"
            :class="{ completed: todo.completed }"
            @click="$store.dispatch('updateTodo', { id: todo.id, title: todo.title, completed: !todo.completed })"
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
                    @change="$store.dispatch('updateTodo', { id: todo.id, title: todo.title, completed: !todo.completed })"
                  />
                  <span class="todo-title">{{ todo.title }}</span>
                </div>
              </div>
              <div class="todo-item-action">
                <b-avatar size="32" variant="light-secondary">
                  <feather-icon icon="UserIcon" size="16" />
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
// import store from "@/store";
import { watch, computed } from "@vue/composition-api";
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
import { useRouter } from "@core/utils/utils";
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

  beforeMount() {
    this.$store.dispatch("fetchTodos");
  },

  setup() {
    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()

    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }

    return {
      perfectScrollbarSettings,

      // Filters
      formatDate,
      avatarText,

      // Left Sidebar Responsive
      mqShallShowLeftSidebar,
    }
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
</style>

<style lang="scss">
  @import "~@core/scss/base/pages/app-todo.scss";
</style>

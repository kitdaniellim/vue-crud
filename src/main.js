import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import "bootstrap/dist/css/bootstrap.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash)

const app = createApp(App);

app.use(store);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app');

import "bootstrap/dist/js/bootstrap.js";


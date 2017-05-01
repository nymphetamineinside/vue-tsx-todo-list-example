/**
 * Created by trepachko on 26.4.17.
 */
import * as Vue from 'vue';
import App from './app';

var app = new Vue({
  render (h) {
    return h(App);
  }
});
app.$mount('#app');
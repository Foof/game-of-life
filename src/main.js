import Vue from 'vue'
import store from './store'
import GameOfLife from './components/gameoflife.vue'

new Vue({
    el: '#app',

    components: {
        GameOfLife
    },
})
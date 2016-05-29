<template>
    <a @click="toggle" :class="{ active: active }" href="#" title="{{ row }} - {{ col }}"></a>
</template>

<script>
    export default {
        props: {
            row: Number,
            col: Number,
            active: Boolean
        },

        methods: {
            toggle() {
                this.active = !this.active
            }
        }
    }
</script>
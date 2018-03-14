<template>
    <div name="alert">
        <div v-if="msg !== ''"
                class="alert" 
                role="alert"
                :class="{'alert-danger': err, 'alert-success': !err}">
            <button v-on:click="dismissAlert" 
                type="button" 
                class="close">
                <span aria-hidden="true">×</span>
            </button>
            <p><strong>{{msg}}</strong></p>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'

    export default Vue.component('alert', {
        props: ['msg', 'err'],
        data () {
            return {
                error: this.err,
                message: this.msg
            } 
        },
        methods: {
            dismissAlert: function () {
                this.message = '';
                this.error = false;
            }
        }
    });
</script>
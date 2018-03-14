<template id="input-name">
    <div>
        <input      :id="id"
                    :placeholder="placeholder"
                    :isValid="isValid"
                    class="form-control"
                    :class="{'danger-form': !isValid, 'success-form': isValid}"
                    v-bind:value="value"
                    v-on:input="updateValue($event.target.value)"
                    type="text"
                    requred>

    </div>
</template>

<script>
    import Vue from 'vue'
    import { required } from 'vuelidate/lib/validators'

    export default Vue.component('inputName', {
        template: '#input-name',
        props: [ 'value', 'id', 'placeholder', 'isValid' ],
        data: function () {
            return {}
        },
        validations: {
            name: {
                required
            }
        },
        methods: {
            updateValue: function ( value ) {
                this.$emit('input', value )
            }
        }
    })
</script>

<style scoped>
.danger-form {
   border: 1px solid #f06292;
   box-shadow: 0 0 0 0.2rem rgba(240, 98, 146, .4);
}
</style>
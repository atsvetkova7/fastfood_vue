<template id="field-description">
    <div>
        <textarea   :id="id" 
                    class="form-control"
                    ref="textarea"
                    rows = "5"
                    placeholder="Введите описание точки"
                    v-bind:value="value"
                    v-on:input="updateValue($event.target.value)"
                    requred>
        </textarea>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default Vue.component('fieldDescription', {
        template: '#field-description',
        props: [ 'value' , 'id'],
        data: function () {
            return {}
        },
        methods: {
            updateValue: function ( value ) {
                this.$emit( 'input', value )
            }
        }
    })
</script>
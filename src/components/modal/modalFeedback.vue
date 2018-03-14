<template id="modal-feedback">
        <b-modal id="modal1" ref="modal" hide-footer title="Добавить отзыв">
            <form>
                <label class="modal-label">Имя пользователя:</label>
                <input type="text" class="form-control" v-model="nameUser"/>

                <label class="modal-label">Отзыв:</label>
                <textarea class="form-control" v-model="feedbackUser"></textarea>

                <label class="modal-label">Рейтинг:</label>
                <select class="custom-select" v-model="retingUser">
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                </select>

                <button class="btn btn-primary modal__btn"  v-on:click.prevent="addFeedback">Сохранить</button>
            </form>
        </b-modal>
</template>

<script>
    import Vue from 'vue'
    import {dbRef} from './../../firebase/index'

    export default Vue.component('modalFeedback', {
        template: '#modal-feedback',
        props: ['parentPoint'],
        data: function () {
            return {
                nameUser: '',
                feedbackUser: '',
                retingUser: '1'
            }
        },
        methods: {
                addFeedback: function () {
                    dbRef.child(this.parentPoint + '/comment/').push({
                        feedbackUser: this.feedbackUser,
                        nameUser: this.nameUser,
                        retingUser: this.retingUser
                    });
                    this.$refs.modal.hide();

                    this.feedbackUser = '';
                    this.nameUser = '';
                    this.retingUser = 1;
                }
        }
    })
</script>

<style scoped>
.modal-label {
    display: block;
}
.modal__btn {
    width: 100%;
    margin-top: 15px;
}
</style>
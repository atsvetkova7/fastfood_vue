<template id="modal-edit-feedback">
        <b-modal id="modalEditFeedback" ref="modal" hide-footer title="Редактировать отзыв:">
            <form>
                <label class="modal-label">Имя пользователя:</label>
                <input  type="text" 
                        class="form-control" 
                        v-bind:value="nameFeedback"
                        v-on:input="updateValueName($event.target.value)"/>

                <label class="modal-label">Отзыв:</label>
                <textarea class="form-control" 
                        v-bind:value="commentFeedback"
                        v-on:input="updateValueComment($event.target.value)"></textarea>

                <label class="modal-label">Рейтинг:</label>
                <select class="custom-select" 
                        v-bind:value="retingFeedback"
                        v-on:input="updateValueReting($event.target.value)">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                </select>

                <button class="btn btn-primary modal__btn"  v-on:click.prevent="editFeedback">Редактировать</button>
            </form>
        </b-modal>
</template>

<script>
    import Vue from 'vue'
    import {dbRef} from './../../firebase/index'

    export default Vue.component('modalEditFeedback', {
        template: '#modal-edit-feedback',
        props: ['parentPoint', 'nameFeedback', 'commentFeedback', 'retingFeedback'],
        data () {
            return {
                nameUser: this.nameFeedback,
                feedbackUser: this.commentFeedback,
                retingUser: this.retingFeedback
            }
        },        
        methods: {
            editFeedback ( ) {
                if ( this.nameUser === '') {
                    this.nameUser = this.nameFeedback
                }
                if ( this.feedbackUser === '' ) {
                    this.feedbackUser = this.commentFeedback
                }
                if ( this.retingUser === '' ) {
                    this.retingUser = this.retingFeedback
                }
                dbRef.child(this.$route.params.id + '/comment/' + this.parentPoint).update({
                    nameUser: this.nameUser,
                    feedbackUser: this.feedbackUser,
                    retingUser: this.retingUser
                });
                this.$refs.modal.hide();
                
            },
            updateValueName: function ( value ) {
                    this.nameUser = value; 
            },
            updateValueComment: function ( value ) {
                    this.feedbackUser = value;
            },
            updateValueReting: function ( value ) {
                    this.retingUser = value;
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
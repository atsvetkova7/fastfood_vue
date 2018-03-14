<template id="list-feedback">
    <div>
        <p>Общий рейтинг: {{averageReting}} </p>
        <ul v-for="point in points" class="feedback__list">
            <li class="feedback__items">
                <div class="row">
                    <div class="col-9">
                        <p>
                            <i class="far fa-comment"></i>
                                <span class="feedback__text_bold">
                                    Имя:
                                </span> 
                                    {{point.nameUser}}
                        </p>
                        <p class="feedback__items_reting">Рейтинг: {{point.retingUser}}</p>
                        <p><span>Отзыв:</span> {{point.feedbackUser}}</p>
                        
                    </div>
                    <div class="col-3">
                        <button v-on:click="removeFeedback( point )" class="btn btn-secondary">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                        <button     v-on:click="showModal( point )" 
                                    class="btn btn-secondary" 
                                    v-b-modal.modalEditFeedback> 
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </div>
            </li>
        </ul>
<modalEditFeedback  id="modalEditFeedback" 
                    :parentPoint=pointFeedback
                    :nameFeedback=nameUser
                    :commentFeedback=feedbackUser
                    :retingFeedback=retingUser>
</modalEditFeedback>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {dbRef} from './../../firebase/index'
    import modalEditFeedback from './../modal/modalEditFeedback'

    export default Vue.component('listFeedback', {
        template: '#list-feedback',
        data: function () {
            return {
                pointFeedback: '',
                nameUser: '',
                feedbackUser: '',
                retingUser: ''
            }
        },
        created() {
            var dbRefFeedback = dbRef.child( this.$route.params.id + '/comment/')
            this.$bindAsArray('points', dbRefFeedback);
        },
        computed: {
            averageReting: function(){
                var sum = 0;
                var num = 0;
                for (var i=0; i < this.points.length; i++) {
                    num = +this.points[i].retingUser;
                    sum += num;
                }
                if ( this.points.length === 0) {
                    return 0;
                } else {
return (sum / this.points.length).toFixed(1);
                }
                
            }
        },
        methods: {
            removeFeedback ( point ) {
                let options = {
                    reverse: true,
                    okText: 'Да',
                    cancelText: 'Нет'
                    };
                this.$dialog.confirm('Хотите удалить отзыв?', options)
                    .then( () => {
                        dbRef.child( this.$route.params.id + '/comment/' + point['.key'] ).remove();
                    })
                    .catch( () => {
                    console.log('Clicked on cancel')
                });
                
            },
            showModal ( point ) {
                this.pointFeedback = point['.key'];
                this.nameUser = point['nameUser'];
                this.feedbackUser = point['feedbackUser'];
                this.retingUser = point['retingUser'];
            }
        }
    })
</script>

<style scoped>
.danger-form {
   border: 1px solid #f06292;
   box-shadow: 0 0 0 0.2rem rgba(240, 98, 146, .4);
}
.feedback__items {
    list-style: none;
}
.feedback__items_reting {
    font-size: 13px;
    color: #aaa;
    padding-left: 15px;
    margin-bottom: 10px;
}
.feedback__text_bold {
    font-weight: 700;
}
.feedback__list {
    border-bottom: 1px solid #ccc;
}
</style>
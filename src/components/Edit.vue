<template>
    <div class="edit">
    <headerApp></headerApp>
        <div class="container">
            <h2 class="title__second">Редактировать:</h2>
                <div class="row">
                    <div class="col">
                        <form class="form-add">
                            <div class="form-group">
                                <label for="namePoint" class="form-add__fild">Название:</label>
                                <inputName v-model="name" 
                                            id="namePoint" 
                                            placeholder="Введите название точки" 
                                            :isValid="isValid"
                                            ref="test"/>
                            </div>
                    
                            <div class="form-group">
                                <label for="adressPoint" class="form-add__fild">Адрес:</label>
                                <googleMap  @init="onLocation" v-model="adress" :latitude=lat :longitude=lng />
                            </div>
                    
                            <div class="form-group">
                                <fieldPhoto @onFilePicked="onPhoto" :upload="progressUpload"/>
                            </div>
                    
                            <div class="form-group" >
                                <label for="descriptionPoint" class="form-add__fild">Описание:</label>
                                <fieldDescription v-model="description" id="descriptionPoint" />
                            </div>
                    
                            <div class="form-add__btn">
                                <button class="btn btn-outline-primary btn-size__middle" v-on:click.prevent="editPoint">Редактировать</button>
                                <button class="btn btn-outline-primary btn-size__middle" v-on:click.prevent="backToMain">Назад</button>
                            </div>
                        </form>
                    </div>
                    <div class="col">
                        <listFeedback></listFeedback>
                    </div>
                </div>
        </div>

        <notifications  group="notofication-edit"  
                        position="bottom right">
        </notifications>


        
    </div>
</template>

<script>


import {dbRef} from '../firebase/index'
import inputName from './form/inputName'
import listFeedback from './feedback/listFeedback'


    export default {
        name: 'edit',
        data: function(){
            return {
                name: this.name,
                adress: this.adress,
                description: this.description,
                downloadURL: this.photo,
                isValid: true,
                progressUpload: 0,
                lat: this.lat,
                lng: this.lng
            }
        },
        created() {
            dbRef.child(this.$route.params.id).once('value', (snap) => {
                this.name = snap.val().name;
                this.adress = snap.val().adress;
                this.description = snap.val().description;
                this.downloadURL = snap.val().photo;
                this.lat = snap.val().geolocation.lat;
                this.lng = snap.val().geolocation.lng;
            })
            
        },
        methods: {
            editPoint () {
                dbRef.child(this.$route.params.id).update({
                    name : this.name,
                    adress : this.adress,
                    description: this.description,
                    photo: this.downloadURL,
                    geolocation: {
                        lat: this.lat,
                        lng: this.lng
                    }
                })

                this.$notify({
                    group: 'notofication-edit',
                    type: 'success',
                    width: '700',
                    title: 'Все вышло!',
                    text: `Элемента ${this.name} был обновлен :)`
                });
            },
            removeFeedback ( point ) {
                dbRef.child( this.$route.params.id + '/comment/' + point['.key'] ).remove();
            },
            onPhoto (data) {
                this.downloadURL = data.downloadURL;
                this.progressUpload = data.progressUpload;
            },
            backToMain () {
                this.$router.replace('/hello');
            },
            onLocation ( data ) {
                this.lat = data.lat;
                this.lng = data.lng;
                this.adress = data.adress;
            }
        }
    }
</script>

<style>

.btn-size__middle {
    margin-top: 25px;
    width: 49%;
}
.title__second {
    width: 500px;
    margin: 20px auto;
    text-align: center;
    border-bottom: 1px solid #ccc;

    padding-top: 20px;
    padding-bottom: 20px;
    font-family: Roboto;
}
.form-add {
    width: 500px;
    margin: 0 auto;
}
.vue-notification {
    height: 150px;
    font-size: 18px;
}
</style>
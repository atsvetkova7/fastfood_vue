<template>
    <div class="add">
        <headerApp></headerApp>
        <div class="container">
            <h2 class="title__second">Добавить точку:</h2>
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
                    <googleMap  @init="onLocation" v-model="adress" />
                </div>

                <div class="form-group">
                    <fieldPhoto @onFilePicked="onPhoto" :upload="progressUpload"/>
                </div>

                <div class="form-group" >
                    <label for="descriptionPoint" class="form-add__fild">Описание:</label>
                    <fieldDescription v-model="description" id="descriptionPoint" />
                </div>

                <div class="form-add__btn">
                    <button class="btn btn-outline-primary btn-size" v-on:click.prevent="addPoint">Добавить</button>
                    <button class="btn btn-outline-primary btn-size" v-on:click.prevent="backToMain">Назад</button>
                </div>
            </form>
        </div>
        
        <notifications  group="foo"  
                        position="bottom right">
        </notifications>
    </div>
</template>

<script>
import googleMap from './googleMap/googleMap'
import inputName from './form/inputName'
import fieldDescription from './form/fieldDescription'
import fieldPhoto from './form/fieldPhoto'
import {dbRef} from '../firebase/index'

    export default {
        name: 'add',
        data () {
            return {
                name: '',
                adress: '',
                description: '',
                downloadURL: '',
                isValid: true,
                progressUpload: 0,
                lat: '',
                lng: ''
            }
        },
        components: {
            inputName,
            fieldDescription,
            fieldPhoto,
            googleMap
        },
        mounted() {
            
        },

        methods: {
            addPoint () {
                if ( this.name === '' ) {
                    this.isValid = false;
                    this.$refs.test.$el.getElementsByTagName('input')[0].focus();
                    return;
                }
                dbRef.push({
                    name: this.name,
                    adress: this.adress,
                    description: this.description,
                    photo: this.downloadURL,
                    geolocation: {
                        lat: this.lat,
                        lng: this.lng
                    }
                });

                this.$notify({
                    group: 'foo',
                    type: 'success',
                    width: '500',
                    title: 'Все вышло!',
                    text: `Элемента ${this.name} был добавлен :)`
                });

                this.name = '';
                this.adress = '';
                this.description = '';
                this.progressUpload = 0;
                this.downloadURL = '';

            },
            onPhoto (data) {
                this.downloadURL = data.downloadURL;
                this.progressUpload = data.progressUpload; 
            },
            backToMain () {
                this.$router.replace('hello');
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
.btn-size {
    margin-top: 25px;
    width: 49%;
}
.form-add__btn {
    display: flex;
    justify-content: space-between;
}
.form-add__fild {
    font-size: 18px;
}
.vue-notification {
    height: 150px;
    font-size: 18px;
}

</style>
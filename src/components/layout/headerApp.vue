<template>
    <div name="headerApp">
        <header class="header">
            <a class="logo">Fastfood</a>
            <button class="btnLogout" v-on:click="logout">Выход</button>
        </header>
    </div>
</template>

<script>
import Vue from 'vue'
import {dbAuth} from './../../firebase/index'

    export default Vue.component('headerApp', {

        data () {
            return {} 
        },
        methods: {
            logout: function() {
                dbAuth.signOut().then(() => {
                    this.$router.replace('/login')
                })
            }
        }
    });
</script>

<style scoped>
.header {
    border-bottom: 1px solid #E6EAEA;
    width: 100%;
    height: 80px;
    line-height: 40px;
    font-weight: 400;
    background-color: #f4f7f6;
    z-index: 1;
    align-items: center;
    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;
}
.logo {
    display: block;

    color: #202121;
    font-family: 'Nanum Brush Script', cursive;
    font-size: 32px;
    padding-bottom: 10px;  
    padding-left: 20px; 
}
.btnLogout {
    width: 190px;
    height: 80px;
    background-color: rgb(30, 135, 240);
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    color: #fff;
    display: block;
    font-size: 18px;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
}
</style>
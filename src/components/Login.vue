<template>
    <div class="login">
        <div class="container mt-3 mt-sm-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <b-form>
                        <b-form-group id="emailGroup"
                                    label="Email address:"
                                        label-for="txtEmail">
                            <b-form-input id="txtEmail"
                                        type="text"
                                        v-model="email"
                                        required
                                        placeholder="Email">
                            </b-form-input>
                        </b-form-group>
                        
                        <b-form-group id="passwordGroup"
                                    label="Password"
                                    label-for="txtPassword">
                            <b-form-input id="txtPassword"
                                        type="password"
                                        v-model="password"
                                        required
                                        placeholder="Email">
                            </b-form-input>

                        </b-form-group>
                        <alert :msg="message" :err="hasErrors"></alert>
                        <b-button v-on:click="signIn" variant="primary">Войти</b-button>
                    </b-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {dbAuth} from './../firebase/index'
import alert from './modal/alert'

    export default {
        name: 'login',
        data: function(){
            return {
                email: '',
                password: '',
                hasErrors : false,
                message: ''
            }
        },
        methods: {
            signIn: function() {
                var vm = this;
                vm.message = '';
                vm.hasErrors = false;

                if (vm.email === '' || vm.password === '') {
                   // alert('Please provide the email and password');
                    vm.message = 'Email и Password должны быть заполнены';
                    vm.hasErrors = true;
                    return;
                }
                dbAuth.signInWithEmailAndPassword( this.email, this.password).then( (firebaseUser) => {
                // Success 
                this.$router.replace('hello')
                }).catch( (error) => {
                // Error
                let errorCode = error.code;
                if (errorCode === 'auth/wrong-password') {
                    vm.message = 'Проверте пароль на корректность ввода.';
                    vm.hasErrors = true;
                } else {
                    vm.message = 'Такой пользователь не существует. Проверте правильность ввода логина.';
                    vm.hasErrors = true;
                }
            })

            },
        }
    }
</script>

<style scoped>

</style>
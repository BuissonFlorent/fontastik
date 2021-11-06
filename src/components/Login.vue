<template>
<div class="ion-page">
    <ion-header>
        <ion-toolbar color="primary">
        <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Login</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content>
        <form novalidate>
        <ion-list>
            <ion-item>
            <ion-label position="stacked" color="primary">Nom ou email</ion-label>
            <ion-input
                v-model="username"
                name="username"
                type="text"
                spellcheck="false"
                autocapitalize="off"
                required
            ></ion-input>
            </ion-item>

            <ion-text color="danger">
            <p v-show="!usernameValid || submitted == true" padding-left>Username is required</p>
            </ion-text>

            <ion-item>
            <ion-label position="stacked" color="primary">Mot de passe</ion-label>
            <ion-input v-model="password" name="password" type="password" required></ion-input>
            </ion-item>

            <ion-text color="danger">
            <p v-show="!passwordValid || submitted == true" padding-left>Password is required</p>
            </ion-text>
        </ion-list>

        <ion-row responsive-sm>
            <ion-col>
            <ion-button @click="onLogin(loginForm)" type="submit" expand="block">Connection</ion-button>
            </ion-col>
            <ion-col>
            <ion-button @click="onSignup()" color="light" expand="block">Inscription</ion-button>
            </ion-col>
        </ion-row>
        </form>
    </ion-content>
</div>
</template>

<style scoped>
.list {
  margin-bottom: 0;
}
</style>

<script lang="ts">
import { ref } from 'vue';

export default { 
    name: 'LoginComponent',   
    setup() {

        // Handling user information
        const username = ref("");
        const password = ref("");
        const submitted = ref(false);
        const usernameValid = () => {
            return true;
        }
        const passwordValid = () => {
            return true;
        }
        const onLogin = (ev: any) => {
            ev.preventDefault();
        }

        return { username, password, submitted, usernameValid, passwordValid, onLogin }
    }
}
</script>
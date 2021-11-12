<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Profil utilisateur</ion-title>
            </ion-toolbar>
        </ion-header>
    
        <user-profile v-if="userRegistered" />
        <user-sign-up-in v-else />
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import UserProfile from '@/components/UserProfile.vue';
import UserSignUpIn from '@/components/UserSignUpIn.vue';

export default  {
    name: 'ProfileTab',
    setup() {
        const userRegistered = (localStorage.userInfo ? true : false);
        return { userRegistered }
    },
    components: { IonHeader, IonToolbar, IonTitle, IonPage, UserProfile, UserSignUpIn }
}
</script>

<style scoped>
.h1 {
  text-align: center;
}
</style>
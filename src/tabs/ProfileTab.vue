<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Profil utilisateur</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <user-login v-if="!userRegistered" />
            <user-profile v-if="userRegistered" />
            <user-registration v-else />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import UserRegistration from '@/components/UserRegistration.vue';

export default  {
    name: 'ProfileTab',
    setup() {
        const userRegistered = (localStorage.userInfo ? true : false);
        return { userRegistered }
    },
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, UserRegistration }
}
</script>

<style scoped>
.h1 {
  text-align: center;
}
</style>
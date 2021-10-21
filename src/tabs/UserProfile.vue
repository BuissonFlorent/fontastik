<template>
    <ion-page>
        <ion-header>
        <ion-toolbar>
            <ion-title>Profil utilisateur</ion-title>
        </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                <ion-title size="large">Profil utilisateur</ion-title>
                </ion-toolbar>
            </ion-header>
            <profile v-if="userRegistered" />
            <registration v-else />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import Registration from '@/components/Registration.vue';
import Profile from '@/components/Profile.vue';

export default  {
    name: 'UserProfile',
    setup() {
        const userRegistered = (localStorage.userInfo ? true : false);
        return { userRegistered }
    },
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, Registration, Profile }
}
</script>

<style scoped>
.h1 {
  text-align: center;
}
</style>
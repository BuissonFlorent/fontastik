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
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default  {
    name: 'ProfileTab',
    setup() {

        const store = useStore();
        const userRegistered =  ref(store.state.userRegistered);

        onMounted(() => {
            console.log(`When ProfileTab is mounted, userName in store state is ${store.state.user.userName} and userRegistered is ${userRegistered.value}`)
        }); 

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
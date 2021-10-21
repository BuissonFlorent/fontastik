<template>
    <ion-page>
        <ion-header>
        <ion-toolbar>
            <ion-title>Ecran principal</ion-title>
        </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                <ion-title size="large">Home Screen (content)</ion-title>
                </ion-toolbar>
                <h1> Bienvenue sur Fontastik! </h1>
            </ion-header>
        <login />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import Login from '@/components/Login.vue';
import { onMounted } from 'vue';
import { useStore } from 'vuex';



export default  {
    name: 'Home Screen',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, Login },
    setup() {

     // INITIALIZING SESSION
        const store = useStore();
        const userRegistered = (localStorage.userInfo ? true : false);


        // GETTING CARDS TO REVIEW
        const getCards = () => {
            // Attempting to get cards from local storage first
            if(localStorage.cards) {
                store.commit('getLocalCards');
                store.commit('initializeDeck');
            // Attempting to get cards from DB otherwise
            } else {
                store.dispatch('getCardsFromDB').then(() => {
                    store.dispatch('setLocalCards');
                    store.dispatch('initializeDeck');
                });
            } 
        }

        // RUNNING ALL SETUP AT MOUNTING
        const initSession = () => {
            //console.log("mounting Home Screen...");
            if(userRegistered) {
                //console.log("user registered: ", userRegistered);
                store.commit('getUser');
                getCards();
            }
        }
        onMounted(initSession)

        return { }
    }
}
</script>
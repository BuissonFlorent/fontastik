<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Page d'accueil</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            Bienvenue sur Fontastik! Cette application va vous aider à apprendre la langue Fongbé.
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

export default  {
    name: 'HomeTab',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
    setup() {

        const store = useStore();

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
        onMounted(() => {
            //console.log("mounting Home Screen...");
            if(localStorage.user) {
                store.commit('getLocalUser');
            }
            //console.log(`When HomeTab is mounted, userName in store state is ${store.state.user.userName} and userRegistered is ${store.state.userRegistered}`);
            getCards();
        })
    }
}
</script>
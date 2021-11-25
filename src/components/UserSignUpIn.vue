<template lang="html">
    <ion-content :fullscreen="true">
        <p>C'est la première fois que vous utilisez l'application sur cet appareil. Si vous avez déjà créé un compte ou si voulez en créer un nouveau, vous pouvez le faire ci-dessous.</p>
        <ion-card>
            <ion-card-content id="firebaseui-auth-container" />
        </ion-card>
        <p>Si vous le préférez, vous pouvez aussi utiliser l'application de manière anonyme en cliquant le bouton suivant. Dans ce cas vous ne recevrez pas d'emails d'information et vous ne pourrez pas utiliser l'application sur un autre appareil, mais rien d'autre ne change.</p>
        <ion-button fill="solid" @click="anonymousUser()">Utilisateur anonyme</ion-button>
    </ion-content>    
</template>

<script lang='ts'>
import { onMounted } from 'vue';
import { EmailAuthProvider } from "firebase/auth";
import { firebaseAuth } from '@/firebaseConfig';
import { auth } from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { User } from "@/interfaces";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { IonContent, IonCard, IonCardContent, IonButton } from '@ionic/vue';

export default {
    name: 'UserSignUpIn',
    setup() {

        const store = useStore();
        const router = useRouter();

        //Initializing the FirebaseUI Widget using Firebase.
        const initComponent = () => {
            const ui = new auth.AuthUI(firebaseAuth);
            const uiConfig = {
                signInSuccessUrl: '/tabs/reviewTab',
                signInOptions: [EmailAuthProvider.PROVIDER_ID]
            };
            ui.start('#firebaseui-auth-container', uiConfig);
        }
        onMounted(initComponent);

        // Setup for anonymous users
        const anonymousUser = () => {
            const newID = Date.now().toString(36).substr(12) + Math.random().toString(36).substr(12);
            const anonymousUser: User = {
                userID: newID,
                userName: "anonymousName",
                userPassword: "anonymousPassword",
                userEmail: "anonymousEmail"
            };
            store.commit('setStoreUser', anonymousUser);
            store.commit('setLocalUser', anonymousUser);
            store.dispatch('sendUserToDB', anonymousUser);
            router.push('/tabs/review-tab')
        }
        return { anonymousUser}
    },
    components: { IonContent, IonCard, IonCardContent, IonButton }
}
</script>
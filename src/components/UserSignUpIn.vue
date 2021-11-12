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

import { IonContent, IonCard, IonCardContent, IonButton } from '@ionic/vue';

export default {
    name: 'UserSignUpIn',
    setup() {

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
            //NEED MORE WORK HERE
            return true
        }
        return { anonymousUser}
    },
    components: { IonContent, IonCard, IonCardContent, IonButton }
}
</script>
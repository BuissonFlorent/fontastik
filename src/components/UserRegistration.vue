<template>
    <p>C'est la première fois que vous utilisez l'application. Nous allons créer un compte pour vous!</p>

    <ion-list>
        <ion-item>
            <ion-label>Nom ou pseudo</ion-label>
            <ion-input
                placeholder="Etudiant"
                v-model="userName"
                clearOnEdit="true"
            ></ion-input>
        </ion-item>
        <ion-item>
            <ion-label>Email (optional)</ion-label>
            <ion-input
                placeholder="Email"
                v-model="userEmail"
            ></ion-input>
        </ion-item>
    </ion-list>
    <ion-button @click="submitUserInfo()">Créer votre compte</ion-button>
</template> 

<script lang="ts">
import { IonList, IonInput, IonItem, IonLabel, IonButton } from '@ionic/vue';
import { ref } from 'vue';
import { usersCollection } from '@/firebaseConfig';
import { addDoc } from "firebase/firestore";
import router from '@/router'

export default { 
    name: 'UserRegistration',   
    setup() {

        // Handling user information
        const userName = ref("");
        const userEmail = ref("");
   
        const submitUserInfo = async () => {
            console.log('submitting user info')
            const user = {
                userID: "",
                name: (userName.value ? userName.value : "Etudiant"),
                email: ""
            }
            if (userEmail.value) { user.email = userEmail.value }

            //Using "add" instead of "setDoc" so that Firestore auto-generates the ID
            await addDoc(usersCollection, user).then((docRef) => {
                user.userID = docRef.id;
                console.log("user registered in database with ID: ", docRef.id);
            })
            .catch(() => {
                console.error("Error adding user to database.");
            })
            console.log("user info is: ", JSON.stringify(user));
            localStorage.setItem('userInfo', JSON.stringify(user));
            router.push('/user-screen')
        }

        return { userName, userEmail, submitUserInfo }
    },
    components: { IonList, IonInput, IonItem, IonLabel, IonButton }
}
</script>


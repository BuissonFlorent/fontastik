<template>
    <ion-content :fullscreen="true">
        <p> Bonjour {{ userName }} </p>
        <admin-panel v-if="userName==='admin' && userID==='GFgowlbMas4zVbC7Zr4V'" />
    </ion-content>
</template> 

<script lang="ts">
import { IonContent } from '@ionic/vue';
import AdminPanel from '@/components/AdminPanel.vue';

export default { 
    name: 'UserProfile',   
    setup() {

        const userInfo = JSON.parse(localStorage.getItem('user') || "{}") ; //Need the default value for TS typing
        
        const userName = (userInfo.userName != "anonymousName" ? userInfo.userName : 'cher étudiant/chère étudiante !');
        const userID =  (userInfo ? userInfo.userID : '');
        return { userName, userID }
    },
    components: { IonContent, AdminPanel }
}
</script>


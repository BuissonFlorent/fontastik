<template>
    <p> Bonjour {{ userName }} </p>

    <admin-panel v-if="userName==='admin' && userID==='GFgowlbMas4zVbC7Zr4V'" />
</template> 

<script lang="ts">
import AdminPanel from '@/components/AdminPanel.vue';

export default { 
    name: 'Profile',   
    setup() {

        const userInfo = JSON.parse(localStorage.getItem('userInfo') || "{}") ; //Need the default value for TS typing
        
        const userName = (userInfo ? userInfo.name : 'Etudiant');
        const userID =  (userInfo ? userInfo.userID : '');
        return { userName, userID }
    },
    components: { AdminPanel }
}
</script>


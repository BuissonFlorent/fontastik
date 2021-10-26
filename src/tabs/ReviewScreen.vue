<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Apprentissage</ion-title>
            </ion-toolbar>
        </ion-header>
        <FlashCard/>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import FlashCard from '@/components/FlashCard.vue';

export default {
    name: 'ReviewScreen',
    components: { FlashCard, IonHeader, IonToolbar, IonTitle, IonPage }
}
</script>
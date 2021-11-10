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
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ReviewTab',
    components: { FlashCard, IonHeader, IonToolbar, IonTitle, IonPage }
});
</script>
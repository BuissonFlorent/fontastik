<template>
    <div id="flashcard">
        <ion-card v-if="showCard">
            <ion-item id="source">
                <ion-label>{{ fonWriting }}</ion-label>
                <ion-button
                    @click="showTranslation = !showTranslation"
                    v-if="!showTranslation && showCard"
                    fill="outline" 
                    slot="end"
                >Montrer la traduction</ion-button>
            </ion-item>
            <ion-item v-if="showTranslation && showCard">
                <ion-label>{{ frenchWriting }}</ion-label>
                <ion-button fill="outline" slot="end" @click="reviewOutcome(false)">Je ne le savais pas</ion-button>
                <ion-button fill="outline" slot="end" @click="reviewOutcome(true)">Je le savais</ion-button>
            </ion-item>
        </ion-card>
        <ion-item v-if="!showCard">
            <h2>C'est fini pour aujourd'hui !</h2>
        </ion-item>
    </div>
</template>

<script lang="ts">
import { IonCard, IonItem, IonLabel, IonButton } from '@ionic/vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { Review } from "@/interfaces";
import { defineComponent } from 'vue';

export default defineComponent({
    name: "FlashCard",
    setup() {

     // INITIALIZING SESSION
        const store = useStore();
        const userID = store.state.user.userID;

        let currentCard = store.state.deck[0];
        // The following variables are made reactive with ref so that the template updates immediately when they change
        const showCard = ref(true);
        const showTranslation = ref(false);
        const fonWriting = ref(store.state.deck[0].fonWriting);
        const frenchWriting = ref(store.state.deck[0].frenchWriting);

     // TRANSITIONS AFTER REVIEWING A CARD
        const reviewOutcome = (known: boolean) => {
            // Logging the review for the card
            const newReview: Review = {
                cardID: currentCard.cardID,
                userID: userID,
                time: new Date,
                known: known
            }
            console.log("Review outcome is: ", known);
            store.commit('logReview', newReview);

            // Processing the reviewed card
            store.commit('setCardNextReview', known);
            store.commit('updateLocalCards');

            // Getting to the next card
            if(store.state.deck.length) {
                store.commit('sortDeck');
                showTranslation.value = false;
                fonWriting.value = store.state.deck[0].fonWriting;
                frenchWriting.value = store.state.deck[0].frenchWriting;
                currentCard = store.state.deck[0];
            } else {
                //Wrapping up when the deck is empty
                showCard.value = false;
                store.commit('sendReviewsToDB');
            }
        }

        return {
            currentCard, fonWriting, frenchWriting, showCard, showTranslation, reviewOutcome
        }; 
    },
    components: { IonCard, IonItem, IonLabel, IonButton }
});
</script>

<style scoped>
#flashcard {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}
.h2 {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}
</style>
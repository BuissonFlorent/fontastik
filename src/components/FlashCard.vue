<template>
    <div id="flashcard">
        <ion-card>
            <ion-item id="source">
                <ion-label>{{ fonWriting }}</ion-label>
                <ion-button
                    @click="showTranslation = !showTranslation"
                    v-if="!showTranslation && showCard"
                    fill="outline" 
                    slot="end"
                >Show translation</ion-button>
            </ion-item>
            <ion-item v-if="showTranslation && showCard">
                <ion-label>{{ frenchWriting }}</ion-label>
                <ion-button fill="outline" slot="end" @click="reviewOutcome(false)">I didn't know it</ion-button>
                <ion-button fill="outline" slot="end" @click="reviewOutcome(true)">I knew it</ion-button>
            </ion-item>
            <ion-item v-if="!showCard">
                <p>C'est fini pour aujourd'hui !</p>
            </ion-item>
        </ion-card>
    </div>
</template>

<script lang="ts">
import { IonCard, IonItem, IonLabel } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Review } from "@/interfaces";

export default {
    name: "FlashCard",
    setup() {

    // INITIALIZING SESSION
        const store = useStore();
        const userID = store.state.user;

        let currentCard = store.state.deck[0];
        // The following variables are made reactive with ref so that the template updates immediately when they change
        const showCard = ref(true);
        const showTranslation = ref(false);
        const fonWriting = ref(store.state.deck[0].fonWriting);
        const frenchWriting = ref(store.state.deck[0].frenchWriting);

        // Transition function
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
            store.commit('setCardNextReview', currentCard);
            store.commit('updateLocalCards');

            // Getting to the next card
            if(store.state.deck.length) {
                store.commit('sortDeck');
                showTranslation.value = false;
                fonWriting.value = store.state.deck[0].fonWriting;
                frenchWriting.value = store.state.deck[0].frenchWriting;
                currentCard = store.state.deck[0];
            } else {
                showCard.value = false;
            }
        }

        onMounted(()=> {
            console.log("Finished mounting FlashCard");
            console.log("Loaded currentCard is: ", currentCard.fonWriting);
        })

        return {
            currentCard, fonWriting, frenchWriting, showCard, showTranslation, reviewOutcome
        }; 
    },
    components: { IonCard, IonItem, IonLabel }
}
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
</style>
import { createStore } from 'vuex';
import { cardsCollection } from '@/firebaseConfig';
import { getDocs } from "firebase/firestore";
import { Card, Review, User, State } from "@/interfaces";

export const store = createStore({
    state() {
        return {
            cards: Array<Card>(),
            deck: Array<Card>(),
            reviews: Array<Review>(),
            user: {
                userID: "",
                name: ""
            } as User
        }
    },
    getters : {
        getAllCards(state: State): Card[] {
            return state.cards
        }
    },
    mutations : {
        setStoreCards(state: State, importedCards: Array<Card>) {
            state.cards = importedCards;
        },
        getLocalCards(state: State) {
            try {
                console.log("initiating getLocalCards");
                const localCards: Array<Card> = JSON.parse(localStorage.getItem('cards') || "{}") ; //Need the default value for TS typing
                state.cards = localCards;
                state.cards.map((c) => { c.nextReview = new Date(c.nextReview)})
                console.log(`successfully loaded ${store.state. cards.length} cards from the local storage`);
                console.log(`the first card is ${store.state.cards[0]}`)
            } catch(e) {
                console.log("an error occurred while trying to load cards from the local storage");
                console.log(e);
            }
        },
        getUser(state: State) {
            try {
                console.log("initiating getUser");
                const localUser: User = JSON.parse(localStorage.getItem('userInfo') || "{}")
                state.user = localUser;
            } catch(e) {
                console.log("an error occurred while trying to load user information from the local storage");
                console.log(e);
            }
        },

        setLocalCards(state: State) {
            try {
                localStorage.setItem('cards', JSON.stringify(state.cards));
                console.log("successfully added cards to the local storage");
            } catch(e) {
                console.log("an error occurred while trying to add cards to the local storage");
                console.log(e);
            }
        },
        updateLocalCards(state: State) {
            try {
                localStorage.setItem('cards', JSON.stringify(state.cards));
                console.log(`cards in local storage successfully updated after a review`);
            } catch(e) {
                console.log("an error occurred while trying to update cards in local storage after a review");
                console.log(e);
            }
        },
        initializeDeck(state: State) {
            console.log("initiating initializeDeck");
            const maxDailyNew = 5;
            const maxDailyTotal = 10;
            console.log("Number of cards in store state: ", state.cards.length)

        //Determining which cards to review, and in what order, based on past review outcomes
            console.log(`nextReview for the first card is ${ state.cards[0].nextReview}`)
            console.log(`the type of the first card's nextReview is ${typeof(state.cards[0].nextReview)}`);
            const cardsDue = state.cards.filter((card: Card) => card.nextReview.getFullYear() > 2020 && card.nextReview <= new Date)
            const cardsUnseen = state.cards.filter((card: Card) =>  card.nextReview.getFullYear() <= 2020 )
            console.log("There are ", cardsDue.length, " cards due and ", cardsUnseen.length, " cards unseen.")

            // Adding older due cards first
            if (cardsDue) {
                const d = Math.min(maxDailyTotal, cardsDue.length);
                state.deck = cardsDue.slice(0, d)
            }

            // Adding new unseen cards if there's space left
            const n = Math.min(maxDailyNew, maxDailyTotal - state.deck.length, cardsUnseen.length)
            const newCards = cardsUnseen.slice(0,n)
            state.deck = newCards.concat(state.deck)
            
            //Checking the number of cards in the deck
            console.log("The number of cards in the deck after initialization is ", state.deck.length)       
        },
        sortDeck(state: State) {
            const now = new Date;
            const oneHour = 60 * 60; // number of seconds per hour
            // Filtering out cards that are scheduled for review in more than one hour
            state.deck.filter((c: Card) => { (c.nextReview.getTime() - now.getTime()) / 1000 <= oneHour })
            // The inside ternary operators in the following line are required to reassure TS that the cards do have a nextReview attribute
            state.deck.sort((a: Card, b: Card) => ((a.nextReview? a.nextReview: new Date) < (b.nextReview? b.nextReview: new Date)) ? -1 : 1)
            state.deck.forEach((c: Card) => {
                console.log("card in deck is: ", c.fonWriting) 
            });
        },
        logReview(state: State, review: Review) {
            state.reviews.push(review)
            const loggedReview = state.reviews[state.reviews.length - 1];
            try {
                localStorage.setItem('reviews', JSON.stringify(state.reviews));
                console.log("successfully added reviews to the local storage");
            } catch(e) {
                console.log("an error occurred while trying to add reviews to the local storage");
                console.log(e);
            }
            console.log("logged review is ", loggedReview.cardID, "with known =", loggedReview.known, " at ", loggedReview.time);  
        },
        setCardNextReview(state: State, known: boolean) {
            const currentCard = state.deck[0];
            console.log(`card ${currentCard.fonWriting} at the beginning of setCardNextReview has nextReview equal to ${currentCard.nextReview}`);
            const currentCardReviews = store.state.reviews.filter((r: Review) => (r.cardID == currentCard.cardID));
            const setReview = new Date;
            const oneDay = 24 * 60 * 60; // number of seconds per day
            const oneHour = 60 * 60; //number of seconds per hour
            // Card unknown, regardless of previous status
            if (!known) { 
                // Set the card to be reviewed in 10 seconds
                setReview.setSeconds(setReview.getSeconds() + 10);
            // card previously unseen but known
            } else if (known && currentCardReviews.length == 1) {
                setReview.setDate(setReview.getDate() + 30);
            // card previously reviewed and known
            } else if (known && currentCardReviews.length > 1) {
                //Calculate last review interval in seconds
                currentCardReviews.sort((a: Review, b: Review) => (a.time > b.time) ? -1 : 1)
                const lastDuration = (currentCardReviews[0].time.getTime() - currentCardReviews[1].time.getTime()) / 1000; 
                console.log("the time difference in seconds between the last two reviews was ", lastDuration);
                if(lastDuration < 60) {
                    setReview.setSeconds(setReview.getSeconds() + 60);
                } else {
                    const nextDuration = Math.max(lastDuration * 2, oneDay);
                    setReview.setSeconds(setReview.getSeconds() + nextDuration);
                }
            }
            //updating card in deck
            currentCard.nextReview = setReview;
            //updating card in store state
            const idx = state.cards.findIndex((c: Card) => c.cardID == currentCard.cardID);
            state.cards[idx].nextReview = setReview;
            console.log(`card ${currentCard.fonWriting} now has nextReview equal to ${currentCard.nextReview}`);
            //Popping the card from the deck if it shouldn't be reviewed anymore that day
            const now = new Date;
            if((setReview.getTime() - now.getTime()) / 1000 >= oneHour && state.deck.length > 1) { 
                const shiftedCard = state.deck.shift();
                console.log(`shifted ${shiftedCard!.fonWriting} from the deck`)
            }

        }
    },
    actions : {
        getCardsFromDB({ commit }: { commit: Function }) {
            console.log("initiating getCardsFromDB");
            return new Promise<void>((resolve) => {
                getDocs(cardsCollection)
                .then((querySnapshot) => {
                    const tempCards = Array<Card>();
                    querySnapshot.forEach((doc) => {
                        tempCards.push(doc.data() as Card);
                    });
                    commit('setStoreCards', tempCards)
                    console.log(`successfully loaded ${store.state.cards.length} cards from the database`);
                    resolve();
                })
                .catch(() => console.log("error while loading cards from the database"))
            });
        },
        initializeDeck({ commit }: { commit: Function }) {
            commit('initializeDeck')
        }

    }
});

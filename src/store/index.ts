import { createStore, Commit } from 'vuex';
import { cardsCollection, reviewsCollection, usersCollection } from '@/firebaseConfig';
import { getDocs, addDoc } from "firebase/firestore";
import { Card, Review, User, State } from "@/interfaces";

export const store = createStore({
    state() {
        return {
            cards: Array<Card>(),
            deck: Array<Card>(),
            reviews: Array<Review>(),
            userRegistered: false,
            user: {
                userID: "",
                userName: "",
                userPassword: "",
                userEmail: ""
            } as User
        }
    },
    getters : {
        getAllCards(state: State): Card[] {
            return state.cards
        }
    },
    mutations : {
        // USER
        setStoreUser(state: State, user: User) {
            state.user = user;
        },
        setLocalUser(state: State) {
            localStorage.setItem('user', JSON.stringify(state.user));
                console.log("successfully added user to the local storage");
        },
        getLocalUser(state: State) {
            try {
                //console.log(`starting getLocalUser()`);
                const localUser: User = JSON.parse(localStorage.getItem('user') || "{}");
                //console.log(`user information received from local storage: ${localUser.userName}`);
                state.user = localUser;
                state.userRegistered = true;
                //console.log(`user information registered in store state: ${state.user.userName}`);
            } catch(e) {
                console.log(`an error occurred while trying to load user information from the local storage`);
                console.log(e);
            }
        },
        // CARDS
        setStoreCards(state: State, importedCards: Array<Card>) {
            state.cards = importedCards;
        },
        getLocalCards(state: State) {
            try {
                //console.log("initiating getLocalCards");
                const localCardsObject = JSON.parse(localStorage.getItem('cards') || "{}") ; //Need the default value for TS typing
                state.cards = Object.values(localCardsObject);
                //console.log(`successfully loaded ${state.cards.length} cards from the local storage`);
                //console.log(`the first card is ${state.cards[0].fonWriting}`);
            } catch(e) {
                console.log("an error occurred while trying to load cards from the local storage");
                console.log(e);
            }
        },
        setLocalCards(state: State) {
            console.log(`starting setLocalCards()`);
            try {
                const exportCards = Object.assign({}, state.cards);
                console.log(`first card in exportCards is ${exportCards[0].fonWriting}`);
                localStorage.setItem('cards', JSON.stringify(exportCards));
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
            console.log(`starting initializeDeck()`);
            state.cards = state.cards.map((c: Card) => { c.nextReview = new Date(c.nextReview); return c;})
            console.log(`the first card in the store state has nextReview=${state.cards[0].nextReview}`)
            const maxDailyNew = 5;
            const maxDailyTotal = 10;

        //Determining which cards to review, and in what order, based on past review outcomes
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
        // REVIEWS
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
            console.log(`the parameter "known" passed to setCardNextReview is ${known}`)
            const currentCard = state.deck[0];
            console.log(`card ${currentCard.fonWriting} at the beginning of setCardNextReview has nextReview equal to ${currentCard.nextReview}`);
            const currentCardReviews: Array<Review> = store.state.reviews.filter((r: Review) => (r.cardID == currentCard.cardID));
            const setReview = new Date;
            const oneDay = 24 * 60 * 60; // number of seconds per day
            const oneHour = 60 * 60; //number of seconds per hour
            // Card unknown, regardless of previous status
            if (known === false) { 
                console.log(`setCardNextReview: 1. card unknown`)
                // Set the card to be reviewed in 10 seconds
                setReview.setSeconds(setReview.getSeconds() + 10);
            // card previously unseen but known
            } else if (known && currentCardReviews.length == 1) {
                console.log(`setCardNextReview: 2. card previously unseen but known`)
                setReview.setDate(setReview.getDate() + 30);
            // card previously reviewed and known
            } else if (known && currentCardReviews.length > 1) {
                console.log(`setCardNextReview: 3. card previously reviewed and known`)
                //Calculate last review interval in seconds
                currentCardReviews.sort((a: Review, b: Review) => (a.time > b.time) ? -1 : 1)
                const lastReview = currentCardReviews[0];
                const secondToLastReview = currentCardReviews[1];
                const lastDuration = (lastReview.time.getTime() - secondToLastReview.time.getTime()) / 1000; 
                console.log("the time difference in seconds between the last two reviews was ", lastDuration);
                if(lastDuration < 60 && secondToLastReview.known == false) {
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
            const nextDelay = (setReview.getTime() - now.getTime()) / 1000;
            console.log(`${nextDelay} seconds until the next review for this card`);
            if(nextDelay >= oneHour && state.deck.length >= 1) { 
                const shiftedCard = state.deck.shift();
                console.log(`shifted ${shiftedCard!.fonWriting} from the deck`)
            }
        },
        sendReviewsToDB(state: State) {
            console.log("starting sendReviewsToDB()");
            const sessionReviews = state.reviews;
            sessionReviews.forEach((review) => {
                addDoc(reviewsCollection, review)
            });
            console.log(`${sessionReviews.length} reviews sent to the DB`)

        }
    },
    actions : {
        // USER
        sendUserToDB(context, user: User){
            console.log("starting sendUserToDB()");
            return new Promise<void>((resolve) => {
                try {
                    addDoc(usersCollection, user);
                    resolve();
                }
                catch(e) {
                    console.log(`error sending the user to the database`);
                    console.log(e);
                }
            })
        },
        getCardsFromDB(context) {
            console.log("starting getCardsFromDB()");
            return new Promise<void>((resolve) => {
                getDocs(cardsCollection)
                .then((querySnapshot) => {
                    const tempCards = Array<any>();
                    querySnapshot.forEach((doc) => {
                        tempCards.push(doc.data());
                    });
                    tempCards.forEach((c) => c.nextReview = new Date(c.nextReview))
                    context.commit('setStoreCards', tempCards)
                    console.log(`successfully loaded ${store.state.cards.length} cards from the database`);
                    resolve();
                })
                .catch(() => console.log("error while loading cards from the database"))
            });
        },
        initializeDeck({ commit }: { commit: Commit }) {
            commit('initializeDeck')
        },
        setLocalCards({ commit }: { commit: Commit }) {
            commit('setLocalCards')
        }
    }
});

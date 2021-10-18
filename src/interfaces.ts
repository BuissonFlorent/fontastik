

export type Card = {
    readonly cardID: string;
    readonly fonWriting: string;
    readonly frenchWriting: string;
    nextReview: Date;
}

export type Review = {
    readonly reviewID?: string;
    readonly cardID: string;
    readonly userID: string;
    readonly time: Date;
    readonly known: boolean;
}

export type User = {
    readonly userID: string;
    readonly name: string;
    readonly email?: string;
}

export type State = {
    cards: Card[];
    deck: Card[];
    reviews: Review[];
    user: User;
}
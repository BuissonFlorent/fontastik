<template>
<h2> Loading cards from CSV file </h2>
        <vue-csv-import 
            v-model='fileArray' 
            :fields="{ 
                cardID: {required:true, label:'card ID'},
                fonWriting: {required:true, label:'fon writing'},
                frenchWriting: {required:true, label:'french writing'}
            }"
        >
            <p><vue-csv-toggle-headers></vue-csv-toggle-headers></p>
            <p><vue-csv-errors></vue-csv-errors></p>
            <p><vue-csv-input></vue-csv-input></p>
            <p><vue-csv-map></vue-csv-map></p>
        </vue-csv-import>
        <p><button @click="sendCardData(fileArray)">Click to send card data</button></p>
        <table>
            <thead>
                <tr>
                    <th v-for="col in colNames" :key="col.index" scope="col" style="text-align: left; width: 10rem;">{{ col }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="card in fileArray" :key="card.index">
                    <td v-for="col in colNames" :key="col.index">{{ card[col] }} </td>
                </tr>
            </tbody>
        </table>
</template>

<script lang="ts">
import { firestoreDB } from '@/firebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import { ref } from 'vue';
import { VueCsvImport, VueCsvToggleHeaders, VueCsvErrors, VueCsvInput, VueCsvMap } from 'vue-csv-import';
import { Card } from "@/interfaces";


export default { 
    name: 'AdminPanel',   
    setup() {

        // Defining the card format for the table
        const colNames = ["cardID", "fonWriting", "frenchWriting"];
        const fileArray = ref(Array<Card>())

        const sendCardData = (a: Array<Card>) => {
            console.log("number of cards in array", a.length);
            a.forEach((card) => {
                console.log("card: ", card.cardID);
                setDoc(doc(firestoreDB, "cards", card.cardID), {
                    cardID: card.cardID,
                    fonWriting: card.fonWriting,
                    frenchWriting: card.frenchWriting,
                    nextReview: "0"
                })
            });
        }
        return { colNames, sendCardData, fileArray }
    },
    components: { VueCsvImport, VueCsvToggleHeaders, VueCsvErrors, VueCsvInput, VueCsvMap }
}
</script>
<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="home-screen" href="/tabs/home-screen">
                <ion-icon :icon="square" />
                <ion-label>Page d'accueil</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="review-screen" href="/tabs/review-screen">
                <ion-icon :icon="ellipse" />
                <ion-label>Apprentissage</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="user-profile" href="/tabs/user-profile">
                <ion-icon :icon="triangle" />
                <ion-label>Profil utilisateur</ion-label>
                </ion-tab-button>
                
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      ellipse, 
      square, 
      triangle,
    }
  }
}
</script>
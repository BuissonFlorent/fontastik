<template>
    <ion-app>
        <ion-tabs>
            <ion-router-outlet />
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="home-tab" href="/tabs/home-tab">
                <ion-icon :icon="home" />
                <ion-label>Page d'accueil</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="review-tab" href="/tabs/review-tab">
                <ion-icon :icon="book" />
                <ion-label>Apprentissage</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="profile-tab" href="/tabs/profile-tab">
                <ion-icon :icon="person" />
                <ion-label>Profil utilisateur</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-app>
</template>

<script lang="ts">
import { IonApp, IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonRouterOutlet } from '@ionic/vue';
import { home, person, book } from 'ionicons/icons';

export default {
  name: 'AppTabs',
  components: { IonApp, IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonRouterOutlet },
  setup() {
    return {
      home, 
      person,
      book
    }
  }
}
</script>
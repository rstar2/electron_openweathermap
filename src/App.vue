<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
console.log(process.env.VUE_APP_OPENWEATHERMAP_API_KEY);

import axios from "axios";
axios.defaults.baseURL = "http://api.openweathermap.org/data/2.5";

export default {
  name: "App",
  data() {
    return {
      //
    };
  }
};
</script>

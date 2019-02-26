<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>OpenWeather</span>
        <span class="font-weight-light">Map</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat to="/about">
        <span class="mr-2">About</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    };
  }
};
</script>

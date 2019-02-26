<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <p>Welcome to météo app.</p>
            <p>Search for a city to display the weather</p>
            <v-text-field label="City" box v-model="city"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn primary flat router @click="getWeather">Search</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 v-if="show">
        <v-card>
          <v-card-text>
            <v-layout row>
              <v-layout xs6>
                <v-card-text>
                  <v-spacer></v-spacer>
                  <h1>{{temp.toFixed(2)}}°C</h1>
                  <h1>{{weatherDescription}}</h1>
                </v-card-text>
              </v-layout>
              <v-layout xs6>
                <v-card-text>
                  <p>
                    <v-icon>fas fa-snowflake</v-icon>
                    Min : {{ tempMin.toFixed(2) }}°C
                  </p>
                  <p>
                    <v-icon>fas fa-sun</v-icon>
                    Max : {{ tempMax.toFixed(2) }}°C
                  </p>
                  <p>
                    <v-icon>fas fa-tint</v-icon>
                    Humidity : {{ humidity }} %
                  </p>
                </v-card-text>
              </v-layout>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {

    };
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link);
    },
    getWeather () {
      axios
        .get(this.url, {
          params: {
            q: this.city,
            appid: this.key
          }
        })
        .then(response => {
          this.temp = response.data.main.temp - 274;
          this.tempMax = response.data.main.temp_max - 274;
          this.tempMin = response.data.main.temp_min - 274;
          this.humidity = response.data.main.humidity;
          this.weatherDescription = response.data.weather[0].description;
          this.show = true;
        })
        .catch(errors => {
          console.log(errors);
        });
    }
  }
};
</script>

<style>
</style>

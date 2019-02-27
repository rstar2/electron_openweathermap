<template>
  <v-container>
    <v-layout wrap>

      <v-flex xs12 md6>
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

      <v-flex xs12 md6>
        <v-card v-if="data">
          <v-card-text>
            <v-layout justify-space-between>
              <v-flex>
                <h1>{{ data.temp | temperature }}</h1>
                <h1>{{ data.weatherDescription }}</h1>
              </v-flex>
              <v-flex>
                <p>
                  <v-icon>mdi-thermometer-minus</v-icon>
                  Min : {{ data.tempMin | temperature }}
                </p>
                <p>
                  <v-icon>mdi-thermometer-plus</v-icon>
                  Max : {{ data.tempMax | temperature }}
                </p>
                <p>
                  <v-icon>mdi-water</v-icon>
                  Humidity : {{ data.humidity | percent }}
                </p>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-card v-else-if="error">
          <v-card-text>
            <p class="error--text">{{error}}</p>
          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://api.openweathermap.org/data/2.5';

export default {
  data () {
    return {
      city: null,

      error: null,
      data: {
        country: '',
        weatherDescription: '',
        temp: null,
        tempMin: null,
        tempMax: null,
        humidity: null,
      }
    };
  },
  created () {
    this.data = null;
  },
  filters: {
    temperature (value) {
      return value.toFixed(2) + ' °C';
    },
    percent (value) {
      return value + ' %';
    }
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link);
    },
    getWeather () {
      if (!this.city) {
        console.log('No city selected yet');

        return;
      }

      this.error = null;
      this.data = null;
      axios
        .get('/weather', {
          params: {
            q: this.city,
            appid: this.$root.$options.OPENWEATHERMAP_API_KEY
          }
        })
        .then(response => {
          const { main, weather, sys } = response.data;

          const data = {};
          data.temp = main.temp - 274;
          data.tempMax = main.temp_max - 274;
          data.tempMin = main.temp_min - 274;
          data.humidity = main.humidity;
          data.weatherDescription = weather[0].description;
          data.country = sys.country;

          this.data = data;
        })
        .catch(({ config, request, response }) => {
          const { data } = response;
          this.error = (data && data.message) || 'Unknown error';
        });
    }
  }
};
</script>

<style>
</style>

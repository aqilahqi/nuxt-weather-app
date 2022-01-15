<template>
  <div class="main-bg">
    <div
      class="mb-10"
      v-if="weather.id"
    >
      <div class="weather-current">
        <div class="d-flex justify-space-between align-start">

          <p class="mb-0">{{weather.city}}, {{weather.country}}</p>
          <v-btn
            elevation="0"
            icon
            regular
            color="light-blue lighten-4 pa-0"
            class="text-capitalize"
            @click="getCurrentLocation"
          >
            <v-icon color="light-blue lighten-4">
              mdi-google-maps
            </v-icon>
          </v-btn>
        </div>
        <h2 class="font-regular">{{(weather.main.feels_like).toFixed(0)}}<sup>&deg;</sup></h2>
        <v-chip
          small
          color="info"
          class="font-regular"
        >{{weather.weather.main}}</v-chip>
      </div>
      <v-row class="text-center mt-3">
        <v-col>
          <v-icon
            small
            color="secondary"
          >
            mdi-water-outline
          </v-icon>
          <span class="ml-1 small-font secondary--text font-semibold">{{weather.main.humidity}} %</span>
        </v-col>
        <v-col>
          <v-icon
            small
            color="secondary"
          >
            mdi-arrow-down-thin
          </v-icon>
          <span class="ml-1 small-font secondary--text font-semibold">{{weather.main.pressure}} hPa</span>
        </v-col>

        <v-col>
          <v-icon
            small
            color="secondary"
          >
            mdi-weather-windy
          </v-icon>
          <span class="ml-1 small-font secondary--text font-semibold">{{weather.wind.speed}} m/s</span>
        </v-col>
      </v-row>
    </div>

    <div class="selection-wrapper">
      <p class="font-regular secondary--text mb-4">Select a different location</p>
      <v-select
        :items="states"
        v-model="selectedState"
        label="State"
      ></v-select>
      <v-select
        :items="cities"
        v-model="selectedCity"
        label="City"
      ></v-select>
      <p class="small-font mb-0">Or add a new city to {{selectedState}}</p>
      <v-text-field
        v-model="newCity"
        append-icon="mdi-plus"
        @click:append="addCity"
        hide-details="auto"
      ></v-text-field>
      <v-row class="justify-end mt-10">
        <v-btn
          elevation="0"
          color="light-blue lighten-4"
          class="text-capitalize"
          @click="getWeatherByCity"
        ><span class="font-regular primary--text">Get Weather</span>
          <v-icon
            regular
            color="primary"
            class="ml-2"
          >
            mdi-cloud-outline
          </v-icon>
        </v-btn>
      </v-row>
    </div>

    <div
      class="mt-10"
      v-if="forecast && forecast.length > 0"
    >
      <div
        class="box"
        v-for="(f, index) in forecast"
        :key="index"
      >
        <p class="font-semibold">{{formatDate(f.dateString)}}, {{formatDay(f.dateString)}}</p>
        <v-row
          class="justify-space-between"
          v-for="(l, i) in f.list"
          :key="i"
        >
          <v-col>
            <p>{{l.weather}}</p>
          </v-col>
          <v-col class="text-right">
            <p class="small-font">{{formatTime(l.dateString)}}</p>
          </v-col>
        </v-row>
      </div>
    </div>

    <v-overlay
      :value="loading"
      opacity="0.8"
    >
      <div class="pa-4 text-center">
        <p class="white--text">Whether the weather is warm, whether the weather is hot, we have to put up with the weather, whether we like it or not.</p>
        <v-progress-circular
          indeterminate
          color="info"
          class="mb-0"
        ></v-progress-circular>
      </div>
    </v-overlay>

    <div class="text-center">
      <v-snackbar
        :timeout="2000"
        v-model="error"
        absolute
        top
        color="red accent-2"
      >
        {{errorMsg}}
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Index",
  data() {
    return {
      city: null,
      error: false,
      errorMsg: "",
      newCity: null,
      loading: false,
      selectedState: "Wilayah Persekutuan",
      selectedCity: "Kuala Lumpur",
      forecast: [],
      tempDate: "",
      current: {
        id: null,
      },
      API_KEY: "002ce871fae3c25336c2496ff340254c",
    };
  },

  computed: {
    rightNow() {
      return moment(new Date()).format("DDMMYYYYkkmmss");
    },
    states() {
      return this.$store.state.states;
    },
    weather() {
      return this.current;
    },
    cities() {
      let list = this.$store.state.cities;
      let arr = list.filter((l) => l.name == this.selectedState);
      return arr[0].list;
    },
  },

  methods: {
    formatDay(d) {
      let dd = new Date(d);
      return moment(dd).format("dddd");
    },
    formatDate(d) {
      let dd = new Date(d);
      return moment(dd).format("D/MM");
    },
    formatTime(d) {
      let dd = new Date(d);
      return moment(dd).format("h:mma");
    },
    getCurrentLocation() {
      if (navigator.geolocation) {
        this.loading = true;
        this.forecast = [];
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.getWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude
            );
            this.loading = false;
          },
          (err) => {
            this.loading = false;
            this.error = true;
            this.errorMsg =
              err.code == 1
                ? "You have denied location permission"
                : err.message;
          },
          { timeout: 7000 }
        );
      }
    },
    getWeatherByCity() {
      this.loading = true;
      this.getWeatherForecast();
      this.$axios
        .$get(
          `/data/2.5/weather?q=${this.selectedCity}&units=metric&appid=${this.API_KEY}`
        )
        .then((response) => {
          let res = response;
          this.current = {
            id: res.id,
            city: res.name,
            country: res.sys.country,
            weather: res.weather[0],
            main: res.main,
            wind: res.wind,
          };
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.error = true;
          this.errorMsg = err.response.data.message;
        });
    },
    getWeatherForecast() {
      this.$axios
        .$get(
          `/data/2.5/forecast?q=${this.selectedCity}&units=metric&appid=${this.API_KEY}`
        )
        .then((response) => {
          let list = response.list;
          this.forecast = [];
          // console.log(this.rightNow);
          for (let i = 0; i < list.length; i++) {
            let newDate = moment(list[i].dt_txt).format("D/MM");
            let now = moment(list[i].dt_txt).format("DDMMYYYYkkmmss");
            if (now > this.rightNow) {
              if (this.tempDate !== newDate) {
                this.tempDate = newDate;
                let p = {
                  date: newDate,
                  dateString: list[i].dt_txt,
                  list: [],
                };
                this.forecast.push(p);
              }
              let obj = {
                date: list[i].dt,
                dateString: list[i].dt_txt,
                weather: list[i].weather[0].main,
              };
              let index = this.forecast.findIndex(
                (f) => f.date === this.tempDate
              );
              this.forecast[index].list.push(obj);
            }
          }
          this.tempDate = "";
        })
        .catch((err) => {
          this.loading = false;
          this.error = true;
          this.errorMsg = err.response.data.message;
        });
    },
    getWeatherByCoords(lat, long) {
      this.$axios
        .$get(
          `/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${this.API_KEY}`
        )
        .then((response) => {
          let res = response;
          this.current = {
            id: res.id,
            city: res.name,
            country: res.sys.country,
            weather: res.weather[0],
            main: res.main,
            wind: res.wind,
          };
        })
        .catch((err) => {
          this.loading = false;
          this.error = true;
          this.errorMsg = err.response.data.message;
        });
    },
    kelvinToCelcius(k) {
      return (k - 273.15).toFixed(0);
    },
    addCity() {
      this.$store.commit("ADD_CITY", {
        state: this.selectedState,
        city: this.newCity,
      });
      this.selectedCity = this.newCity;
      this.newCity = "";
    },
  },

  created() {
    this.getCurrentLocation();
  },
};
</script>

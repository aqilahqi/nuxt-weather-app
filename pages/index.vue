<template>
  <div>
    <div
      class="weather-current"
      v-if="weather.id"
    >
      <p>{{weather.city}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      city: "London",
      current: {
        id: null,
      },
      API_KEY: "002ce871fae3c25336c2496ff340254c",
    };
  },

  computed: {
    states() {
      return this.$store.state.states;
    },
    weather() {
      return this.current;
    },
  },

  methods: {
    getCurrentLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.getWeatherByCoords(
          position.coords.latitude,
          position.coords.longitude
        );
      }),
        (err) => {
          console.log(err);
        };
    },
    getWeatherByCity() {
      this.$axios
        .$get(`/data/2.5/weather?q=${this.city}&appid=${this.API_KEY}`)
        .then((response) => {
          console.log(response);
        });
    },
    getWeatherByCoords(lat, long) {
      this.$axios
        .$get(`/data/2.5/weather?lat=${lat}&lon=${long}&appid=${this.API_KEY}`)
        .then((response) => {
          let res = response;
          this.current = {
            id: res.id,
            city: res.name,
            country: res.sys.country,
            weather: res.weather,
          };
        });
    },
  },

  created() {
    this.getCurrentLocation();
  },
};
</script>

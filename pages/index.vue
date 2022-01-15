<template>
  <div>
    <h1>Hello world</h1>
    {{states}}
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      city: "London",
      current: {},
      API_KEY: "002ce871fae3c25336c2496ff340254c",
    };
  },

  computed: {
    states() {
      return this.$store.state.states;
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
          console.log(response);
        });
    },
  },

  created() {
    this.getCurrentLocation();
  },
};
</script>

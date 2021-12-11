<template>
  <div class="app-wrapper">
    <div v-if="this.$store.state.postLoaded" class="app">
      <Nav v-if="!NavDisable" />
      <router-view class="min-h-screen" />
      <Footer v-if="!NavDisable" />
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "app",
  components: { Nav, Footer },
  data() {
    return {
      NavDisable: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user);
      if (user) {
        this.$store.dispatch("getCurrentUser");
        this.$store.dispatch("getHistory");
      }
    });
    this.checkRoute();
    this.$store.dispatch("getPost");
  },
  mounted() {},
  methods: {
    checkRoute() {
      if (
        this.$route.name === "Login" ||
        this.$route.name === "Register" ||
        this.$route.name === "ForgotPassword"
      ) {
        this.NavDisable = true;
        return;
      }
      this.NavDisable = false;
    },
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>

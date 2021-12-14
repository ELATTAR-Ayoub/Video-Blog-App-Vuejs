<template lang="">
  <div class='w-full'>
    <Loading v-if="loading" />
    <div class='containerX flexCenter mt-24 flex-col mx-auto w-full text-secondary capitalize'>
      <h1 class=" md:text-4xl text-2xl font-semibold mb-1">Login to VBlog</h1>
      <p class=' paragraph'>Welcome again! we are happy to see you.</p>
      <form action="/login" method="POST">
        <div class="login-section">
          <input type="text" autocomplete="" placeholder=" " required v-model="email">
          <label class="login-label">
            <span class="login-content">email</span>
          </label>
        </div>
        <div class="login-section mb-8">
          <input type="password" placeholder=" " required v-model="password">
          <label class="login-label">
            <span class="login-content">password</span>
          </label>
        </div>
        <p v-show="error" class="log-error">{{this.errorMsg}}</p>
        <div class="submit-section">
          <button @click.prevent="login" class='main-btn'>Log in</button>
        </div>
      </form>
    </div>
    <p class="login-link paragraph w-full">
      <router-link :to="{ name: 'ForgotPassword' }">forgot your password? </router-link>
    </p>
    <p class='paragraph'> don't have an account? try <router-link class="login-link" :to="{ name: 'Register' }">register
      </router-link>
    </p>
    <p class='paragraph'> Go back <router-link class="login-link" :to="{ name: 'Home' }">Home</router-link>
    </p>

  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
import Loading from "../components/Loading.vue";
export default {
  name: "Login",
  components: { Loading },
  data() {
    return {
      email: "",
      password: "",
      error: null,
      errorMsg: "",
      loading: null,
    };
  },
  created() {},
  methods: {
    // then%catch in place of async&await will work just fine, also there no need for async&await cause there no multiple then
    async login() {
      this.loading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.loading = false;
          this.$router.push({ name: "Home" });
          this.error = false;
          this.errorMsg = "";
        })
        .catch((e) => {
          this.loading = false;
          this.error = true;
          this.errorMsg = e.message;
        });
    },
  },
};
</script>
<style lang="scss">
.login-section {
  @apply w-full relative h-8 my-16 mx-auto;
}

form {
  @apply w-3/4 md:w-1/2;
}

.login-section input {
  @apply w-full text-lg outline-none border-0 p-4 bg-transparent font-medium text-secondary;
}

.submit-section {
  @apply flex justify-center items-center mb-3;
}

.login-section label {
  @apply absolute top-1/2 left-0 h-full w-full font-bold pointer-events-none border-b border-secondary;
}

.login-section label::after {
  content: "";
  @apply absolute h-full w-full border-b-2 border-sideColor left-0 opacity-0 transform -translate-x-full transition-all;
}

.login-content {
  @apply absolute bottom-1 left-0 transition-all;
}

.login-section input:focus + .login-label .login-content,
.login-section input:valid + .login-label .login-content {
  transform: translateY(-175%);
  font-size: 13px;
}

.login-section input:focus + .login-label::after,
.login-section input:valid + .login-label::after {
  @apply transform translate-x-0 z-10 opacity-100;
}

.login-link {
  @apply font-semibold hover:text-sideColor-light;
}

.log-error {
  @apply text-red-500 font-medium mb-2;
}

.file {
  @apply opacity-0 w-0 h-0 absolute;
}

.file-input label {
  @apply relative p-4 px-8 rounded-md bg-sideColor hover:bg-sideColor-dark text-primary flex justify-center items-center font-semibold cursor-pointer transition-all;
}

.file-name {
  @apply text-secondary;
}

.file input {
  @apply transform hover:scale-110;
}

#file-img alt {
  display: hidden;
}
</style>
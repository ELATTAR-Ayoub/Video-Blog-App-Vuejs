<template lang="">
    <div class='w-full relative'>
        <Modale v-if="modalActive" :modalHeader="modalHeader" :modalMessage="modalMessage" v-on:close-modal="closeModal"/>
        <Loading v-if="loading"/>
        <div class='containerX flexCenter mt-24 flex-col mx-auto w-full text-secondary capitalize'>
            <h1 class=" md:text-4xl text-2xl font-semibold mb-1">Reset Password</h1>
            <p class='paragraph'>Don't worry, we got your back!</p>
            <form action="" method="POST">
                    <div class="login-section">
                        <input type="email" autocomplete="" required v-model="email">
                        <label class="login-label">
                            <span class="login-content">email</span>
                        </label>
                    </div>
                    <div class="submit-section">
                    <button class='flexCenter main-btn' @click.prevent="resetPassword">Send Verification
                        <eva-icon class='ml-2' fill='#fff' width='18px' height='18px' name="email"></eva-icon>
                    </button>
                </div>
            </form>
            <p class='paragraph'> Wanna give it another try? try <router-link class="login-link" :to="{ name: 'Login' }">Login</router-link>
            </p>
            <p class='paragraph'> Go back <router-link class="login-link" :to="{ name: 'Home' }">Home</router-link>
            </p>
        </div>

    </div>
</template>
<script>
import Modale from "../components/Modale";
import Loading from "../components/Loading";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "ForgorPassword",
  data() {
    return {
      email: null,
      modalActive: null,
      loading: null,
      modalHeader: "",
      modalMessage: "",
    };
  },
  components: { Modale, Loading },
  methods: {
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = "";
    },
    resetPassword() {
      if (this.email !== "") {
        this.loading = true;
        firebase
          .auth()
          .sendPasswordResetEmail(this.email)
          .then(() => {
            this.modalHeader = "We've sent you an email.";
            this.modalMessage =
              "If your account exists, you will receive a reset password link.";
            this.loading = false;
            this.modalActive = true;
          })
          .catch((e) => {
            this.modalHeader = "We've jumped into an error!";
            this.modalMessage = e.message;
            this.loading = false;
            this.modalActive = true;
          });
      }
    },
  },
  computed: {},
};
</script>
<style lang="">
</style>
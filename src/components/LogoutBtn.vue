<template lang="">
    <div class='w-full'>
        <button @click="signout" class="flexCenter mt-2 bg-red-500 w-full p-2 rounded-md hover:bg-red-400">Log out <eva-icon
                        width="16" height="16" fill="#FFF" class="ml-2" name="log-out"></eva-icon></button>
    </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "logout-btn",
  components: {},
  methods: {
    signout() {
      firebase.auth().signOut();
      this.$router.push({ name: "Home" });
      window.location.reload();
    },
  },
};
</script>
<style lang="">
</style>
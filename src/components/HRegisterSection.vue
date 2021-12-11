<template lang="">
    <div v-if="!user" class='w-full bg-sideColor text-primary p-8'>
        <div class="containerX flexCenter flex-col text-center">
            <p>Still doesn't have an account?</p>
            <p>Join the fun right now and share your blogs with the world.</p>
            <router-link
                class="bg-primary flexCenter font-semibold text-sideColor rounded-md w-full md:w-1/2 p-4 mt-3 text-center text-lg transition-all hover:bg-primary-light "
                :to="{ name: 'Register' }">Register <eva-icon class="ml-2" fill='#2659E8' name="arrow-forward"
                    width='18px' height='18px'></eva-icon>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
  name: "h_register_section",
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>
<style lang="">
</style>
<template lang="">
    <div class="bg-secondary text-primary p-5 relative">
        <div class='containerX pb-0'>
            <div class="flex justify-between flex-col my-12 mt-0 md:flex-row">
                <div class="watermark ">
                    <router-link   :to="{ name: 'Home' }">VBlog </router-link>
                </div>
                <p class="font-semibold text-lg mt-3 md:mt-0">
                    created with &lt;3 by ELATTAR Ayoub
                </p>
            </div>
            <div class="flex justify-between flex-col md:flex-row ">
                <div>
                    <p class='font-semibold text-xl opacity-75'>&#169; VBlog</p>
                    <p class='font-semibold text-base opacity-50'>All RIGHT MIGHT BE RESERVED?</p>
                </div>
                <div class="footer-links">
                    <router-link   :to="{ name: 'Home' }">VBlog</router-link>
                    <span  >.</span>
                    <router-link   :to="{ name: 'Blogs' }">Blogs</router-link>
                    <span v-if="!user" >.</span>
                    <router-link v-if="!user" :to="{ name: 'NewBlog' }">Create Blog</router-link>
                    <span v-if="!user" >.</span>
                    <router-link v-if="!user"  :to="{ name: 'Login' }">Login</router-link>
                    <span v-if="!user" >.</span>
                    <router-link  v-if="!user"   :to="{ name: 'Register' }">Sign up</router-link>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="">
</style>
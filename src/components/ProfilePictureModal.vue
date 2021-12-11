<template lang="">
    <div class='rounded-full overflow-hidden w-full h-full mx-auto relative flexCenter'>
            <img  id="img" v-show="this.profilePictureFileURL" :src="this.profilePictureFileURL" alt="profile picture">
            <span v-show="!this.profilePictureFileURL" class="
              rounded-full
              bg-sideColor
              text-primary
              w-full
              h-full
              flexCenter cursor-pointer
              uppercase profilePictureModalSpan
            ">{{ this.$store.state.profileInitials }}</span>
    </div>
</template>
<script>
export default {
  methods: {},
  computed: {
    profilePictureFileURL() {
      return this.$store.state.profilePictureFileURL;
    },
  },
};
</script>

<style lang="scss" scoped>
.profilePictureModalSpan {
  font-size: 100%;
  padding: 2px;
}
</style>
<template lang="">
    <div class='modale'>
        <div class='flex justify-center items-center shadow-lg flex-col max-w-3/4 md:max-w-1/2 min-w-1/5 bg-primary text-secondary rounded-lg'> 
            <h1 class='text-center font-bold p-4 w-full break-words uppercase'>{{ this.modalHeader}} </h1>
            <p class='text-center p-4 w-full break-words'>{{ this.modalMessage}}</p>
            <button class='w-1/2 p-4 m-4 rounded-lg bg-secondary text-primary hover:bg-sideColor' @click="closeModal">Close</button>
        </div>
    </div>
</template>
<script>
export default {
  props: ["modalHeader", "modalMessage"],
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>
<style lang="scss">
.modale {
  @apply absolute z-30 top-0 left-0 flex justify-center items-center w-full h-full bg-secondary bg-opacity-50;
}
</style>
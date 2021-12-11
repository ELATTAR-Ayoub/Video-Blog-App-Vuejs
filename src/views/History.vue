<template lang="">
    <div class="w-full relative">
        <div class="containerX flexCenter justify-between flex-col p-5 capitalize">
            <h1 class='text-3xl font-semibold w-full'>History</h1>
            <div class="w-full flexCenter flex-col">
                <HistoryCard :post="post" v-for="(post, index) in histories" :key="index" />
            </div>
        </div>
    </div>
</template>
<script>
import HistoryCard from "../components/HistoryCard.vue";
export default {
  name: "history",
  components: { HistoryCard },
  methods: {},
  computed: {
    histories() {
      return this.$store.getters.myHistory;
    },
  },
};
</script>
<style lang="">
</style>
<template lang="">
    <div class='loading'>
      <div class="spinner">
          <div class="spinner-item"></div>
          <div class="spinner-item"></div>
          <div class="spinner-item"></div>
        </div>
    </div>
</template>
<script>
export default {
  name: "loading",
};
</script>
<style lang="scss" scoped>
.loading {
  @apply fixed z-50 top-0 left-0 flex justify-center items-center w-screen h-screen bg-secondary bg-opacity-75;
}

.spinner {
  --animation-duration: 5000ms;
  position: relative;
  width: var(75px);
  height: var(75px);
  transform: rotate(45deg);

  .spinner-item {
    --item-size: 36px;
    position: absolute;
    width: var(--item-size);
    height: var(--item-size);
    background-color: var(--clr-spinner);
  }

  .spinner-item:nth-child(1) {
    --clr-spinner: #2659e8;
    top: 0;
    left: 0;
    animation: spinner3A var(--animation-duration) linear infinite;

    @keyframes spinner3A {
      0%,
      8.33%,
      16.66%,
      100% {
        transform: translate(0%, 0%);
      }

      24.99%,
      33.32%,
      41.65% {
        transform: translate(100%, 0%);
      }

      49.98%,
      58.31%,
      66.64% {
        transform: translate(100%, 100%);
      }

      74.97%,
      83.30%,
      91.63% {
        transform: translate(0%, 100%);
      }
    }
  }

  .spinner-item:nth-child(2) {
    --clr-spinner: #151515;
    top: 0;
    left: var(--item-size);
    animation: spinner3B var(--animation-duration) linear infinite;

    @keyframes spinner3B {
      0%,
      8.33%,
      91.63%,
      100% {
        transform: translate(0%, 0%);
      }

      16.66%,
      24.99%,
      33.32% {
        transform: translate(0%, 100%);
      }

      41.65%,
      49.98%,
      58.31% {
        transform: translate(-100%, 100%);
      }

      66.64%,
      74.97%,
      83.30% {
        transform: translate(-100%, 0%);
      }
    }
  }

  .spinner-item:nth-child(3) {
    --clr-spinner: #fff;
    top: var(--item-size);
    left: var(--item-size);
    animation: spinner3C var(--animation-duration) linear infinite;

    @keyframes spinner3C {
      0%,
      83.30%,
      91.63%,
      100% {
        transform: translate(0, 0);
      }

      8.33%,
      16.66%,
      24.99% {
        transform: translate(-100%, 0);
      }

      33.32%,
      41.65%,
      49.98% {
        transform: translate(-100%, -100%);
      }

      58.31%,
      66.64%,
      74.97% {
        transform: translate(0, -100%);
      }
    }
  }
}
</style>
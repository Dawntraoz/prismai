<template>
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    class="loading-icon"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 6.00025C10.9999 7.05613 10.6656 8.08489 10.045 8.93909C9.4243 9.79329 8.54915 10.4291 7.54493 10.7553C6.54072 11.0816 5.459 11.0816 4.4548 10.7552C3.45061 10.4289 2.57549 9.7931 1.95487 8.93886C1.33425 8.08463 0.999992 7.05585 1 5.99996C1.00001 4.94408 1.33428 3.91531 1.95491 3.06108C2.57554 2.20685 3.45067 1.57103 4.45487 1.24473C5.45907 0.918437 6.54079 0.918422 7.545 1.24469"
      stroke="#076EFF"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<style scoped>
.loading-icon {
  animation-name: rotating;
  animation-duration: 0.75s;
  animation-iteration-count: infinite;
}
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

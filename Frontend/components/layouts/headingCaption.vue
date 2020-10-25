<template>
  <h1>
    <slot />
  </h1>
</template>

<script>
export default {
  computed: {
    isDarkMode () {
      return this.$store.getters.getIsDarkMode
    }
  }
}
</script>

<style lang='scss' scoped>

</style>

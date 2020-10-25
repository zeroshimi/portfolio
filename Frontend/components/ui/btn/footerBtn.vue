<template>
  <div class="footerBtn">
    <div class="imgContainer">
      <img :src="isDarkMode ? `/images/${imgName.isDarkMode}` : `/images/${imgName.normal}`" class="footerImg" />
    </div>
    <div class="footerBtnMain header-font-family">
      <span class="footerBtnMain__text u-font-size-ss">
        <slot />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgName: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    isDarkMode () {
      return this.$store.getters.getIsDarkMode
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/variables';
.footerBtn{
  display: flex;
  height: 100%;
}
.footerBtnMain{
  align-items: center;
  display: flex;
  justify-content: center;
  &__text {
  }
}

@media (max-width: 767px) {
.footerBtn{
  flex-direction: column;
}
.footerBtnMain{
  &__text {
    height: auto;
    width: auto;
  }
}
}
</style>

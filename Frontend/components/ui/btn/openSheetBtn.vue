<template>
  <button class="button openSheetBtn" :aria-controls="`fileBtnList${index}`" aria-expanded="false" @click="openSheet($event)">
    <img
      class="openSheetMenuIcon"
      :src="imageUrl"
      type="image/svg+xml"
      @click="changeImage"
    >
  </button>
</template>

<script>
export default {
  props: {
    trueImage: {
      type: String,
      default () {
        return ''
      }
    },
    falseImage: {
      type: String,
      default () {
        return ''
      }
    },
    index: {
      type: Number,
      default () {
        return null
      }
    },
    value: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    imageUrl () {
      return (this.value) ? this.falseImage : this.trueImage
    },
    isDarkMode () {
      return this.$store.getters.getIsDarkMode
    }
  },
  methods: {
    openSheet (e) {
      this.$emit('_switchExpanded', e)
    },
    changeImage () {
      this.$emit('_switchSheetList')
    }
  }
}
</script>
<style lang="scss" scoped>
.openSheetBtn{
  height: 100%;
  width: auto;
}
.openSheetMenuIcon{
  cursor:pointer;
  height: 16px;
  width:16px;
}

</style>

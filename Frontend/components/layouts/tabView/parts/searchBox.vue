<template>
  <label class="searchBox">
    <input
      type="text"
      :placeholder="placeholder"
      class="searchBox_input"
    />
  </label>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: true,
      default () {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.searchBox {
    display: table-cell;
    height: 40px;
    vertical-align: middle;
    width: inherit;
    &_input {
        height: 100%;
        outline: none;
        width: 100%;
    }
}
</style>

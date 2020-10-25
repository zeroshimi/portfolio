<template>
  <button :type="btnType" :class="['button',className]" @click="_emitSuperMethod($event)">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      required: false,
      default () {
        return 'generalBtn'
      }
    },
    btnType: {
      type: String,
      required: false,
      default () {
        return 'button'
      }
    },
    methodsName: {
      type: String,
      required: false,
      default () {
        return ''
      }
    }
  },
  methods: {
    _emitSuperMethod (e) {
      this.$emit(this.methodsName, e)
    }
  }
}
</script>

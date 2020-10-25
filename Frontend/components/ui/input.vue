<template>
  <label class="inputArea">
    <input
      class="inputArea_main"
      :class="[
        { darkInputBackGroundColor: isDarkMode, normalInputBackGroundColor: !isDarkMode },
        { darkModeInputCursorColor: isDarkMode }
      ]"
      :type="openPassword ? 'text' : typeName.toLowerCase()"
      value=""
      oncopy="return false"
      onpaste="return false"
      :placeholder="placeholder"
      @input="_display($event)"
    >
  </label>
</template>
<script>
export default {
  props: {
    objIndex: {
      type: Number,
      required: true,
      default () {
        return 1
      }
    },
    emitMethodsName: {
      type: String,
      required: true,
      default () {
        return ''
      }
    },
    typeName: {
      type: String,
      required: true,
      default () {
        return ''
      }
    },
    placeholder: {
      type: String,
      required: true,
      default () {
        return ''
      }
    },
    inputData: {
      type: String,
      required: true,
      default () {
        return ''
      }
    },
    openPassword: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    }
  },
  computed: {
    isDarkMode () {
      return this.$store.getters.getIsDarkMode
    }
  },
  methods: {
    //  ここほぼコピペだけど、こっから先使えそう
    _validation (e) {
      const str = e.target.value
      if (str.match(/^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/)) {
        if (str.length > 50) {
          console.log('50文字以内にしてください')
          e.target.value = this.inputData
          return { value: this.inputData, validate: true }
        } else {
          return { value: str, validate: true }
        }
      } else if (str.length === 0) {
        return { value: '', validate: false }
      } else {
        e.target.value = this.inputData
        return { value: this.inputData, validate: false }
      }
    },
    _display (e) {
      const payload = this._validation(e)
      this.$emit(
        this.emitMethodsName,
        {
          value: payload.value,
          index: this.objIndex,
          isvalid: payload.validate
        }
      )
    }
  }
}

</script>
<style lang="scss" scoped>
@import './../../assets/scss/variables';
.inputArea {
  height: auto;
  width: auto;
  &_main{
    color: inherit;
    outline: none;
    padding: 8px;
  }
}

.normalInputBackGroundColor {
  background-color: $normal-sub-color;
}

.darkInputBackGroundColor {
  background-color: $dark-sub-color;
}

.darkModeInputCursorColor {
  caret-color: $normal-base-color;
}
</style>

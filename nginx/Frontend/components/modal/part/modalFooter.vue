<template>
  <section :class="[{'footer--welcome': type==='welcome', 'footer--alert': type==='alert' }, 'footer']">
    <Heading v-show="false">footer</Heading>
    <template v-if="type==='welcome'">
      <fa :icon="faCaretSquareLeft" draggable="false" class="footer_icon" @click="changeSlide('back')" />
      <ul class="ul footer_btn">
        <li
          v-for="(num, index) in slideList"
          :key="index"
          @click="changeSlide('normal', index)"
          class="li"
        >
          <a href="#" class="a slideBtn" :class="{ 'slideBtn--active': slideNum === num.index, 'slideBtn--backgroundColor': slideNum !== num.index }">{{ num.index }}</a>
        </li>
      </ul>
      <fa :icon="faCaretSquareRight" draggable="false" class="footer_icon" @click="changeSlide('next')" />
    </template>
    <template v-else-if="type==='alert'">
      <button class="button button--alert" @click.stop="isModalOpen=!isModalOpen">OK</button>
    </template>
  </section>
</template>
<script>
import { faCaretSquareRight, faCaretSquareLeft } from '@fortawesome/free-solid-svg-icons'
import Heading from './../../globalComponent/headingCaption'
export default {
  props: {
    slideNum: {
      type: Number,
      required: false,
      default () {
        return 1
      }
    },
    slideList: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    type: {
      type: String,
      required: true,
      default () {
        return 'welcome'
      }
    }
  },
  computed: {
    faCaretSquareRight () {
      return faCaretSquareRight
    },
    faCaretSquareLeft () {
      return faCaretSquareLeft
    },
    isModalOpen: {
      get () {
        return this.$store.getters.GET_IS_MODAL_OPEN
      },
      set ({ bool }) {
        this.$store.dispatch('RUN_RE_SET_IS_MODAL_OPEN', bool)
      }
    }
  },
  methods: {
    changeSlide (type, index) {
      let updateSlideNum
      if (type === 'next') {
        console.log(this.slideNum)
        if (this.slideList.length - 1 === this.slideNum) { return }
        updateSlideNum = this.slideNum + 1
      } else if (type === 'back') {
        if (this.slideNum === 0) { return }
        updateSlideNum = this.slideNum - 1
      } else {
        updateSlideNum = index
      }
      this.$emit('changeSlide', updateSlideNum)
    }
  },
  components: {
    Heading
  }
}
</script>
<style lang="scss" scoped>
@import './../../../assets/scss/variables';
.footer{
  align-items: center;
  display: flex;
  height: 48px;
  padding: 4px 16px;
  position: relative;
  width: 100%;
  &--alert {
    justify-content: center;
  }
  &--backgroundColor {
    background-color: $dark-sub-color;
  }
  &--welcome {
    justify-content: space-between;
  }
  &_icon {
    font-size: 32px;
  }
  &_btn {
    display: flex;
  }
}
.slideBtn {
  align-items: center;
  border:solid 1px black;
  border-radius: 50%;
  display: inline-flex;
  height: 24px;
  justify-content: center;
  overflow: hidden;
  width: 24px;
  &--active {
    background-color: inherit
  }
  &--backgroundColor {
    background-color: gray;
  }
}

.button--alert {
  background: crimson;
  border-radius: 40px;
  height: 100%;
  width: 240px;
}
</style>

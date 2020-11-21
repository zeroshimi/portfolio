<template>
  <div class="modal" v-show="isModalOpen" @click="isModalOpen=!isModalOpen">
    <div class="modal_main" @click.prevent.stop>
      <MHeader  :isDarkMode="isDarkMode" :type="type"/>
      <MContent :type="type">
        <template v-for="(slide, index) in slideList" :slot="'welcome'" v-show="type === 'welcome'">
          <img :src="slide.path" class="content_slide" :key="index" v-show="index===slideNum"/>
        </template>
        <template :slot="'alert'" v-show="type === 'alert'">
          <div class="alert">
            <fa :icon="faExclamationTriangle" class="alert_icon"/>
            <span>メッセージ</span>
          </div>
        </template>
      </MContent>
      <MFooter :slideNum="slideNum" @changeSlide="changeSlide" :slideList="slideList" :type="type" />
    </div>
  </div>
</template>

<script>
// exclamation-triangle
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import MHeader from './part/modalHeader'
import MFooter from './part/modalFooter'
import MContent from './part/modalContent'
export default {
  props: {
    isDarkMode: {
      type: Boolean,
      required: false,
      default () {
        return true
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
  data () {
    return {
      slideNum: 0,
      slideList: [
        {
          index: 0,
          path: '/images/logo-teal.png'
        },
        {
          index: 1,
          path: '/images/screenshot1.png'
        },
        {
          index: 2,
          path: '/images/screenshot2.png'
        }
      ]
    }
  },
  computed: {
    isModalOpen: {
      get () {
        return this.$store.getters.GET_IS_MODAL_OPEN
      },
      set ({ bool }) {
        this.$store.dispatch('RUN_RE_SET_IS_MODAL_OPEN', bool)
      }
    },
    faExclamationTriangle () {
      return faExclamationTriangle
    }
  },
  components: {
    MHeader,
    MFooter,
    MContent
  },
  methods: {
    changeSlide (Num) {
      this.slideNum = Num
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 500;
  &_main {
    background-color: #ddd;
    border-radius: 16px;
    height: 50%;
    min-width: 540px;
    overflow: hidden;
    width: 50%;
    z-index: 501;
  }
}
.content {
  &_slide {
    height: 100%;
    width: 100%;
  }
}

.alert {
  align-items: center;
  display: flex;
  flex-direction: column;
  &_icon {
    color: red;
    height: 70%;
    width: 70%;
  }
}
</style>

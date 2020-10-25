<template>
  <nav class="footer" :class="{ darkFooterColor:isDarkMode, normalFooterColor:!isDarkMode }">
    <div class="footerContainer">
      <a
        v-for="item in items"
        :key="item.id"
        href="#"
        class="footerBtnContainer"
        @click="_clickFotterButton(item.route, item.name)"
      >
        <FooterBtn :imgName="item.imgName">{{ item.name }}</FooterBtn>
      </a>
    </div>
  </nav>
</template>

<script>
import FooterBtn from './../ui/btn/footerBtn'
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  components: {
    FooterBtn
  },
  methods: {
    _clickFotterButton (route, name) {
      this.$router.push(`/main${route}`)
      this.$store.dispatch('runSetHeaderName', name)
      this.$store.dispatch('runResetMenuBtn', false)
    }
  },
  computed: {
    isDarkMode () {
      return this.$store.getters.getIsDarkMode
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/variables';
.footer {
  border-right: solid 1px;
  height: 100%;
  padding: $Ui-height 0 8px 0;
  width: 30%;
  z-index: 7;
}
.footerContainer {
  align-items: center;
  display:flex;
  flex-direction: column;
  height: 100%;
}
.footerBtnContainer {
  height: 96px;
  width: 100%;
  &:active {
    background-color: #707070;
  }
}

@media (max-width: 767px) {
.footer {
  border-top:solid 1px;
  bottom: 0;
  height: $Ui-height;
  padding: 0;
  position: fixed;
  width: 100%;
  z-index: 7;
}
.footerContainer {
  flex-direction: row;
  justify-content:space-around;
  height: 100%;
}
.footerBtnContainer {
  height: 100%;
  width: 100%;
  &:active {
    background-color: #707070;
  }
}
}
</style>

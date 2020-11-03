<template>
  <section
    style="border:solid 1px;padding:16px;"
    :class="[{
      normalStoredContentBackGroundColor: !isDarkMode && ($device.isDesktop || !isOpenMenu),
      darkStoredContentBackGroundColor: isDarkMode && ($device.isDesktop || !isOpenMenu)
    }]"
  >
    <heading
      class="pastAnalysis_heading"
    >
      過去の作成画像
    </heading>
    <button class="button">
      ダウンロード{{ title }}:{{ index + 1 }}
    </button>
  </section>
</template>

<script>
import heading from './../layouts/headingCaption'
export default {
  props: {
    title: {
      type: String,
      required: false,
      default () {
        return 'default'
      }
    },
    index: {
      type: Number,
      required: false,
      default () {
        return 0
      }
    },
    isDarkMode: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    isOpenMenu: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    }
  },
  components: {
    heading
  }
}
</script>

<style lang="scss" scoped>
.pastAnalysis {
  height: 100%;
  width: 100%;
  &_heading {
    align-items: center;
    display: flex;
    height: 5%;
  }
}
.isOpenNormalMenuBackGround {
  background-color:rgba(0, 0, 0, 0.5);
}

.isOpenDarkMenuBackGround {
  background-color:rgba(255, 255, 255, 0.2);
}
</style>

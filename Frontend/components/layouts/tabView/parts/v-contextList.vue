<template>
  <VContext>
    <li
      class="li"
      :class="{'v-context__sub': item.name === 'add'}"
      v-for="(item, index) in contextMenuList"
      :key="index"
      v-show="!(inVisibleItems.length===0 && item.name==='add')"
    >
      <a
        href="#"
        @click.prevent="_clickUndisplay($event, index, item)"
        class="a"
      >
        {{ item.value }}
      </a>
      <ul class="v-context" v-show="item.name==='add'">
        <li v-for="(hiddenItem, hiddenIndex) in inVisibleItems" :key="hiddenIndex">
          <a @click.prevent="_clickDisplay($event, hiddenItem, hiddenIndex)">
            {{ hiddenItem.headerName }}
          </a>
        </li>
      </ul>
    </li>
  </VContext>
</template>

<script>
import VContext from 'vue-context'
import 'vue-context/src/sass/vue-context.scss'
export default {
  props: {
    inVisibleItems: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      contextMenuList: [
        {
          name: 'option',
          value: 'option1'
        },
        {
          name: 'visible',
          value: '非表示'
        },
        {
          name: 'add',
          value: '追加'
        }
      ]
    }
  },
  methods: {
    _clickUndisplay (event, index, item) {
      this.$emit('_onClick', { index, item })
    },
    _clickDisplay (event, hiddenItem, hiddenIndex) {
      this.$emit('_reShowItems', { hiddenItem, hiddenIndex })
    }
  },
  components: {
    VContext
  }
}
</script>

<style lang="scss" scoped>

</style>

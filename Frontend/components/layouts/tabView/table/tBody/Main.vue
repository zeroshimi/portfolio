<template>
  <tbody class="docList_body" ref="tbody">
    <tr
      v-for="index of 100"
      :key="index"
      class="tr docList_body_row docList_body_row--background"
      :ref="'tr-'+index"
      @click="_focusRow(index)"
    >
      <td
        v-for="(obj,index) in preData"
        :key="index"
        class="td"
        v-show="obj.isShow"
      >
        {{ obj.value }}
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    list: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      focusIndex: 1
    }
  },
  mounted () {
    this.$refs['tr-' + this.focusIndex][0].style.background = 'lightblue'
    // defaultのkeydown event初期化
    window.addEventListener('keydown', (e) => {
      const code = event.keyCode
      switch (code) {
        case 38:
          e.preventDefault()
          this._movePrevious(e)
          // console.log(this.focusIndex)
          break
        case 40:
          e.preventDefault()
          this._moveNext(e)
          // console.log(this.focusIndex)
          break
      }
    })
  },
  computed: {
    preData () {
      const LL = this._reSet(this.list)
      return this._renderingObj(this.headers, LL)
    },
    focusRow () {
      return this.focusIndex
    }
  },
  methods: {
    // 実際にはこの処理いらない
    _reSet (list) {
      const obj = {}
      list.map((element) => {
        obj[element.name] = {
          value: element.title + element.value
        }
      })
      // console.log(obj)
      return obj
    },
    // headersの順番にobjの中身をListに再構築
    _renderingObj (headers, obj) {
      const List = headers.map((element) => {
        return {
          value: obj[element.headerKey].value,
          isShow: element.isShow
        }
      })
      // console.log(List)
      return List
    },
    // 行をfocusする処理
    _focusRow (index) {
      const oldIndex = this.focusIndex
      if (oldIndex !== index) {
        this.$refs['tr-' + index][0].style.background = 'lightblue'
        this.focusIndex = index
        this.$refs['tr-' + oldIndex][0].style.background = ''
      }
    },
    // 十字キーで下に移動する処理
    _moveNext (e) {
      if (this.focusIndex === 100) { return }
      this.$refs['tr-' + this.focusIndex][0].style.background = ''
      this.focusIndex = this.focusIndex + 1
      // セレクタは本番の時に変える
      // console.log(document.getElementById('container').offsetHeight)
      const constainer = document.getElementById('container')
      // 画面に映せてる9割の高さ
      const ninetyPercentaileHeight = constainer.offsetHeight * 0.9
      // console.log(ninetyPercentaileHeight)
      // focusした要素が ninetyPercentaileHeight よりも下にあるか判定
      if (ninetyPercentaileHeight < this.$refs['tr-' + this.focusIndex][0].getBoundingClientRect().y) {
        constainer.scrollBy(0, 24)
      }
      this.$refs['tr-' + this.focusIndex][0].style.background = 'lightblue'
    },
    // 次十字キーで上に移動する処理
    _movePrevious (e) {
      if (this.focusIndex === 1) { return }
      this.$refs['tr-' + this.focusIndex][0].style.background = ''
      this.focusIndex = this.focusIndex - 1
      // セレクタは本番の時に変える
      // console.log(document.getElementById('container').offsetHeight)
      const constainer = document.getElementById('container')
      // 画面に映せてる1割+header部分の高さ
      const tenPercentaileHeight = constainer.offsetHeight - constainer.offsetHeight * 0.9 + 84
      // console.log(tenPercentaileHeight)
      // focusした要素が ninePercentaileHeight よりも下にあるか判定
      if (tenPercentaileHeight > this.$refs['tr-' + this.focusIndex][0].getBoundingClientRect().y) {
        constainer.scrollBy(0, -24)
      }
      this.$refs['tr-' + this.focusIndex][0].style.background = 'lightblue'
    }
  }
}
</script>

<style lang="scss" scoped>
.docList_body_row {
    &--background{
        &:active, &:focus, &:hover {
            background: lightblue;
        }
    }
}
.td {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>

<template>
  <thead class="thead thead--background border--color thead--color">
    <tr
      class="tr"
      ref="tr-firstChild"
    >
      <th
        v-for="(item, index) in headers"
        :key="index"
        class="th th--background fixedHeaderFirstChild"
        :style="`width:${item.width}px;`"
        :ref="'th-'+index"
        v-show="item.isShow"
        @contextmenu.prevent.stop="$refs.menu.$children[0].open($event); _openContextMenu(item, index)"
      >
        <!--配列の順番を変更するためのドラッグアンドドロップのHtmlElement-->
        <span
          class="hcell_main"
          draggable="true"
          :ref="'cell_'+index"
          @dragstart.stop="_dataList($event, index)"
          @drop.stop="_dropList($event, index)"
          @dragover.prevent
          @dragenter.prevent
        >
          {{ (item.headerName==='') ? ' ': item.headerName}}
        </span>
        <!--要素の横幅を変更するためのドラッグアンドドロップのHtmlElement-->
        <button
          :ref="'resize-' + index"
          class="button resizer"
          draggable="true"
          @dragstart.stop="_makeDragggable($event, index)"
          @dragend.stop
          @drop.prevent
          @dragover.prevent
          @dragenter.prevent
        />
      </th>
      <!--コンテキストメニューのHtmlElement-->
      <VContext
        ref="menu"
        :inVisibleItems="inVisibleItems"
        @_onClick="_onClick"
        @_reShowItems="_reShowItems"
      />
    </tr>
    <tr
      ref="tr-secondChild"
      class="tr"
    >
      <th
        class="th th--background fixedHeader"
        v-for="(item, index) in headers"
        :key="index"
        :style="`width: ${item.width}px;`"
        v-show="item.isShow"
      >
        <SearchBox
          v-for="num of item.searchBox"
          :key="num"
          :placeholder="item.placeholder"
          v-show="item.searchBox !== 0"
        />
      </th>
    </tr>
  </thead>
</template>

<script>
import SearchBox from './../../parts/searchBox'
import VContext from './../../parts/v-contextList'
export default {
  data () {
    return {
      dummyList: this.headers,
      thPosition: 0,
      unShowListNum: null,
      deleteListNum: null
    }
  },
  computed: {
    deleteList () {
      const item = this.dummyList.filter((element) => {
        return element.isShow === true
      })
      return item
    }
  },
  props: {
    headers: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    tableHeight: {
      type: Number,
      required: true,
      default: () => {
        return 40
      }
    },
    inVisibleItems: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    }
  },
  mounted () {
    console.log()
    this.thPosition = this.$refs['tr-firstChild'].offsetHeight
    this.$refs['tr-secondChild'].style.setProperty('--firstThHeight', `${this.thPosition}px`)
  },
  updated () {
    // console.log(this.deleteList)
  },
  methods: {
    _openContextMenu (item, index) {
      this.unShowListNum = index
      this.deleteListNum = this.deleteList.indexOf(item)
      console.log(this.unShowListNum)
    },
    _onClick (payload) {
      switch (payload.item.name) {
        case 'option':
          break
        case 'visible':
          this.dummyList[this.unShowListNum].isShow = false
          this.$emit('_addInVisibleItems', { item: this.dummyList[this.unShowListNum] })
          this._checkdiffarency()
          // console.log(this.headers)
          break
        case 'add':
          break
      }
    },
    _reShowItems (payload) {
      // 非表示アイテム意外取り出して再構築
      const item = this.dummyList.filter((element) => {
        return element !== payload.hiddenItem
      })
      // 非表示アイテムを表示
      payload.hiddenItem.isShow = true
      console.log(this.deleteListNum)
      // 非表示アイテムを指定された列に追加
      item.splice(this.deleteListNum, 0, payload.hiddenItem)
      console.log(item)
      this.dummyList = item
      this.$emit('_declineInVisibleItems', { index: payload.hiddenIndex })
      this._checkdiffarency()
    },
    _makeDragggable (e, resizeIndex) {
      // dataTransferのなかに
      e.target.style.setProperty('--tableHeight', `${this.tableHeight}px`)
      e.target.style.setProperty('--visible', 'visible')
      e.target.style.setProperty('--opacity', '1')
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('resize-index', resizeIndex)
      event.dataTransfer.setData('resize-first-position', e.target.getBoundingClientRect().x)
    },
    _dataList (e, dragIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('drag-index', dragIndex)
    },
    _dropList (e, dropIndex) {
      // dataTransferの中のdataを取得
      const dragIndex = event.dataTransfer.getData('drag-index')
      const resizeIndex = event.dataTransfer.getData('resize-index')
      const firstX = event.dataTransfer.getData('resize-first-position')
      if (dragIndex) {
        const deleteList = this.headers.splice(dragIndex, 1)
        this.headers.splice(dropIndex, 0, deleteList[0])
      } else {
        // risizerを移動させた距離を計算
        const shiftX = e.clientX - firstX
        // risizeしたth要素を特定
        const element = this.$refs['th-' + resizeIndex][0]
        // 新しい横幅を設定
        const newPosition = element.offsetWidth + shiftX
        element.setAttribute('style', 'width:' + newPosition + 'px;')
        // resizerの点線を消す
        const resizer = this.$refs['resize-' + resizeIndex][0]
        resizer.style.setProperty('--tableHeight', 'auto')
        resizer.style.setProperty('--visible', 'hidden')
        resizer.style.setProperty('--opacity', '0')
        this.dummyList[resizeIndex].width = newPosition
        this._checkdiffarency()
      }
    },
    _checkdiffarency () {
      if (this.headers !== this.dummyList) {
        this.$emit('_reSetHeader', { newList: this.dummyList })
      }
    }
  },
  components: {
    SearchBox,
    VContext
  }
}
</script>

<style lang="scss" scoped>
.thead {
    height: 80px;
    &--background {
        background: #3333FF;
    }
    &--color {
        color: white;
    }
}
.tr {
    background-color: inherit;
    height: 40px;
    line-height: 40px;
    padding: 0;
    vertical-align: middle;
    &:first-child {
        .th--background {
            background: inherit;
        }
    }
}
.th {
    border:solid 1px black;
    height: 100%;
    min-width: 50px;
    position: relative;
    vertical-align: middle;
    &--background {
        background: #33adff;
    }

}
.fixedHeader {
    &FirstChild {
        position: sticky;
        top: 0;
        position: -webkit-sticky;
        z-index: 1;
    }
    position: sticky;
    top: var(--firstThHeight);
    position: -webkit-sticky;
    z-index: 1;
}
.hcell_main {
    display: block;
    height: 100%;
    min-height:40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: calc(100% - 5px);
}
.resizer {
    background-color: inherit;
    cursor: col-resize;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    width: 5px;
    &:after {
        content: "";
        border: dashed 1px;
        display:  block;
        height: var(--tableHeight);
        opacity: var(--opacity);
        position: absolute;
        top: 0;
        right: 0;
        visibility:var(--visibility);
        z-index: 100;
    }
    &:active {
        background: #a0a0a0;
    }
    &:hover {
        background: #cfcfcf;
    }
    &--isdragging{
        background: inherit;
    }
}
</style>

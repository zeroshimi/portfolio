<template>
  <table id="docList" class="table" ref="docList">
    <tHead
      :headers="headers"
      :tableHeight="tableHeight"
      :inVisibleItems="inVisibleItems"
      @_addInVisibleItems="_addInVisibleItems"
      @_declineInVisibleItems="_declineInVisibleItems"
      @_reSetHeader="_reSetHeader"
    />
    <tBody :headers="headers" :list="list" />
  </table>
</template>

<script>
import tHead from './tHead/Main'
import tBody from './tBody/Main'
export default {
  methods: {
    /* _reMakeHeader (list) {
      const headers = list.map((element) => {
        return {
          headerName: element.title,
          headerKey: element.name,
          isShow: element.isShow,
          placeholder: element.placeholder,
          searchBox: element.searchBox,
          width: 200
        }
      })
      this.headers = headers
    }, */
    _reSetHeader (payload) {
      this.headers = payload.newList
      console.log(this.headers)
    },
    // 実際にはこの処理いらない
    _reSet (list) {
      const obj = {}
      list.map((element) => {
        obj[element.name] = {
          value: element.title + element.value
        }
      })

      return obj
    },
    /* _renderingObj (headers, obj) {
      // console.log(obj)
      const List = headers.map((element) => {
        return {
          value: obj[element.headerKey].value
        }
      })
      // console.log(List)
      return List
    }, */
    // 非表示リストに追加
    _addInVisibleItems (payload) {
      this.inVisibleItems.push(payload.item)
    },
    // 非表示リストから削除
    _declineInVisibleItems (payload) {
      this.inVisibleItems.splice(payload.index, 1)
    }
  },
  computed: {
    /* preData () {
      const LL = this._reSet(this.list)
      return this._renderingObj(this.headers, LL)
    }, */
    computedHeaders () {
      return this.$store.getters.getTableHeaders
    }
  },
  components: {
    tHead,
    tBody
  },
  created () {
    // this._reMakeHeader(this.list)
  },
  mounted () {
    this.tableHeight = this.$refs.docList.offsetHeight
  },
  beforeUpdate () {
  },
  data () {
    return {
      tableHeight: 40,
      headers: [],
      defaultHeaders: this.headers,
      inVisibleItems: []
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
    height:auto;
    table-layout: fixed;
    width: 100%;
}
</style>

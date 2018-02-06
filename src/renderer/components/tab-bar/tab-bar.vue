<style lang="stylus" scoped>
  .tab-bar
    -webkit-app-region drag
    -webkit-user-select: none
    display flex
    width 100%
    height 50px
    background-color rgb(220, 45, 45)
    .logo
      flex 1
      width 150px
      line-height 50px
      margin-left 30px
      .icon-music-
        -webkit-app-region no-drag
        vertical-align top
        display inline-block
        line-height 50px
        font-size 20px
        transition all .7s
        &:hover
          transform rotate(360deg)
      .title
        display inline-block
        vertical-align top
        font-size 18px
        font-weight 600
        color #f1f1f1
    .search
      flex 4
      .search-input
        position relative
        .icon-search, .input
          background rgb(230, 60, 60)
          border 1px solid rgba(7, 17, 27, 0.1)
          line-height 25px
        .icon-search
          -webkit-app-region no-drag
          position absolute
          width 34px
          left 186px
          top 12px
          border-radius 0 15px 15px 0
          font-size 14px
          text-align center
          color #d9d9d9
          &:hover
            box-shadow 0 0 5px rgba(7, 17, 27, 0.1)
            color #f1f1f1
            background-color rgb(210, 50, 50)
        .input
          -webkit-app-region no-drag
          width 185px
          text-indent 1em
          margin-top 12px
          border-radius 15px 0 0 15px
          outline none
          font-size 13px
          color #e9e9e9
          &::placeholder
            color #d1d1d1
          &:hover
            &::placeholder
              color #e9e9e9
      .search-suggest
        padding 10px 0
        width 220px
        background #f1f1f1
        position relative
        top 10px
        z-index 200 
        margin-top 5px
        border-radius 5px
        border-left 1px solid rgba(7, 17, 27, 0.1)
        box-sizing border-box
        box-shadow 5px 5px 5px rgba(7, 17, 27, 0.1)
        transform scale(1)
        transform-origin top left
        &.suggest-leave-active, &.suggest-enter-active
          transition transform .4s, opacity .4s
        &.suggest-leave-to, &.suggest-enter
          transform scale(0)
          opacity 0
        &:before
          content: ''
          position absolute
          left 10px
          top -30px
          border 15px solid #000
          border-color transparent transparent #f1f1f1 transparent
        .tips
          font-size 14px
          padding-left 10px
          line-height 24px
          .user-input
            color #f14545
        .not-suggest
          font-size 14px
          padding-left 10px
          line-height 22px
        .suggest-list
          font-size 0
          .suggest-item
            transition background .3s, box-shadow .1s
            .text
              overflow hidden
              white-space nowrap
              text-overflow ellipsis
              padding 0 10px
              font-size 13px
              color #777
              line-height 24px
              font-weight 600
              &:hover 
                background-color #e1e1e1
              &:active
                box-shadow 0 0 2px rgba(7, 17, 27, 0.2)
      .search-result-wrapper
        position absolute
        top 50px
        bottom 51px
        right 0
        left 0
        z-index 100
        background #e9e9e9
        box-shadow -10px -10px 20px rgba(7, 17, 27, .1) inset
        transform translate3d(0, 0, 0)
        &.result-enter-active, &.result-leave-active
          transition transform .8s, opacity .5s
        &.result-leave-to, &.result-enter
          transform translate3d(-100%, 0, 0)
          opacity 0
    .control
      flex 0 0 180px
      font-size 0
      line-height 50px
      .minimize, .maximize, .close
        float left
        width 50px
        margin-left 10px
        font-size 18px
        i
          -webkit-app-region no-drag
          display inline-block
          margin-left 10px
          transition all .1s
          &:hover
            transform scale(1.2)

</style>

<template>
  <div class="tab-bar">

    <!-- 顶部 logo -->
    <div class="logo">
      <i class="icon-music-"></i>
      <h1 class="title">音乐</h1>
    </div>

    <!-- 搜索区 -->
    <div class="search">
      <!-- 搜索框 -->
      <div class="search-input">

        <i class="icon-search"
           @click="_search(userInput)"
        ></i>

        <input class="input" 
                type="text" 
                @keyup.13="_search(userInput)"
                v-model="userInput"
                placeholder="请输入歌手、歌曲名"
        >
      </div>
      <!-- 搜索建议 -->
      <transition name="suggest">
        <div v-show="userInput" class="search-suggest">

          <div v-show="!notSuggests"
               class="tips"
          >搜索 "<span class="user-input">{{userInput}}</span>" 的结果是:</div>

          <div v-show="notSuggests"
               class="not-suggest"
          >没有找到你想要的结果 :)</div>

          <div class="suggest-list">
            <div class="suggest-item" v-for="suggest in suggests">
              <div class="text" @click="_search(suggest)">{{suggest}}</div>
            </div>
          </div>

        </div>
      </transition>

      <!-- 搜索结果 -->
      <transition name="result">
        <div class="search-result-wrapper" v-if="showSearchResult">
          <search-result :searchResult="searchResult"
                         @close="_hideSearchResult"
          ></search-result>
        </div>
      </transition>

    </div>

    <!-- 最大化、最小化和关闭按纽 -->
    <div class="control">
      <div class="minimize">
        <i class="icon-minimize-" @click="minimizeTheCurrentWindow"></i>
      </div>
      <div class="maximize">
        <i class="icon-maximize-" @click="maximizeTheCurrentWindow"></i>
      </div>
      <div class="close" @click="closeTheWindow">
        <i class="icon-close-"></i>
      </div>
    </div>

  </div>
</template>

<script>
  import {ipcRenderer} from 'electron'
  import {searchSuggest, search} from '@/api/search'
  import SearchResult from '@/components/search-result/search-result'

  export default {
    data () {
      return {
        // 搜索建议
        suggests: [],
        // 用户输入
        userInput: '',
        // 搜索到的数据
        searchResult: null,
        // 显示搜索结果面板
        showSearchResult: false
      }
    },
    methods: {
      // 与主进程通信，实现关闭、最大化、最小化
      minimizeTheCurrentWindow () {
        ipcRenderer.send('window-hide')
      },
      maximizeTheCurrentWindow () {
        ipcRenderer.send('window-maximize')
      },
      closeTheWindow () {
        ipcRenderer.send('window-close')
      },
      // 获取搜索建议
      _getSearchSuggest (word) {
        searchSuggest(word).then((res) => {
          this.suggests = res.suggestion_list
        })
      },
      // 搜索
      _search (word) {
        if (!word) {
          return
        }
        this.userInput = ''
        search(word).then((res) => {
          this.searchResult = res
          // 清空搜索建议， 显示搜索结果
          this.suggests = []
          this.showSearchResult = true
        })
      },
      // 切换搜索结果 显示 隐藏
      _hideSearchResult () {
        this.showSearchResult = false
      }
    },
    computed: {
      // 是否有搜索建议 时 显示的提示类型
      notSuggests () {
        return !this.suggests || (this.suggests.length === 1 && this.suggests[0] === '')
      }
    },
    watch: {
      // 用户输入时自动获取搜索建议
      userInput () {
        this._getSearchSuggest(this.userInput)
      }
    },
    components: {
      SearchResult
    }
  }
</script>



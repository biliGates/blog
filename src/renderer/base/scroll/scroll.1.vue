<style lang="stylus" scoped>
  .scroll-wrapper
    position relative
    overflow hidden
    height 100%
    .scroll
      position absolute
      width 100%
    .scroll-bar
      position absolute
      top 0
      right 0
      border-radius 4px
      background #e1e1e1
      transition background .3s, height .8s
      &:hover
        background #d1d1d1
</style>

<template>
  <div class="scroll-wrapper" ref="wrapper" @mousewheel="onMouseWheel">
    <div ref="scroll" class="scroll" :style="ScrollTop">
      <slot></slot>
    </div>
    <div class="scroll-bar"
         ref="scrollBar" 
         :style="ScrollBarSize"
         @mousedown.prevent="_scrolling"
    ></div>
  </div>
</template>

<script>
  export default {
    props: {
      scrollBarWidth: {
        type: Number,
        default: 10
      }
    },
    data () {
      return {
        tipsFlag: false,
        scrollHeight: 0,
        wrapperHeight: 0,
        wrapperOldHeight: 0,
        top: 0,
        width: 0
      }
    },
    mounted () {
      // 首次进入时刷新
      this.$nextTick(() => {
        this._getHeight()
      })
    },
    // 页面激活时监听resize事件
    activated () {
      this.refresh()
      window.addEventListener('resize', this._resize)
    },
    // 页面失焦时移除reseze事件
    deactivated () {
      window.removeEventListener('resize', this._resize)
    },
    methods: {
      // 刷新滚动
      refresh () {
        this._getHeight()
      },
      // 重置滚动高度
      refreshTop () {
        this.top = 0
      },
      // 歌词界面用的自动滚动效果
      topTo (top) {
        this.top = top
      },
      // 监听resize事件
      _resize () {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.wrapperOldHeight = this.wrapperHeight
          this.refresh()
          this.top = this.top / this.wrapperOldHeight * this.wrapperHeight
        }, 500)
      },
      // 鼠标拖动事件
      _scrolling (e) {
        /* eslint-disable */
        let startY,
            movingY,
            surplusH,
            top,
            scrollBarTop = this.top
        startY = e.pageY
        surplusH = this.wrapperHeight - this.$refs.scrollBar.clientHeight

        let moveStart = e => {
          movingY = e.pageY
          top = scrollBarTop + movingY - startY
          if (top > surplusH || top < 0) {
            return
          }
          this.top = (top > surplusH || top <= 0)
            ? (top > surplusH ? surplusH : 0)
            : top   
        }
        let moveEnd = () => {
          document.removeEventListener('mousemove', moveStart)
          document.removeEventListener('mouseup', moveEnd)
        }
        document.addEventListener('mousemove', moveStart)
        document.addEventListener('mouseup', moveEnd)

      },
      // 获取高度
      _getHeight () {
        this.scrollHeight = this.$refs.scroll.clientHeight
        this.wrapperHeight = this.$refs.wrapper.clientHeight
      },
      // 鼠标滚轮事件
      onMouseWheel (e) {
        if (this.scrollHeight < this.wrapperHeight) {
          return
        }
        const STEP = 15
        const DOWN = 150
        let surplusH = this.wrapperHeight - this.$refs.scrollBar.clientHeight
        let top = this.top + STEP
        this.top = e.wheelDelta !== DOWN
          ? (top > surplusH ? surplusH : top)
          : (this.top - STEP <= 0 ? 0 : this.top -STEP)
      }
    },
    computed: {
      // 计算滚动条的top值
      ScrollBarSize () {
        /* eslint-disable */
        let viewH = this.wrapperHeight,
            fullH = this.scrollHeight
        return {
          width: `${this.scrollBarWidth}px`,
          height: fullH > viewH ? `${viewH * viewH / fullH}px` : 0,
          top: `${this.top}px`
        }
      },
      // 计算滚动区的top值
      ScrollTop () {
        return `top: ${-this.top / this.wrapperHeight * this.scrollHeight}px`
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .scroll-wrapper
    position relative
    overflow hidden
    height 100%
    &.transition
      .scroll, .scroll-bar
        transition all .5s
      .scroll-bar
        &:hover 
          transition background .3s
    .scroll
      position absolute
      width 100%
      transition all .2s
      top 0
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
  <div class="scroll-wrapper" 
       :class="{'transition': transition}" 
       ref="wrapper" 
       @mousewheel="onMouseWheel"
  >
    <div ref="scroll" class="scroll" :style="ScrollTop">
      <slot></slot>
    </div>
    <div class="scroll-bar"
         ref="scrollBar" 
         :style="ScrollBarSize"
         @mousedown.prevent="_scrolling"
    ></div>
    <slot name="loading"></slot>
  </div>
</template>

<script>
  const DOWN = 150 // 移动方向
  const STEP = 100 // 滚轮一格移动距离 单位PX

  export default {
    props: {
      scrollBarWidth: {
        type: Number,
        default: 10
      },
      // 歌词滚动界面需要的过渡效果
      transition: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        tipsFlag: false,
        scrollHeight: 0,
        wrapperHeight: 0,
        top: 0,
        width: 0
      }
    },
    updated () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this._getHeight()
      }, 20)
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
      // 对外提供 的 刷新高度方法
      refresh () {
        this._getHeight()
      },
      // 对外提供 的 滚动到指定高度方法 值必须小于1 大于0
      topTo (top) {
        if (top > 1 || top < 0) {
          return
        }
        this.top = top
      },
      // 监听resize事件
      _resize () {
        clearTimeout(this.timer1)
        this.timer1 = setTimeout(() => {
          this.refresh()
        }, 500)
      },
      // 获取高度
      _getHeight () {
        if (this.$refs.scroll) {
          this.scrollHeight = this.$refs.scroll.clientHeight
          this.wrapperHeight = this.$refs.wrapper.clientHeight
        }
      },
      // 鼠标拖动事件
      _scrolling (e) {
        let startY = e.pageY
        let movingY = 0
        let _viewH = this.wrapperHeight
        let _top = this.top
        this.onScroll()
        let moveStart = (e) => {
          movingY = e.pageY
          let step = (movingY - startY) / (_viewH - this.$refs.scrollBar.clientHeight)
          this.top = movingY > startY
            ? (_top + step > 1 ? 1 : _top + step)
            : (_top + step < 0 ? 0 : _top + step)
        }
        let moveEnd = () => {
          this.scrollEnd()
          document.removeEventListener('mousemove', moveStart)
          document.removeEventListener('mouseup', moveEnd)
        }
        document.addEventListener('mousemove', moveStart)
        document.addEventListener('mouseup', moveEnd)
      },
      // 鼠标滚轮事件函数
      onMouseWheel (e) {
        let _fullH = this.scrollHeight
        let _top = this.top
        let step = STEP / _fullH
        this.onScroll()
        // 没有可滚动距离时退出
        if (this.scrollHeight < _fullH) {
          return
        }
        this.top = _top <= 1 && _top >= 0
          ? (e.wheelDelta !== DOWN ? _top += step : _top -= step)
          : (_top > 1 ? 1 : 0)
        this.scrollEnd()
      },
      // player组件中用到
      onScroll () {
        this.$emit('onScroll')
      },
      scrollEnd () {
        clearTimeout(this.timer2)
        this.timer2 = setTimeout(() => {
          this.$emit('scrollEnd')
        }, 4000)
      }
    },
    // 跟据 top 计算滚动条的位置 和 滚动区的位置，并验证是否为合法的数，传人的 top 值为百分比数
    computed: {
      // 计算滚动条的top值
      ScrollBarSize () {
        /* eslint-disable */
        let _viewH = this.wrapperHeight
        let _fullH = this.scrollHeight
        let _top = this.top
        let height = _fullH > _viewH ? _viewH / _fullH : 0
        if (_top > 1) {
          _top = 1
        }
        if (_top < 0) {
          _top = 0
        }
        return {
          width: `${this.scrollBarWidth}px`,
          height: `${height * _viewH}px`,
          // 总高度减去滚动条的高度 再乘以 top 值
          top: `${(_viewH - (height * _viewH)) * _top}px`
        }
      },
      // 计算滚动区的top值
      ScrollTop () {
        let _top = this.top
        if (_top > 1) {
          _top = 1
        }
        if (_top < 0) {
          _top = 0
        }
        let top = (this.scrollHeight - this.wrapperHeight) * _top
        return {
          top: `-${top}px`
        }
      }
    }
  }
</script>

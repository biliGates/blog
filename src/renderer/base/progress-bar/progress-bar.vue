<style lang="stylus" scoped>
  .progress-bar
    height 100%
    display flex
    .start-time, .end-time
      flex 0 0 40px
      width 30px
      font-size 13px
      color #999
      margin-top -1px
    .start-time
      text-align left 
    .end-time
      text-align right
    .bar
      margin 2px 4px
      flex 1
      border-radius 3px
      height 6px
      box-shadow 0 0 2px rgba(7, 17, 27, 0.1)
      background #d1d1d1
      .progress
        width 0%
        height 6px
        background rgb(220, 45, 45)
        border-radius 3px
        position relative
        .progress-ball
          text-align center
          position absolute
          right -6px
          top -4px
          width 12px
          height 12px
          border 1px solid rgba(7, 17, 27, 0.1)
          border-radius 50%
          background #ffffff
          box-shadow 0 0 2px rgba(7, 17, 27, 0.1)
          transition box-shadow 0.2s
          &:hover
            box-shadow 0 0 10px rgba(7, 17, 27, 0.5)
      &.hide-ball
        .progress-ball
          opacity 0
          transition opacity 1s 3s, box-shadow 0.2s
        &:hover
          .progress-ball
            transition opacity .3s, box-shadow 0.2s
            opacity 1
</style>

<template>
  <div class="progress-bar">
    <div class="start-time" v-if="needTimer">{{playTime}}</div>

    <div class="bar" 
         :class="{'hide-ball': hideBall}" 
         ref="progressBar" 
         @mousedown="_progressBallMove"
    >
      <div class="progress" :style="{'width': progressWidth}">
        <div class="progress-ball"></div>
      </div>
    </div>

    <div class="end-time" v-if="needTimer">{{allTime}}</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        moveTo: null
      }
    },
    props: {
      needTimer: {
        type: Boolean,
        default: false
      },
      progressBarTo: {
        type: Number,
        default: 0
      },
      playTime: {
        type: String,
        default: '00:00'
      },
      allTime: {
        type: String,
        default: '00:00'
      },
      hideBall: {
        type: Boolean,
        default: false
      }
    },
    created () {
    },
    mounted () {
      this.$nextTick(() => {
        this._initProgress()
        this._moveTo()
      })
    },
    methods: {
      _initProgress () {
        /* 保存需要用到的总宽度 */
        this.allWidth = this.$refs.progressBar.clientWidth
      },
      _progressBallMove (e) {
        /* 父级右边距 */
        this.$emit('progressOnClick')
        let offsetLeft = this.$refs.progressBar.offsetLeft
        /* 鼠标单次点击也应有效 */
        this.moveTo = this._computedUpper(e.clientX - offsetLeft, this.allWidth, 0)
        let progressBarMove = (e) => {
          this.moveTo = this._computedUpper(e.clientX - offsetLeft, this.allWidth, 0)
        }
        let progressBarUp = () => {
          /* 移除事件 */
          document.removeEventListener('mousemove', progressBarMove)
          document.removeEventListener('mouseup', progressBarUp)
          /* 向父组件广播，传递参数为移动距离的百分比 */
          this.$emit('moveEnd', Math.floor(this.moveTo / this.allWidth * 100))
        }
        /* 绑定事件 */
        document.addEventListener('mousemove', progressBarMove, false)
        document.addEventListener('mouseup', progressBarUp, false)
      },
      /* 解析父级传递过来的百分比参数 */
      _moveTo () {
        this.moveTo = this.progressBarTo / 100 * this.allWidth
      },
      /* 判断移动距离的上下限 */
      _computedUpper (moveDistance, upper, floor) {
        return (moveDistance > upper || moveDistance < floor
          ? (moveDistance > upper ? upper : floor)
          : moveDistance)
      }
    },
    watch: {
      progressBarTo () {
        this._moveTo()
      }
    },
    computed: {
      progressWidth () {
        return `${this.moveTo}px`
      }
    }
  }
</script>

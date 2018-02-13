<style lang="stylus" scoped>
  .progress-bar
    height 100%
    display flex
    .start-time, .end-time
      flex 0 0 40px
      width 30px
      font-size 13px
      color #999
      margin-top 5px
    .start-time
      text-align left 
      margin-right 10px
    .end-time
      text-align right
      margin-left 10px
    .bar-wrapper
      flex 1
      margin-top 3px
      height 16px
      .bar
        border-radius 3px
        margin-top 5px
        height 6px
        box-shadow 0 0 2px rgba(7, 17, 27, 0.1)
        background #d1d1d1
        transition all .5s
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
    <div class="start-time" v-if="needTimer">{{formatPlayTime}}</div>
    <div class="bar-wrapper" @mousedown="_progressBallMove">
      <div class="bar" ref="progressBar" :class="{'hide-ball': hideBall}">
        <div class="progress" :style="{'width': progressWidth}">
          <div class="progress-ball"></div>
        </div>
      </div>
    </div>
    <div class="end-time" v-if="needTimer">{{formatAllTime}}</div>
  </div>
</template>

<script>
  import {getTime} from '@/common/js/utils'

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
        default: 0
      },
      allTime: {
        default: 0
      },
      hideBall: {
        type: Boolean,
        default: false
      }
    },
    created () {
      window.addEventListener('resize', () => {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.initProgress()
        }, 100)
      })
    },
    mounted () {
      this.$nextTick(() => {
        this.initProgress()
        this._moveTo()
      })
    },
    methods: {
      initProgress () {
        this.allWidth = this.$refs.progressBar.clientWidth
      },
      _progressBallMove (e) {
        this.$emit('progressOnClick')
        // 父级右边距
        let offsetLeft = this.$refs.progressBar.offsetLeft
        // 鼠标单次点击也应有效
        let moveDistance = (e.clientX - offsetLeft) / this.allWidth * 100
        this.moveTo = this._computedUpper(moveDistance, 100, 0)
        let progressBarMove = (e) => {
          let moveDistance = (e.clientX - offsetLeft) / this.allWidth * 100
          this.moveTo = this._computedUpper(moveDistance, 100, 0)
        }
        let progressBarUp = () => {
          // 移除事件
          document.removeEventListener('mousemove', progressBarMove)
          document.removeEventListener('mouseup', progressBarUp)
          /* 向父组件广播，传递参数为移动距离的百分比 */
          this.$emit('moveEnd', this.moveTo)
        }
        // 绑定事件
        document.addEventListener('mousemove', progressBarMove, false)
        document.addEventListener('mouseup', progressBarUp, false)
      },
      // 对父级传过来的参数进行上下限处理
      _moveTo () {
        this.moveTo = this._computedUpper(this.progressBarTo, 100, 0)
      },
      // 判断移动距离的上下限
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
        return `${this.moveTo}%`
      },
      formatAllTime () {
        return getTime(this.allTime)
      },
      formatPlayTime () {
        return getTime(this.playTime)
      }
    }
  }
</script>

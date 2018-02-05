<style lang="stylus" scoped>
  // 动画
  @keyframes childMax2
    100%
      margin-left -200%
      transform rotateY(30deg) scale(.75)
  @keyframes childMax3
    100%
      margin-left -110%
      transform rotateY(15deg) scale(.85)
  @keyframes childMax5
    100%
      margin-left 110%
      transform rotateY(-15deg) scale(.85)
  @keyframes child2
    100% 
      margin-left  -130%
      transform rotateY(30deg) scale(.75)
  @keyframes child3
    100%
      margin-left -70%
      transform rotateY(15deg) scale(.85)
  @keyframes child4
    100%
      margin-left 0
      transform none
  @keyframes child5
    100%
      margin-left 70%
      transform rotateY(-15deg) scale(.85)
  .slider
    position relative
    .img-list
      width 200px
      height 200px
      margin 0 auto
      transform-style preserve-3d
      // 执行动画
      &.run
        &:hover
          div
            animation-play-state paused
            &.ch1
              opacity 1
            &:hover
              span
                height 30px
        .ch1
          transition opacity 500ms
          opacity 0
        .ch2
          animation child2 500ms forwards
        .ch3
          animation child3 1100ms 300ms forwards
        .ch4
          animation child4 1300ms 800ms forwards
        .ch5
          animation child5 1500ms 1100ms forwards
        .ch6
          transition opacity 500ms 1300ms
          opacity 1
          .img
            -webkit-box-reflect below 2px linear-gradient(transparent 70%,rgba(0,0,0,0.2))
      div
        position absolute
        width 200px
        .img
          width 200px
          height 200px
        .name
          position absolute
          bottom 2px
          font-size 16px
          line-height 30px
          width 100%
          text-align center
          color #eee
          overflow hidden
          span
            transition height .5s
            display block
            height 0

          background rgba(7, 17, 27, 0.2)
      // 倒影
      .ch1, .ch2, .ch3, .ch4, .ch5
        .img
          -webkit-box-reflect below 2px linear-gradient(transparent 70%,rgba(0,0,0,0.2))
      // 无动画状态
      .ch1
        margin-left -130%
        transform rotateY(30deg) scale(.75)
        z-index 10
        opacity 1
      .ch2
        margin-left -70%
        z-index 10
        transform rotateY(15deg) scale(.85)
      .ch3
        margin-left 0
        transform none
        z-index 15
      .ch4
        margin-left 70%
        transform rotateY(-15deg) scale(.85)
      .ch5
        margin-left 130%
        z-index 10
        transform rotateY(-30deg) scale(.75)
      .ch6
        z-index 5
        transform rotateY(-30deg) scale(.75)
        margin-left 130%
        opacity 0
       // 屏幕检测
      @media only screen and (min-width: 1300px)
        .ch1
          margin-left -200%
        .ch2
          margin-left -110%
        .ch3
          margin 0
        .ch4
          margin-left 110%
        .ch5
          margin-left 200%
        .ch6
          margin-left 200%
        &.run
          .ch2
            animation childMax2 1000ms forwards
          .ch3
            animation childMax3 1200ms 300ms forwards
          .ch5
            animation childMax5 1600ms 1100ms forwards

</style>

<template>
  <div class="slider" v-if="_imgs">
    <div class="img-list":class="{'run': run}">
      <div v-for="i in 6"
           :class="'ch' + i"
           @click="sliderOnClick(_imgs[i].data)"
           ref="sliderChild"
      >
        <img :src="_imgs[i].img" :data="i" class="img">
        <p class="name"><span>{{_imgs[i].name}}</span></p>
      </div>
    </div>
  </div>  
</template>

<script>
  export default {
    data () {
      return {
        _imgs: null,
        run: false
      }
    },
    props: {
      imgs: {
        type: Array,
        require: true
      }
    },
    created () {
      this._imgs = this.imgs
    },
    // 首次进入
    mounted () {
      this.$nextTick(() => {
        setTimeout(() => {
          this._startAnimated()
        }, 2000)
      })
    },
    // 页面激活
    activated () {
      this._startAnimated()
    },
    // 离开页面
    deactivated () {
      this._stopAnimated()
    },
    methods: {
      sliderOnClick (data) {
        this.$emit('sliderOnClick', data)
      },
      // 开始动画
      _startAnimated () {
        this.run = true
        this.$refs.sliderChild[4].addEventListener('animationend', this._autoPlay)
      },
      // 暂停动画
      _stopAnimated () {
        this.run = false
        this.$refs.sliderChild[4].removeEventListener('animationend', this._autoPlay)
      },
      // 切换class实现动画
      _autoPlay () {
        this.run = false
        this._imgs.push(this._imgs.shift())
        setTimeout(() => {
          this.run = true
        }, 2000)
      }
    },
    computed: {
    }
  }
</script>

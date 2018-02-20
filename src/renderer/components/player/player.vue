<style lang="stylus">
  .player
      em 
        font-weight normal
    .song-name
      em
        color #444
        font-weight 700
    .singer
      em
        color #777
    .album
      em
        color #555
</style>


<style lang="stylus" scoped>

  @keyframes rotation
    0%
      transform rotate(0deg)
    100%
      transform rotate(360deg)
  .player
    position fixed
    top 50px
    bottom 51px
    left 0
    right 0
    transform scale(1)
    transform-origin 0 100%
    background #f1f1f1
    overflow hidden
    z-index 100
    &.player-leave-active
      transition transform .4s, opacity .4s
    &.player-enter-active
      transition transform .6s, opacity .4s
    &.player-leave-to, &.player-enter
      transform scale(0)
      opacity 0
    .blur-bg
      position absolute
      width 100%
      height 500px
      background-repeat no-repeat
      background-position 0 0
      background-size 100% 100%
      filter blur(50px) opacity(.5)
    .close-button
      top 40px
    .player-wrapper
      position relative
      margin 0 auto
      display flex
      width 1000px
      .album-info
        flex 3
        .album-pic
          position relative
          overflow hidden
          .brush
            position absolute
            top 0
            left 200px
            transform-origin top left
            transform rotate(-20deg)
            transition all .3s 0s
            .brush-pic
              width 100px
              height 130px
          .bg
            margin 60px auto 100px auto
            width 279px
            height 279px
            border-radius 50%
            border 6px solid rgba(100, 100, 100, 0.2)
            box-shadow 0 0 4px rgba(100, 100, 100, 0.2)
            background url("./disc.png") no-repeat -11px -11px / 301px 301px
            animation rotation 20000ms linear both infinite
            animation-play-state paused
            .pic
              display block 
              margin 45px auto
              border-radius 50%
              width 188px
              height 188px
          &.rotate
            .brush
              transform rotate(0deg)
            .bg
              animation-play-state running
        .control
          width 300px
          margin 0 auto
          font-size 0
          padding 0 70px
          box-sizing border-box
          .favorite
            .star
              color #f14545
          .favorite, .share
            display inline-block
            box-sizing border-box
            width 50px
            height 22px
            margin 15px
            padding-left 4px
            line-height 23px
            font-size 12px
            font-weight 600
            border-radius 2px
            transition all .3s
            background rgba(7, 17, 27, 0.2)
            color #e9e9e9
            &:hover
              box-shadow 0 0 20px rgba(7, 17, 27, 0.1) inset
              color #fff
            &:active
              transform scale(1.1)
              
      .song-info
        flex 4
        .song-wrapper
          padding 20px 50px 0 60px
          .song-name
            margin-top 20px
            .text
              font-size 22px
              color #444
              font-weight 700
          .singer-info
            margin-top 14px
            .singer, .album
              font-size 12px
              line-height 16px
              .title
                color #777
              .text
                color #555
          .lrcs, .no-lrc
            margin-top 40px
            width 460px
            height 316px
            border-right 1px solid rgba(7, 17, 27, .1)
            color #333
          .lrcs
            height 330px
            width 460px
            .lrcs-wrapper
              font-size 0
              margin 150px 0 150px 0
              .song-info
                margin-bottom 30px
                div
                  height 30px
                  font-size 14px
                  line-height 30px
              .lrc
                font-size 16px
                height 36px
                line-height 36px
                width 100%
                &.active
                  transition all .5s
                  font-size 18px
                  color rgba(220, 45, 45, 0.9)
                  font-weight 700
</style>

<template>
   <transition name="player">
    <div v-show="showPlayer" class="player">
      <!-- 背景 -->
      <div class="blur-bg" 
           :style="{'backgroundImage': `linear-gradient(to bottom,rgba(0,0,0,0),rgba(255, 255, 255, 0.5)),url(${songInfo.album_500_500 || songInfo.pic_big})`}"
      ></div>
      
      <div class="player-wrapper">
        <div class="album-info">
          <!-- 专辑封面 -->
          <div class="album-pic" :class="{'rotate' : albumRotate}">
            <div class="bg">
              <img class ="pic" :src="songInfo.album_500_500 || songInfo.pic_big">
            </div>
            <div class="brush">
              <img class="brush-pic" src="./needle.png">
            </div>
          </div>
          <!-- 操作按钮 -->
          <div class="control">
            <div class="favorite" @click="favorite">
              <i class="icon-star" :class="{'star' : favorited}"></i>
              收藏
            </div>
            <div class="share">
              <i class="icon-share-"></i>
              分享
            </div>
          </div>

        </div>

        <div class="song-info">
          <!-- 歌曲信息 -->
          <div class="song-wrapper">
            <div class="song-name">
              <h2 class="text">{{songInfo.title}}</h2>
            </div>
            <div class="singer-info player-">
              <div class="singer">
                <span class="title">歌手：</span><span class="text">{{songInfo.author}}</span>
              </div>
              <div class="album">
                <span class="title">专辑：</span><span class="text">{{songInfo.album_title}}</span>
              </div>
            </div>
            <!-- 歌词 -->
            <div class="lrcs" v-if="lrc !== null">
              <scroll ref="scroll" 
                      :transition="true" 
                      @scrollEnd="_scrollEnd"
                      @onScroll="_onScroll"
              >
                <ul v-show="lrc" class="lrcs-wrapper" ref="lrcWrapper">
                  <li class="song-info" ref="info">
                    <div  v-for="info in lrc.info">{{info}}</div>
                  </li>
                  <li class="lrc"
                      ref="lrcs"
                      v-for="(key, index) in lrc.keys" 
                      :class="{'active': index == highLightLrc}"
                  >{{lrc.lrcs[key]}}</li>
                </ul>
              </scroll>
            </div>
            <!-- 没有歌词显示 -->
            <div v-else class="no-lrc">暂无歌词</div>

          </div>
          <close-button @close="_hidePlayer" class="close-button"></close-button>
        </div>
      </div>
    </div>
   </transition>
</template>

<script>
  import CloseButton from '@/base/close-button/close-button'
  import Scroll from '@/base/scroll/scroll'
  import lrc from '@/common/js/lrc'
  import {getLrc} from '@/api/song'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import favorite from '@/common/js/favorite'

  export default {
    data () {
      return {
        lrc: null,
        onScroll: false,
        showLrc: false,
        albumRotate: false,
        highLightLrc: -1
      }
    },
    props: {
      songInfo: {
        type: Object,
        default: {}
      },
      timer: {
        default: 0
      }
    },
    created () {
      this._getLrc(this.songInfo)
    },
    updated () {
      this.$refs.scroll && this.$refs.scroll.refresh()
      this.playing && this._albumRotate(false)
    },
    methods: {
      favorite () {
        this.setFavoriteSongList(this.songInfo)
      },
      _activeLrc () {
        let keys = this.lrc.keys
        let playingTime = this.timer
        keys.forEach((now, i) => {
          let next = keys[i + 1]
          if (now <= playingTime && next && next > playingTime) {
            this._moveTo(i)
            this.highLightLrc = i
            return false
          }
        })
      },
      // 歌词滚动算法
      _moveTo (activeLrc) {
        // 当滚动中和已经添加了active class 时不需要滚动
        if (this.activeLrc === activeLrc || this.onScroll) {
          return
        }
        this.activeLrc = activeLrc
        // 计算当前歌词相对于总歌词的百分比
        this.$refs.scroll && this.$refs.scroll.topTo((this.$refs.lrcs[activeLrc].offsetTop - 120) / (this.$refs.lrcs[this.$refs.lrcs.length - 1].offsetTop - this.$refs.info.clientHeight - 30))
      },
      _onScroll () {
        this.onScroll = true
      },
      _scrollEnd () {
        this.onScroll = false
      },
      // 隐藏播放器
      _hidePlayer () {
        this.TOGGLE_PLAYER()
      },
      _getLrc (data) {
        getLrc(data.song_id).then((res) => {
          this.lrc = res.lrcContent ? lrc(res.lrcContent) : null
          this.$refs.scroll && this.$refs.scroll.topTo(0)
        })
      },
      _albumRotate (flag) {
        if (this.albumRotate || flag) {
          setTimeout(() => {
            this.albumRotate = false
          }, 800)
        } else {
          this.albumRotate = true
        }
      },
      ...mapMutations([
        'TOGGLE_PLAYER',
        'PLAYING'
      ]),
      ...mapActions([
        'setFavoriteSongList'
      ])
    },
    computed: {
      ...mapGetters([
        'showPlayer',
        'playing',
        'favoriteSongList'
      ]),
      favorited () {
        return favorite(this.favoriteSongList, this.songInfo)
      }
    },
    watch: {
      playing () {
        this._albumRotate()
      },
      songInfo (data) {
        this._getLrc(data)
      },
      showPlayer (date) {
        this.showLrc = date
      },
      timer () {
        this.showLrc && this.lrc && this._activeLrc()
      }
    },
    components: {
      CloseButton,
      Scroll
    }
  }
</script>

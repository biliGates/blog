<style lang="stylus" scoped>
  .mini-player
    position absolute
    height 50px
    width 200px
    top -50px
    border-top 1px solid rgba(7, 17, 27, 0.1)
    z-index 20
    .song-pic, .song-info
      float left
    .song-pic
      height 40px
      width 40px
      margin 5px 0 0 5px
      border-radius 2px
      img
        width 40px
        height 40px
    .song-info
      padding 8px 0 0 6px
      width 120px
      height 50px
      font-size 12px
      box-sizing border-box
      .song-name, .singer
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
      .song-name
        color #999
        line-height 18px
        font-weight 700
      .singer
        font-size 10px
        line-height 18px
        font-weight 600
        color #aaa
    .favorite
      float right 
      width 30px
      .icon-star
        font-size 22px
        line-height 50px
        color #ddd
        transition color .3s
        &.star
          color #f14545
        &:hover
          color rgb(220, 45, 45)
</style>

<template>
  <div class="mini-player" v-if="songInfo">

    <div @click="_showPlayer">

      <div class="song-pic">
        <img :src="songInfo.album_500_500 || songInfo.pic_big">
      </div>

      <div class="song-info">
        <h2 class="song-name">{{songInfo.title}}</h2>
        <p class="singer">{{songInfo.author}}</p>
      </div>

      <div class="favorite">
        <i class="icon-star" :class="{'star' : favorited}" @click.stop="favorite"></i>
      </div>

    </div>

    <player :timer="timer" :songInfo="songInfo"></player>

  </div>
</template>

<script>
  import Player from '@/components/player/player'
  import favorite from '@/common/js/favorite'
  import {mapActions, mapMutations, mapGetters} from 'vuex'

  export default {
    props: {
      songInfo: {
        type: Object,
        default: {}
      },
      timer: {
      }
    },
    methods: {
      favorite () {
        this.setFavoriteSongList(this.songInfo)
      },
      // 控制播放器显示隐藏
      _showPlayer () {
        this.TOGGLE_PLAYER()
      },
      ...mapActions([
        'setFavoriteSongList'
      ]),
      ...mapMutations([
        'TOGGLE_PLAYER'
      ])
    },
    computed: {
      ...mapGetters([
        'favoriteSongList'
      ]),
      favorited () {
        return favorite(this.favoriteSongList, this.songInfo)
      }
    },
    watch: {
      songLrc (a) {
        console.log(a)
      }
    },
    components: {
      Player
    }
  }
</script>

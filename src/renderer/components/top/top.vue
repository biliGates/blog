<style lang="stylus" scoped>
  .top
    width 100%
    height 100%
    margin-right 20px
    .top-list
      .top-item
        display inline-block
        vertical-align top
        width 33.3%
        @media only screen and (min-width: 1200px)
          width 25%
        .info 
          margin 20px 20px
          border 1px solid rgba(7, 17, 27, 0.1)
          border-radius 0 10px 10px 10px
          overflow hidden
          transition all .3s
          &:hover
            transform translateZ(0) scale(1.0, 1.0)
            box-shadow 5px 5px 5px rgba(7, 17, 27, 0.1)
          .header
            overflow hidden
            height 100px
            .top-pic
              width 100%
              height 100px
              margin-top -10px
            @media only screen and (min-width: 1200px)
              height 120px
              .top-pic
                margin-top -20px
                width 100%
                height 120px
          .songs
            .song-list
              padding 4px 0
              .song-item
                display flex
                &:nth-child(odd)
                  background rgba(180, 190, 200, 0.1)
                &:hover
                  background #d9d9d9
                .song-info
                  padding 4px 6px
                  overflow hidden
                  width 100%
                  font-size 0
                  .song-name, .singer
                    display inline-block
                    overflow hidden
                    white-space nowrap
                    text-overflow ellipsis
                    color #999
                    font-weight 600
                  .song-name
                    width 70%
                    font-size 12px
                    line-height 20px
                  .singer
                    width 30%
                    font-size 10px
                    line-height 20px
                    text-align right
            .more
              font-size 12px   
              text-align right       
              background rgba(180, 190, 200, 0.1)
              line-height 30px
              color #888
              transition color .3s
              .right-icon
                display inline-block
                vertical-align top
                margin -2px 4px 0 0
              &:hover
                color #333
                font-weight 600
    .show-more
      .top-desc
        font-size 0
        padding-bottom 30px
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        display flex
        .top-pic
          flex 0 
        .info
          flex 1
          vertical-align top
          margin-left 40px 
          .top-name
            font-weight 700
            font-size 20px
            margin-top 10px
          .update-time
            font-size 12px
            margin-top 10px
          .control
            margin 20px 0
            height 30px
          .desc            
            margin-top 30px
            font-size 14px
</style>

<template>
  <div class="top">
    <scroll ref="scroll">
      <!-- 主页显示的排行榜和歌曲 -->
      <div class="top-type" v-if="!showMore && tops.length">
        <ul class="top-list">

          <li class="top-item" v-for="top in tops">
            <div class="info">

              <div class="header" @click="_showMoreList(top)">
                <img class="top-pic" :src="top.billboard.pic_s444">
              </div>

              <div class="songs">
                <ul class="song-list">
                  <li class="song-item" v-for="song in _songs(top.song_list)">
                    <div class="song-info" @click="play(song)">
                      <h2 class="song-name">{{song.title}}</h2>
                      <p class="singer">{{song.author}}</p>
                    </div>
                  </li>
                </ul>

                <div class="more" @click="_showMoreList(top)"><span>查看全部</span> <span class="right-icon">»</span></div>

              </div>
            </div>
          </li>

        </ul>
      </div>
      <!-- 详细的排行榜信息 -->
      <div class="show-more" v-if="showMore">
        
        <div class="top-desc">
          <div class="top-pic">
            <img :src="showList.billboard.pic_s192" width="200">
          </div>
          <div class="info">
            <div class="top-name">{{showList.billboard.name}}</div>
            <div class="update-time">{{showList.billboard.update_date}}</div>
            <div class="control"></div>
            <div class="desc">简介：{{showList.billboard.comment}}</div>
          </div>
        </div>

        <div class="song-list">
          <song-list :songList="showList.song_list"></song-list>
        </div>
        <close-button @close="_showMoreList"></close-button>
      </div>
      <loading slot="loading" v-show="!tops.length"></loading>
    </scroll>
  </div>  
</template>

<script>
  import Scroll from '@/base/scroll/scroll'
  import SongList from '@/base/song-list/song-list'
  import CloseButton from '@/base/close-button/close-button'
  import Loading from '@/base/loading/loading'
  import {type, getTops} from '@/api/top'
  import {getSong} from '@/api/song'

  export default {
    data () {
      return {
        tops: [],
        wrapperHeight: 0,
        showMore: false,
        showList: {}
      }
    },
    created () {
      this.$nextTick(() => {
        this._getTops()
        getSong().then((res) => {
        })
      })
    },
    methods: {
      play (song) {
        this.$store.commit('PLAY_SONG', song)
      },
      // 获取排行榜数据
      _getTops () {
        for (let i in type) {
          getTops(type[i], 100).then((res) => {
            if (res.song_list.length > 20) {
              this.tops.push(res)
            } else {
            }
          })
        }
      },
      // 默认显示的歌曲数量
      _songs (list) {
        if (list.length < 10) {
          return list
        } else {
          let newList = list.slice(0, 10)
          return newList
        }
      },
      // 显示全部的歌曲
      _showMoreList (list) {
        if (list) {
          this.showMore = !this.showMore
          this.showList = list
          this.$refs.scroll.topTo(0)
        } else {
          this.showMore = false
        }
      }
    },
    components: {
      Scroll,
      SongList,
      CloseButton,
      Loading
    }
  }
</script>

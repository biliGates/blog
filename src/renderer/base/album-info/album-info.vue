<style lang="stylus" scoped>
  .album-info
    width 100%
    height 100%
    .content
      margin-right 20px
      .header
        margin-top 20px
        flex-direction column
        .info
          display flex
          margin-bottom 30px
          padding-bottom 30px
          border-bottom 1px solid rgba(7, 17, 27, 0.1)
          .album-pic
            flex 0 0 200px
            height 200px
            .pic
              width 200px
              height 200px
          .album-info
            flex 1
            flex-direction column
            margin-left 40px
            .title
              height 70px
              .album-name
                font-weight 700
                color #777
                font-size 20px
                display inline
              .price
                vertical-align top
                display inline-block
                margin 1px 6px 0 0
                background rgb(220, 45, 45)
                color #f1f1f1
                padding 2px 3px
                font-size 14px
                font-weight 600
            .author, .publish-time, .listen-num, .publish-company, .language
              height 26px
              span
                display inline-block
                vertical-align top
              .flag
                padding 0 3px
                line-height 16px
                font-size 12px
                border-radius 2px
                color #f1f1f1
                background rgb(220, 45, 45)
              .text
                max-width 400px
                line-height 16px
                font-size 13px
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                color #777
        .desc
          font-size 14px
          color #777
          line-height 26px
          margin-bottom 30px
          padding-bottom 30px
          border-bottom 1px solid rgba(7, 17, 27, 0.1)

</style>

<template>
  <div class="album-info">
    <scroll ref="scroll">
      <div class="content" v-if="album">
        <div class="header">
          <div class="info">
            <div class="album-pic">
              <img class="pic" :src="album.albumInfo.pic_big || album.albumInfo_s500">
            </div>
            <div class="album-info">

              <div class="title">
                <span class="price" v-if="">付费</span>
                <h2 class="album-name">{{album.albumInfo.title}}</h2>
              </div>

              <div class="author">
                <span class="flag">歌手</span> : 
                <span class="text">{{album.albumInfo.author}}</span>
              </div>

              <div class="publish-time">
                <span class="flag">发行时间</span> : 
                <span class="text">{{album.albumInfo.publishtime}}</span>
              </div>
              <div class="listen-num">
                <span class="flag">播放次数</span> : 
                <span class="text">{{album.albumInfo.listen_num}}次</span>
              </div>
              <div class="publish-company">
                <span class="flag">发行方</span> : 
                <span class="text">{{album.albumInfo.publishcompany}}</span>
              </div>
              <div class="language">
                <span class="flag">语种</span> : 
                <span class="text">{{album.albumInfo.language}}</span>
              </div>
            </div>
          </div>
          <div class="desc">{{album.albumInfo.info}}</div>
        </div>
        <div class="body">
          <song-list :songList="album.songlist"></song-list>
        </div>
      </div>
      <loading slot="loading" v-if="album === null"></loading>
    </scroll>
    <close-button @close="close"></close-button>
  </div>  
</template>

<script>
  import albumInfo from '@/api/album-info'
  import Scroll from '@/base/scroll/scroll'
  import CloseButton from '@/base/close-button/close-button'
  import SongList from '@/base/song-list/song-list'
  import Loading from '@/base/loading/loading'

  export default {
    data () {
      return {
        album: null
      }
    },
    props: {
      albumId: {
        type: Number,
        require: true
      }
    },
    created () {
      this._albumInfo()
    },
    updated () {
      this.$refs.scroll.refresh()
    },
    methods: {
      _albumInfo () {
        albumInfo(this.albumId).then((res) => {
          console.log(res)
          this.album = res
        })
      },
      close () {
        this.$emit('close')
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

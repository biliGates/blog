<style lang="stylus" scoped>
  .wrapper, .new-disc
    width 100%
    height 100%
    .publish-time-list
      margin-right 20px
      .publish-time-item
        .time
          font-size 14px
          line-height 28px
          color #898086
          font-weight 700
        .new-disc-list
          font-size 0
          .new-disc-item
            display inline-block
            width 20%
            margin-bottom 20px
            @media only screen and (min-width: 1200px)
              width 16.6%
            .disc
              font-size 0
              width 90%
              padding 6px 5%
              box-sizing border-box
              margin 0 auto
              border-radius 4px
              border 1px solid rgba(120, 130, 140, 0.1)
              transition all .3s
              &:hover
                box-shadow 2px 2px 10px rgba(50, 60, 70, 0.1)
                transform  translateZ(0) scale(1.0, 1.0)
              &:active
                transition box-shadow .2s
                box-shadow 0 0 6px rgba(50, 60, 70, 0.1)
              .disc-pic
                width 100%
              .disc-info
                overflow hidden
                .disc-name, .singer
                  white-space nowrap
                  text-overflow ellipsis
                  overflow hidden
                .disc-name
                  margin-top 12px
                  line-height 20px
                  font-size 14px
                  color #787878
                  font-weight 700
                .singer
                  line-height 16px
                  font-size 10px
                  color #909090
</style>

<template>
  <div class="wrapper">
    <div class="new-disc" v-show="!showAlbumInfo">
      <scroll ref="scroll">
        <div class="publish-time-list" v-for="time in times">
          <div class="publish-time-item">
            <h3 class="time">{{time}}</h3>
            <ul class="new-disc-list">
              <li class="new-disc-item" 
                  v-for="disc in newDisc[time]" 
                  @click="_showAlbumInfo(disc.album_id)"
              >
                <div class="disc" v-show="disc">
                  <img class="disc-pic" :src="disc.pic_big">
                  <div class="disc-info">
                    <p class="disc-name">{{disc.title}}</p>
                    <p class="singer">{{disc.author}}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <loading slot="loading" v-if="!times.length"></loading>
      </scroll>
    </div> 
    <album-info @close="hideAlbumInfo" v-if="showAlbumInfo" :albumId="albumId"></album-info>
  </div>
  
</template>

<script>
  import newDisc from '@/api/new-disc'
  import Scroll from '@/base/scroll/scroll'
  import AlbumInfo from '@/base/album-info/album-info'
  import Loading from '@/base/loading/loading'
  import {ERR_OK} from '@/api/config'
  import {supplementElement} from '@/common/js/utils'

  export default {
    data () {
      return {
        times: [],
        newDisc: {},
        showAlbumInfo: false,
        albumId: null
      }
    },
    created () {
      this._getNewDisc(0, 99)
    },
    updated () {
      this.$refs.scroll.refresh()
    },
    methods: {
      hideAlbumInfo () {
        this.showAlbumInfo = false
      },
      _getNewDisc (page, amount) {
        newDisc(page, amount).then((res) => {
          if (res.error_code === ERR_OK) {
            let obj = {}
            res.plaze_album_list.RM.album_list.list.forEach((data) => {
              data.publishtime
                ? ([data.publishtime] in obj
                  ? obj[data.publishtime].push(data)
                  : obj[data.publishtime] = [data])
                : obj['no-time'].push(data)
            })
            this.newDisc = Object.assign(this.newDisc, obj)
            this._sortTime()
          }
        })
      },
      _showAlbumInfo (id) {
        this.albumId = parseInt(id)
        this.showAlbumInfo = !this.showAlbumInfo
      },
      _sortTime () {
        this.times = Object.keys(this.newDisc)
        this.times.sort((a, b) => {
          return parseInt(b.split('-').join('')) - parseInt(a.split('-').join(''))
        })
      },
      _supplementElement (arr) {
        return document.documentElement.clientWidth < 1200
          ? supplementElement(arr, 5)
          : supplementElement(arr, 7)
      }
    },
    components: {
      Scroll,
      AlbumInfo,
      Loading
    }
  }
</script>

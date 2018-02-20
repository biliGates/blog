<style lang="stylus" scoped>
  .my-favorite 
    width 98%
    height 100%
    margin 20px auto
    .song-list
      .song-item
        margin 0 20px
        .created-time
          margin-bottom 10px
          font-size 13px
          color #666
        .list
          border-top 1px solid rgba(7, 17, 27, 0.1)
          .icon-close-
            &:before
              color #666 !important
</style>

<template>
  <div class="my-favorite">
    <scroll class="scroll">
      <ul class="song-list">
        <li class="song-item" v-for="key in keys">
          <div class="created-time">{{key}}</div>
          <div class="list">
            <song-list :needTabBar="false" :songList="songList[key]">
              <i slot="icon" class="icon-close-"></i>
            </song-list>
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
  import SongList from '@/base/song-list/song-list'
  import Scroll from '@/base/scroll/scroll'
  import getFormatTime from '@/common/js/date'
  import {mapGetters} from 'vuex'

  export default {
    data () {
      return {
        songList: {},
        keys: []
      }
    },
    activated () {
      this._sortSongList()
      this.autoRefresh()
    },
    deactivated () {
      clearInterval(this.timer)
    },
    methods: {
      autoRefresh () {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          this._sortSongList()
        }, 30000)
      },
      _sortSongList () {
        let songList = {}
        this.favoriteSongList.forEach((song) => {
          let key = getFormatTime(song.favoriteTime)
          songList[key]
            ? songList[key].push(song)
            : songList[key] = [song]
        })
        let keys = Object.keys(songList)
        keys.sort((a, b) => songList[b][0].favoriteTime - songList[a][0].favoriteTime)
        this.keys = keys
        this.songList = songList
      }
    },
    computed: {
      ...mapGetters([
        'favoriteSongList'
      ])
    },
    watch: {
      favoriteSongList () {
        this._sortSongList()
      }
    },
    components: {
      Scroll,
      SongList
    }
  }
</script>

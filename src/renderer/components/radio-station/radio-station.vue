<style lang="stylus" scoped>
  .radio-station
    margin-right 20px
    .radio-list-wrapper
      .slider-wrapper
        height 200px
        width 100%
        padding-bottom 20px
      .radio-list
        width 100%
        margin-top 30px
        padding-top 30px
        border-top 1px solid rgba(7, 17, 27, 0.1)
</style>

<template>
  <scroll ref="scroll">
    <div class="radio-station" v-if="imgs.length">
      <div class="radio-list-wrapper">
        <div class="slider-wrapper">
          <slider @sliderOnClick="_getChannelSong" :imgs="imgs"></slider>
        </div>
        <div class="radio-list">
          <img-list @onClick="_getChannelSong"
                     @updateEnd="scrollRefresh" 
                     :imgsList="radioList"
                     :round="true"
          ></img-list>
        </div>
      </div>
    </div>
    <loading v-else slot="loading"></loading>
  </scroll>
</template>

<script>
  import ImgList from '@/base/img-list/img-list'
  import Slider from '@/base/slider/slider'
  import Scroll from '@/base/scroll/scroll'
  import Loading from '@/base/loading/loading'
  import {mapGetters, mapMutations} from 'vuex'
  import {getRadioStationList, getChannelSong} from '@/api/radio-station'
  import {ERR_OK} from '@/api/config'

  export default {
    data () {
      return {
        imgs: [],
        radioList: [],
        chennel: null
      }
    },
    created () {
      this._getRadioStationList()
    },
    methods: {
      scrollRefresh () {
        this.$refs.scroll.refresh()
      },
      setRadioStationSong (song, name) {
        !this.radioStationMode && this.SET_RADIO_STATION_MODE(true)
        !this.radioStationChennel && this.SET_RADIO_STATION_CHENNEL(name)
        this.needPrevSong && this.NEED_PREV_SONG(false)
        this.SET_RADIO_STATION_SONG(song)
        this.PLAYING(true)
      },
      _getRadioStationList () {
        getRadioStationList().then((res) => {
          if (res.error_code === ERR_OK) {
            this._classfiyRadioStation(res.result[0].channellist)
          }
        })
      },
      _classfiyRadioStation (res) {
        res.forEach((item) => {
          if (item.cate_sname === '推荐频道') {
            this.imgs.push({
              img: item.thumb,
              name: item.name,
              data: item.ch_name
            })
          }
          this.radioList.push({
            img: item.thumb,
            name: item.name,
            data: item.ch_name
          })
        })
        this.radioList.sort()
      },
      _getChannelSong (data, name) {
        this.chennel = data
        getChannelSong(1, data).then((res) => {
          if (res.error_code === ERR_OK) {
            this.setRadioStationSong(res.result.songlist[0], name)
          }
        })
      },
      ...mapMutations([
        'SET_RADIO_STATION_MODE',
        'SET_RADIO_STATION_SONG',
        'SET_RADIO_STATION_CHENNEL',
        'NEED_PREV_SONG',
        'PLAYING'
      ])
    },
    computed: {
      ...mapGetters([
        'radioStationMode',
        'radioStationChennel',
        'needPrevSong'
      ])
    },
    watch: {
      needPrevSong () {
        if (this.needPrevSong) {
          this._getChannelSong(this.chennel)
        }
      }
    },
    components: {
      ImgList,
      Slider,
      Scroll,
      Loading
    }
  }
</script>

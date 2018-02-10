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
          <slider @sliderOnClick="showRadio" :imgs="imgs"></slider>
        </div>
        <div class="radio-list">
          <img-list @onClick="showRadio"
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
  import {getRadioStationList, getChannelSong} from '@/api/radio-station'
  import {ERR_OK} from '@/api/config'
  import ImgList from '@/base/img-list/img-list'
  import Slider from '@/base/slider/slider'
  import Scroll from '@/base/scroll/scroll'
  import Loading from '@/base/loading/loading'

  const SONGS_AMOUNT = 9 // 一次性获取音乐数量 从 0 计数

  export default {
    data () {
      return {
        imgs: [],
        radioList: []
      }
    },
    created () {
      this._getRadioStationList()
    },
    mounted () {
    },
    methods: {
      scrollRefresh () {
        this.$refs.scroll.refresh()
      },
      showRadio (data) {
        this._getChannelSong(data)
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
      _getChannelSong (data) {
        getChannelSong(SONGS_AMOUNT, data).then((res) => {
          if (res.error_code === ERR_OK) {
            console.log(res.result.songlist)
            this.$store.commit('PLAYER_LIST', res.result.songlist)
          }
        })
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

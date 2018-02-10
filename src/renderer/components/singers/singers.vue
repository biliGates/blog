<style lang="stylus" scoped>
  .singer
    width 100%
    height 100%
    .singer-list
      width 100%
      height 100%
      .singer
        margin-right 20px
        .filter
          border-bottom 1px solid rgba(7, 17, 27, 0.1)
          .filter-type
            margin-bottom 20px
            .title
              float left
            .singers-gender, .singers-firstchar
              margin-top 10px
              margin-left 60px
              .singers-gender-item,  .singers-firstchar-item
                display inline-block
                text-align center
                font-size 14px
                color #777
                font-weight 500
                border-left 1px solid rgba(7, 17, 27, 0.2)
                transition all .2s
                line-height 18px
                div
                  margin 0 auto
                  transition all .3s
                  border-radius 2px
                  &:hover
                    font-weight 700
                    color #000
                    background rgba(7, 17, 27, 0.1)
                  &.active
                    background rgb(143, 144, 150)
                    font-weight 700
                    color #eee
              .singers-gender-item
                width 70px
                div 
                  width 60px
              .singers-firstchar-item
                width 40px
                margin-bottom 10px
                div
                  width 30px
          .singers-list
            margin-top 30px  
    .singer-info
      width 100%
      height 100%

</style>

<template>
  <div class="singer">
    <div class="singer-list" v-if="!showSingerInfo">
      <scroll ref="scroll">
        <div class="singer">
          <div class="singer-list">
            <div class="filter">
              <div class="filter-type">
                <h2 class="title">分类：</h2>
                <ul class="singers-gender">
                  <li class="singers-gender-item">
                    <div :class="{'active': isActive === '全部'}" @click="_showList(singerList, '全部')">全部</div>
                  </li>
                  <li class="singers-gender-item" v-for="(gender, key) in gender">
                    <div :class="{'active': isActive === key}" @click="_showList(gender, key)" v-if="key !== '3'"> <!-- val 为 3 的数据有问题 -->
                      {{key | filterGender}}
                    </div>
                  </li>
                </ul>
              </div>
              <div class="filter-type">
                <h2 class="title">筛选：</h2>
                <ul class="singers-firstchar">
                  <li class="singers-firstchar-item" v-for="letter in firstChar">
                    <div :class="{active: isActive === letter}" @click="_showList(letters[letter], letter)">{{letter}}</div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="singers-list">
              <img-list @onClick="_showSingerInfo" 
                        v-if="singerList.length" 
                        :imgsList="showSingerList" 
                        @updateEnd="scrollRefresh"   
                        ref="imgList"
              ></img-list>
            </div>
          </div>
        </div>  
        <loading slot="loading" v-if="!singerList.length"></loading>
      </scroll>
    </div>
    <div class="singer-info" v-else>
      <singer-info @back="toggleShowSingerInfo"  :singerId="singerId"></singer-info>
    </div>
  </div>
</template>

<script>
  import getSingersList from '@/api/singers'
  import ImgList from '@/base/img-list/img-list'
  import SingerInfo from '@/base/singer-info/singer-info'
  import Loading from '@/base/loading/loading'
  import Scroll from '@/base/scroll/scroll'

  export default {
    data () {
      return {
        singerList: {},
        letters: {},
        gender: {},
        firstChar: [],
        showSingerList: [],
        isActive: '',
        showSingerInfo: false,
        singerId: ''
      }
    },
    created () {
      this._getSingersList()
    },
    methods: {
      scrollRefresh () {
        this.$refs.scroll.refresh()
      },
      toggleShowSingerInfo () {
        this.showSingerInfo = !this.showSingerInfo
      },
      _showSingerInfo (data) {
        this.singerId = data
        this.toggleShowSingerInfo()
      },
      _getSingersList () {
        getSingersList().then((res) => {
          let firstChar = {}
          let gender = {}
          let hot = {}
          res.artist.forEach((item) => {
            item.firstchar in firstChar
              ? firstChar[item.firstchar].push(item)
              : firstChar[item.firstchar] = [item]
            item.gender in gender
              ? gender[item.gender].push(item)
              : gender[item.gender] = [item]
            'count' in this
              ? this.count += 1
              : this.count = 0
            if (this.count < 50) {
              hot['热']
                ? hot['热'].push(item)
                : hot['热'] = [item]
            }
          })
          this.letters = Object.assign(firstChar, hot)
          this.gender = gender
          this.singerList = res.artist
          for (let i in this.letters) {
            this.firstChar.push(i)
          }
          this.firstChar.sort((a, b) => {
            // 大于 90 的 ‘热‘ 字 排到第一位
            return a.charCodeAt() > 90 || b.charCodeAt() > 90
              ? b.charCodeAt() - a.charCodeAt()
              : a.charCodeAt() - b.charCodeAt()
          })
          this._showList(this.singerList, '全部')
        })
      },
      _showList (list, showThisList) {
        let arr = []
        list.forEach((item) => {
          let obj = {}
          obj.name = item.name
          obj.img = item.avatar_big
          obj.data = item.ting_uid
          arr.push(obj)
        })
        this.showSingerList = arr
        this.isActive = showThisList
      }
    },
    filters: {
      filterGender (val) {
        switch (val) {
          case '0':
            return '男歌手'
          case '1':
            return '女歌手'
          case '2':
            return '乐队组合'
        }
      }
    },
    components: {
      ImgList,
      SingerInfo,
      Loading,
      Scroll
    }
  }
</script>

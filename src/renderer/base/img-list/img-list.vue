<style lang="stylus" scoped>
  .img-list
    width 100%
    .img-list
      display flex
      flex-wrap wrap
      .img-item
        font-size 0
        margin-bottom 20px
        transition all .5s
        @media only screen and (max-width: 1200px)
          flex 1 0 20%
        @media only screen and (min-width: 1200px)
          flex 1 0 16%
        .info
          max-width 100%
          min-width 100%
          div
            margin 10px auto
            transition all .5s
            &:hover
              box-shadow 0 0 20px rgba(7, 17, 27, 0.3)
            &:active
              transition box-shadow .2s
              transform scale(1.03)
              box-shadow 0 0 20px rgba(7, 17, 27, 0.2)
            @media only screen and (max-width: 1200px)
              width 120px
              height 120px
            @media only screen and (min-width: 1200px)
              width 180px
              height 180px
            .avatar
              border-radius 4px
              width 100%
              height 100%
            &.round
              border-radius 50%
              &:hover
                box-shadow 0 0 150px rgba(7, 17, 27, 0.5) inset
              .avatar
                position relative
                z-index -1
                border-radius 50%
          .name
            font-size 14px
            text-align center
            margin-top 10px
</style>

<template>
  <div ref="imgList" class="img-list">
    <ul class="img-list">
      <li class="img-item" v-for="img in imgsList">
        <div class="info" @click="feedback(img.data)" v-if="img">
          <div :class="{'round' : round}">
            <img :src="img.img" class="avatar">
          </div>
          <p class="name">{{img.name}}</p>
        </div>
      </li>
    </ul>
  </div>  
</template>

<script>
  import {supplementElement} from '@/common/js/utils'

  const LIMIT_WIDTH = 1200

  export default {
    data () {
      return {
      }
    },
    props: {
      imgsList: {
        type: Array,
        require: true
      },
      round: {
        type: Boolean,
        require: false
      }
    },
    created () {
      setTimeout(() => {
        this._supplementElement()
        this._addEventListener()
        this.$emit('updateEnd')
      }, 20)
    },
    updated () {
      this.$emit('updateEnd')
    },
    methods: {
      feedback (data) {
        this.$emit('onClick', data)
      },
      _supplementElement () {
        this.oldWidth = document.documentElement.clientWidth
        if (this.imgsList !== undefined) {
          this.oldWidth > LIMIT_WIDTH
            ? supplementElement(this.imgsList, 6)
            : supplementElement(this.imgsList, 5)
        }
      },
      _addEventListener () {
        window.addEventListener('resize', () => {
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.newWidth = document.documentElement.clientWidth
            if ((this.oldWidth > LIMIT_WIDTH &&
              this.newWidth > this.oldWidth) ||
              (this.oldWidth < LIMIT_WIDTH &&
              this.newWidth <= this.oldWidth)) {
              return
            }
            this._supplementElement()
          }, 50)
        })
      }
    },
    watch: {
      imgsList () {
        this._supplementElement()
      }
    }
  }
</script>

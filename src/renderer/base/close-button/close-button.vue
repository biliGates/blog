<style lang="stylus" scoped>
  .close-button
    position fixed
    top 130px
    right 40px
    width 34px
    height 22px
    border 1px solid rgba(7, 17, 27, 0.1)
    border-radius 4px
    background #e9e9e9
    opacity 0.6
    box-shadow 0 0 4px rgba(7, 17, 27, 0.1)
    text-align center
    transition all .4s
    i
      color #000
      line-height 22px
      font-size 16px
      font-weight 300
      display block
      transform rotateZ(10deg)
    &:hover
      box-shadow 0 0 20px rgba(7, 17, 27, 0.2) inset
    &:active
      transform scale(1.2)
</style>

<template>
  <div @click="close" class="close-button">
    <i class="icon-shrink2"></i>
  </div>  
</template>

<script>
export default {
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

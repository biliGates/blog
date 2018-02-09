<style lang="stylus" scoped>
  .close-button
    position fixed
    top 130px
    right 40px
    width 40px
    height 30px
    border 1px solid rgba(7, 17, 27, 0.1)
    border-radius 4px
    background rgba(57, 67, 77, 0.1)
    text-align center
    i
      color #fff
      line-height 30px
      font-size 20px
    &:hover
      transition all .3s
      box-shadow 0 0 20px rgba(7, 17, 27, 0.2) inset
      &:active
        transform scale(1.1)
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

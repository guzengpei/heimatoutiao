<template>
  <van-loading v-if="isLoading" size=".53333rem" />
  <van-icon
    v-else
    @click="onClick"
    color="#777"
    :name="is_collected ? 'star' : 'star-o'"
  />
</template>

<script>
import { addCollect, delCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    is_collected: {
      type: Boolean,
      required: true
    }
  },
  created () { },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    // 实现点击收藏
    async onClick () {
      // ajax开始的时候loading变成转圈
      this.isLoading = true
      const target = this.$route.params.article_id
      // this.$emit('update:is_collected', !this.is_collected)
      if (this.is_collected) {
        try {
          await delCollect(target)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await addCollect(target)
          this.$emit('update:is_collected', !this.is_collected)
          this.$toast('收藏成功')
        } catch (err) {
          console.log(err)
        }
      }
      // ajax结束的时候变回收藏按钮
      this.isLoading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>

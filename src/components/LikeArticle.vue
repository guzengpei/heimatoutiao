<template>
  <van-icon
    color="#777"
    @click="onLike"
    :name="like_count === 1 ? 'good-job' : 'good-job-o'"
  />
</template>

<script>
import { addLike, delLike } from '@/api/article'
export default {
  name: 'LikeArticle',
  props: {
    like_count: {
      type: Number,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {
    async onLike () {
      const target = this.$route.params.article_id
      if (this.like_count === 1) {
        // 取消对文章的点赞
        try {
          await delLike(target)
          // this.like_count = 0
          this.$emit('update:like_count', 0)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await addLike(target)
          // this.like_count = 1
          this.$emit('update:like_count', 1)
          this.$toast('成功点赞')
        } catch (err) {
          console.log(err)
        }
      }
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

<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="$emit('close')" fixed>
      <template #left><van-icon name="cross" /></template
    ></van-nav-bar>
    <CommentItem :item="comment" class="comment"></CommentItem>
    <van-cell title="全部回复" />
    <CommentItem
      v-for="(item, index) in list"
      :key="index"
      :item="item"
    ></CommentItem>
    <div class="comment1"></div>
    <div class="bottom">
      <van-button
        type="primary"
        block
        round
        plain
        @click="isAddCommentShow = true"
        >大号按钮</van-button
      >
    </div>
    <!-- 添加新评论 -->
    <van-popup v-model="isAddCommentShow" position="bottom">
      <AddComment
        v-if="isAddCommentShow"
        @add-comment="
          list.unshift($event);
          isAddCommentShow = false;
          comment.reply_count++;
        "
        :target="comment.com_id"
        :art_id="$route.params.article_id"
      ></AddComment>
    </van-popup>
  </div>
</template>

<script>
import AddComment from '@/views/Article/commpnoents/AddComment'
import CommentItem from '@/views/Article/commpnoents/CommentItem'
import { getCommentList } from '@/api/comment'
export default {
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      offset: null,
      limit: 9999,
      list: [],
      isAddCommentShow: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList({ type: 'c', source: this.comment.com_id, offset: this.offset, limit: this.limit })
        console.log(res)
        this.list = res.data.data.results
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (count === 0) {
        return '暂无回复'
      } else {
        return `${count}条回复`
      }
    }
  },
  watch: {},
  filters: {},
  components: { CommentItem, AddComment }
}
</script>

<style scoped lang='less'>
.comment {
  margin-top: 92px;
}
.bottom {
  position: fixed;
  bottom: 0;
  height: 110px;
  width: 750px;
  background-color: pink;
  padding: 10px 30px;
  box-sizing: border-box;
}
.comment1 {
  margin-bottom: 210px;
}
</style>

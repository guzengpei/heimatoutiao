<template>
  <div>
    <keep-alive :include="['home']">
      <router-view class="main"></router-view>
    </keep-alive>

    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o">
        <i class="toutiao toutiao-shouye" slot="icon"></i>
        首页
      </van-tabbar-item>
      <van-tabbar-item replace to="/video" icon="search">
        <i class="toutiao toutiao-shipin" slot="icon"></i>
        视频
      </van-tabbar-item>
      <van-tabbar-item replace to="/question" icon="home-o">
        <i class="toutiao toutiao-wenda" slot="icon"></i>
        问答
      </van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="search">
        <i class="toutiao toutiao-wode" slot="icon"></i>
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 40px;
}
/deep/ .van-tabbar-item__text {
  font-size: 20px !important;
}
.main {
  padding-bottom: 100px;
  background-color: #f5f7f9;
}
</style>

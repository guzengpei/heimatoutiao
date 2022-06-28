<template>
  <div>
    <!-- 登陆后 -->
    <div class="header header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image round :src="userInfo.photo" />
          <span>{{userInfo.name}}</span>
        </div>
        <div class="button">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>{{userInfo.art_count}}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{userInfo.fans_count}}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{userInfo.follow_count}}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{userInfo.like_count}}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <!-- 未登陆 -->
    <div class="header header-notlogin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登陆/注册</p>
      </div>
    </div>
    <!-- 公用 -->
    <van-grid :column-num="2">
      <van-grid-item icon="photo-o" text="收藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="历史">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <!-- 退出按钮 -->
    <van-button
      type="default"
      block
      class="logout"
      v-if="user && user.token"
      @click="logout"
      >退出登陆</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'My',
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        this.userInfo = res.data.data
        console.log('res', res)
        // console.log(this.userInfo)
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({
          message: '确定退出吗'
        })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header {
  width: 750px;
  height: 401px;
  background: hsl(210, 95%, 59%, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
  // opacity: 0.8;
}
.header-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }
  p {
    font-size: 28px;
    font-weight: 400;
    color: #fff;
  }
}
.header-login {
  padding-top: 116px;
  .avatar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 55px;
    align-items: center;
    padding-right: 32px;
    padding-left: 33px;
    .button {
      text-align: center;
      line-height: 33px;
      width: 116px;
      height: 33px;
      background-color: #ffffff;
      border-radius: 16px;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #666666;
    }
    .left {
      display: flex;
      align-items: center;
      .van-image {
        width: 132px;
        height: 132px;
      }
      span {
        margin-left: 22px;
        font-size: 30px;
        font-weight: 400;
        color: #fff;
      }
    }
  }
  .list {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      p {
        color: #fff;
        &:nth-child(1) {
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 22px;
        }
      }
    }
  }
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
/deep/.van-grid-item__text {
  font-size: 28px;
}
.van-cell-group {
  margin: 9px 0;
}
.logout {
  height: 100px;
  color: #d86262;
}
</style>

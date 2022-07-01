<template>
  <div>
    <van-nav-bar title="登陆" left-arrow @click-left="$router.back()">
      <van-icon name="cross" slot="left" />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '不符合手机的格式' },
        ]"
      >
        <!-- <i class="toutiao toutiao-shouji" slot="left-icon"></i> -->
        <Myicon name="shouji" slot="left-icon"></Myicon>
      </van-field>
      <van-field
        v-model.trim="code"
        type="password"
        name="code"
        placeholder="验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /\d{6}$/, message: '请输入六位验证码' },
        ]"
      >
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
        <template #button>
          <van-count-down
            :time="time"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="yzm"
            size="small"
            native-type="button"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block class="login" native-type="submit">登陆</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
import Myicon from '@/components/Myicon.vue'
export default {
  created () { },
  data () {
    return {
      mobile: '18867691997', // 手机号
      code: '246810', // 短信验证码
      time: 5 * 1000,
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        // console.log(values)
        const res = await login(values)
        // console.log(res)
        this.$store.commit('setUser', res.data.data)
        this.$router.push({ name: 'my' })
      } catch (err) {
        console.log(err)
      }
    },
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        console.log('校验通过')
        this.isCountDownShow = true
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('发送失败')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('请输入正确手机号')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { Myicon }
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
}
.yzm {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  border-radius: 23px;
  font-size: 22px;
  color: #666;
  .van-button__text {
    zoom: 0.96;
  }
}
.login {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  .van-button__text {
    color: #fff;
    font-size: 30px;
  }
}
.van-count-down {
  position: fixed;
  right: 30px;
}
.yzm {
  position: fixed;
  right: 20px;
}
</style>

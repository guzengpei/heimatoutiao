<template>
  <div>
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          type="danger"
          size="mini"
          plain
          round
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
    </div>
    <van-row>
      <van-col span="6" v-for="(item, index) in channels" :key="index">
        <div
          class="inner"
          @click="onClick(index)"
          :style="{ color: active === index ? 'red' : '' }"
        >
          {{ item.name }}
          <van-icon
            v-show="isCloseShow"
            name="close"
            v-if="index !== 0"
            :style="{ color: active === index ? 'red' : '' }"
          />
        </div>
      </van-col>
    </van-row>

    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
    </div>
    <van-row>
      <van-col span="6" v-for="(item, index) in recommendChannels" :key="index">
        <div class="inner van-ellipsis" @click="add(item.id)">
          +{{ item.name }}
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { saveChannels, getAllArticleList } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'channels'
export default {
  name: 'ChannelPanel',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  async created () {
    try {
      const res = await getAllArticleList()
      console.log(res)
      this.recommendChannels = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      recommendChannels: [],
      isCloseShow: false
    }
  },
  methods: {
    add (id) {
      const index = this.recommendChannels.findIndex(item => item.id === id)
      this.channels.push(this.recommendChannels[index])
      this.recommendChannels.splice(index, 1)
    },
    onClick (index) {
      if (this.isCloseShow) {
        if (index === 0) {
          return
        }
        // this.recommendChannels.push(this.channels[index])
        // this.channels.splice(index, 1)
        const obj = this.channels[index]
        this.channels.splice(index, 1)
        this.recommendChannels.push(obj)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      async handler (newVal) {
        // console.log(newVal)
        if (this.$store.state.user && this.$store.state.user.token) {
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          // console.log(arr)
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else {
          setItem(CHANNELS, newVal)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel-container {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 18px;
    padding-left: 24px;
    margin-bottom: 16px;
    h3 {
      font-size: 32px;
      font-weight: 400;
      color: #333;
    }
    .van-button {
      width: 104px;
      height: 48px;
      border-radius: 24px;
      line-height: 48px;
    }
  }
}
.inner {
  position: relative;
  width: 160px;
  height: 86px;
  background: #f4f5f6;
  border-radius: 6px;
  font-size: 28px;
  font-weight: 400;
  color: #222222;
  text-align: center;
  line-height: 86px;
  margin-left: 14px;
  .van-icon {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }
}
.van-col {
  margin-bottom: 22px;
}
</style>

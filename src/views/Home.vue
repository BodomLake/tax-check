<template>
  <div class="home">
    <div class="left">
      <div class="title-bar">
        <div class="text-center">
          文本形式的汇报
        </div>
      </div>

      <div class="texture">
        <a-row class="search-bar">
          <a-col :span="2">
            <div class="div-center">
              <a-icon type="search"/>
            </div>
          </a-col>
          <a-col :span="14">
            <a-input type="text"/>
          </a-col>
          <a-col :span="4">
            <a-button type="button">清空</a-button>
          </a-col>
          <a-col :span="4">
            <a-button type="button">搜索</a-button>
          </a-col>
        </a-row>

        <div class="result">
          <a-list item-layout="horizontal" :data-source="list">
            <a-list-item slot="renderItem" slot-scope="item, index">
              {{ item }} 货物名称 数量 金额
              <a-button type="primary">票数</a-button>
            </a-list-item>
          </a-list>
        </div>
        <!-- 待加入的功能 -->
        <div class="rest">

        </div>
      </div>
    </div>
    <div class="right">
      <div class="title-bar">
        <div class="text-center">
          echarts 图形汇报
        </div>
      </div>
      <div class="charts">

      </div>
    </div>
    <div class="bench">
      <div class="title-bar">
        <div class="text-center">操作台</div>

      </div>
      <div>
        拖入文件
      </div>
      <div>
        拖入文件
      </div>
      <div>
        点击开始分析
      </div>
      <div>

      </div>
    </div>
  </div>
</template>

<script>
let list = Array(10).fill('')
list = list.map(val => {
  return Math.ceil(100 * Math.random())
})
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      list: list,
    }
  },
  mounted() {

  }
}
</script>
<style scoped>
.home {
  display: flex;
  width: 100vw;
  height: 100vh;
}

.left {
  width: 45%;
  height: 100%;
}

.right {
  width: 45%;
  height: 100%;
}

.bench {
  width: 10%;
  height: 100%;
}

.title-bar {
  width: 100%;
  height: 5vh;
  background-color: teal;
  color: wheat;
}

.text-center {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.div-center {
  transform: translate(0%, 50%);
}

</style>
<style scoped>

.texture {
  background-color: skyblue;
  height: 95vh;
}

.search-bar {
  width: 100%;
  padding: 10px 0px;
}
</style>
<style scoped>
.charts {
  background-color: cornflowerblue;
  height: 95vh;
}
</style>

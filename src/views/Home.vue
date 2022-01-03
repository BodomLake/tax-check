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
          <a-table style="height: inherit" :columns="columns" :data-source="displayData" :pagination="false"
                   :scrollToFirstRowOnChange="true"
                   bordered size="middle" :scroll="{ y: 700 }"/>
        </div>
        <!-- 待加入的功能 -->
        <div class="rest">

        </div>
      </div>
    </div>
    <div class="right">
      <div class="title-bar">
        <div class="text-center">
          echarts 图表汇报
        </div>
      </div>
      <div class="charts">

      </div>
    </div>
    <div class="bench">

      <div class="title-bar">
        <div class="text-center">操作台</div>
      </div>

      <div style="height: 40vh">
        <!-- 开具发票 offer -->
        <FileDropZone ref="offer" :multiple="true"></FileDropZone>
      </div>

      <div style="height: 40vh">
        <!-- 取得发票 earn -->
        <FileDropZone ref="earn"></FileDropZone>
      </div>

      <button class="analysis-btn" @click="startAnalysis">
        开始分析
      </button>

    </div>
  </div>
</template>

<script>
import FileDropZone from "@/components/FileDropZone";
import {v4 as uuidv4} from 'uuid';
import * as XLSX from 'xlsx'

function randNum() {
  return Math.ceil(100 * Math.random())
}

const displayData = [];
for (let i = 0; i < 100; i++) {
  displayData.push({
    key: i,
    goodsName: uuidv4(),
    'offer.money': randNum(),
    'offer.count': randNum(),
    'sell.money': randNum(),
    'sell.count': randNum(),
    'rest.money': randNum(),
    'rest.count': randNum(),
  });
}
const columns = [
  {
    title: '货物名称',
    dataIndex: 'goodsName',
    key: 'goodsName',
    fixed: 'left',
    width: 150,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '购进情况',
    children: [
      {
        title: '数量',
        dataIndex: 'offer.count',
        key: 'offer.count',
        align: 'center',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: '金额',
        dataIndex: 'offer.money',
        key: 'offer.money',
        align: 'center',
        sorter: (a, b) => a.age - b.age,
      }
    ]
  },
  {
    title: '销售情况',
    children: [
      {
        title: '数量',
        dataIndex: 'sell.count',
        key: 'sell.count',
        align: 'center',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: '金额',
        dataIndex: 'sell.money',
        key: 'sell.money',
        align: 'center',
        sorter: (a, b) => a.age - b.age,
      }
    ]
  },
  {
    title: '结存情况',
    children: [
      {
        title: '数量',
        dataIndex: 'rest.count',
        key: 'rest.count',
        align: 'center',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: '金额',
        dataIndex: 'rest.money',
        key: 'rest.money',
        align: 'center',
        sorter: (a, b) => a.age - b.age,
      }
    ]
  },
  {
    title: '图表',
    align: 'center',
    dataIndex: 'charts',
    key: 'charts',
    fixed: 'right',
    width: 75,
  },
]
export default {
  name: 'Home',
  components: {FileDropZone},
  data() {
    return {
      columns: columns,
      displayData: displayData,
    }
  },
  mounted() {

  },

  methods: {
    startAnalysis() {
      console.log(this.$refs['offer']);
    }
  }
}
</script>
<style scoped>
.home {
  display: flex;
  width: 100%;
  height: 100vh;
}

.left {
  width: 75%;
  height: 100%;
}

.right {
  width: 15%;
  height: 100%;
}

.bench {
  width: 10%;
  height: 100%;
  position: relative;
}

.title-bar {
  width: 100%;
  height: 5vh;
  background-color: teal;
  color: wheat;
}

.result {
  height: initial;
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

.analysis-btn {
  position: absolute;
  transform: translateX(-50%);
  bottom: 0px;
  height: 10vw;
  width: 100%
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

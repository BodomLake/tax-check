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
          <a-table style="height: inherit" :columns="outerColumns" :data-source="displayData" :pagination="false"
                   @expand="expandRow"
                   :scrollToFirstRowOnChange="true" bordered size="middle" :scroll="{ y: 700 }">
            <a slot="charts" slot-scope="text">
              <a-icon type="pie-chart"/>
            </a>
            <a-table slot="expandedRowRender" :columns="innerColumns" :data-source="innerData" :pagination="false">

            </a-table>
          </a-table>
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

      <div name="earn" style="height: 40vh">
        <!-- 取得发票 earn -->
        <FileDropZone ref="earn" :multiple="true"></FileDropZone>
      </div>

      <div name="offer" style="height: 40vh">
        <!-- 开具发票 offer -->
        <FileDropZone ref="offer" :multiple="true"></FileDropZone>
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
import Subject from "../def/Subject";
import Ticket from "../def/Ticket";
import Union from "../def/Union";

function randNum() {
  return Math.ceil(100 * Math.random())
}

var matchKey = '货物名称'
const displayData = [];
for (let i = 0; i < 100; i++) {
  displayData.push({
    key: i,
    goodsName: uuidv4(),
    offerMoney: randNum(),
    offerCount: randNum(),
    earnMoney: randNum(),
    earnCount: randNum(),
    restMoney: randNum(),
    restCount: randNum(),
  });
}
const outerColumns = [
  {
    title: '货物名称',
    dataIndex: 'goodsName',
    key: 'goodsName',
    // fixed: 'left',
    width: 250,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '购进情况',
    children: [
      {
        title: '数量',
        dataIndex: 'earnCount',
        key: 'earnCount',
        align: 'center',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: '金额',
        dataIndex: 'earnMoney',
        key: 'earnMoney',
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
        dataIndex: 'offerCount',
        key: 'offerCount',
        align: 'center',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: '金额',
        dataIndex: 'offerMoney',
        key: 'offerMoney',
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
        dataIndex: 'restCount',
        key: 'restCount',
        align: 'center',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: '金额',
        dataIndex: 'restMoney',
        key: 'restMoney',
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
    // fixed: 'right',
    width: 75,
    scopedSlots: {customRender: 'charts'}
  },
]
const innerColumns = [
  {title: '发票号码', dataIndex: 'No', key: 'No'},
  {title: '发票代码', dataIndex: 'code', key: 'code'},
  {title: '金额', dataIndex: 'money', key: 'money'},
  {title: '数量', dataIndex: 'count', key: 'count'},
  {title: '开票日期', dataIndex: 'issueDate', key: 'issueDate'},
]
const innerData = [];
for (let i = 0; i < 5; ++i) {
  innerData.push({
    key: i,
    No: i,
    code: uuidv4(),
    money: Math.ceil(Math.random() * 1000),
    issueDate: '2014-12-24 23:12:00',
    count: Math.ceil(Math.random() * 1000)
  });
}
// 处理原始数据的方法
// 遍历每一条数据（每一条数据 对应着 发票的 一栏），根据 “货物名称” 这个字段 归类
// 归类之后，设计嵌套的子表格 "发票代码" “发票号码“ ”开票日期“ ”货物名称“
function resolveRaw(resolved, original) {
  // 循环原始数据
  original.forEach((data, index) => {
    // 获取货物名称
    let goodsName = data[matchKey]
    // 当前处理结果之中，不存在这样的货物，每一个都不是！
    let exist = resolved.some((data) => {
      return data.goodsName == goodsName
    })
    // 如果分类中没有这个货物 就新建一个对象 并且放入对象内部的列表 中
    let subject = new Subject(index, data['发票号码'], data['发票代码'], data['金额'], data['数量'], data['开票日期'])
    if (!exist) {
      resolved.push(new Ticket(goodsName).addSource(subject))
    } else {       // 如果有，就再对应的货物对象中加入 该发票栏的数据
      for (let i = 0; i < resolved.length; i++) {
        if (resolved[i].goodsName == goodsName) {
          // 相当于归类了一栏数据
          resolved[i].addSource(subject)
          // 不要重复加入
          break
        }
      }
    }
  })
  for (let i = 0; i < resolved.length; i++) {
    // 每一个都要核算一下总数
    resolved[i].summary && resolved[i].summary();
  }
}

// 处理得到并集
function resolveUnion(offerData, earnData) {
  let unionResult = []
  // 先遍历 获取票 (购进情况);
  // debugger;
  for (let i = 0; i < earnData.length; i++) {
    // 创建一个对象
    let union = new Union(i, earnData[i].goodsName, earnData[i].money, earnData[i].count)
    for (let j = 0; j < offerData.length; j++) {
      if (offerData[j].goodsName == earnData[i].goodsName) {
        // 用+ 和 = 都可以，因为已经 去重了一遍，那么就不会有 两个同名商品栏目 出现在 offerData数组之中
        union.offerMoney += parseFloat(offerData[j].money)
        union.offerCount += parseFloat(offerData[j].count)
        // 计算 结存情况
        union.calcRest();
        union.offerSubjects.push(...offerData[j].source)
      }
    }
    union.earnSubjects.push(...earnData[i].source)
    unionResult.push(union)
  }
  return unionResult;
}

export default {
  name: 'Home',
  components: {FileDropZone},
  data() {
    return {
      outerColumns: outerColumns,
      innerColumns: innerColumns,
      displayData: [],
      innerData: innerData,
      // 从excel读取出来的原始数据
      earnData: {
        original: [],
        resolved: [],
      },
      offerData: {
        original: [],
        resolved: [],
      },
      // (取得+开具)汇总数据
      summaryData: [],
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
    // 默认获取workbook的第一个sheet
    startAnalysis() {
      let offerFileZone = this.$refs['offer'];
      let earnFileZone = this.$refs['earn'];

      let promiseArray1 = [];
      // 取得发票
      earnFileZone.$data.fileList.forEach((file) => {
        let promise = new Promise(resolve => {
          let fr = new FileReader();

          fr.onload = (e) => {
            const wb = XLSX.read(e.target.result, {type: 'binary'})
            console.log(wb.SheetNames)
            // let res = Object.keys(wb.Sheets).map(key => XLSX.utils.sheet_to_json(wb.Sheets[key]))
            let res = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
            // 保存原始数据
            this.earnData.original = res
            // console.log(file.name, res);
            resolveRaw(this.earnData.resolved, res)
            // 解决了
            resolve()
          }

          fr.readAsBinaryString(file)
        })
        promiseArray1.push(promise)
      })

      let promiseArray2 = [];
      // 开具发票
      offerFileZone.$data.fileList.forEach((file) => {
        let promise = new Promise(resolve => {
          let fr = new FileReader();

          fr.onload = (e) => {
            const wb = XLSX.read(e.target.result, {type: 'binary'})
            console.log(wb.SheetNames)
            // let res = Object.keys(wb.Sheets).map((key, idx, array) => XLSX.utils.sheet_to_json(array[key]))
            let res = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
            // 保存原始数据
            this.offerData.original = res
            // console.log(file.name, res);
            resolveRaw(this.offerData.resolved, res)
            // 解决了
            resolve()
          }

          fr.readAsBinaryString(file)
        })
        promiseArray2.push(promise)
      })

      Promise.all([...promiseArray1, ...promiseArray2]).then(result => {
        this.displayData = resolveUnion(this.offerData.resolved, this.earnData.resolved)
      })

    },
    // 展开一行，触发，修改内层表格的数据
    expandRow(expanded, record) {
      // this.expandedRowKeys = [] // 重置展开节点，只展开当前点击的节点（内部数据调用模板，无法做到同时几个内层表格数据直接缓存在页面）
      console.log(expanded, record)
      this.innerData = Array.of(record.earnSubjects, record.offerSubjects).flat();
      if (expanded) {
      }
    },
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

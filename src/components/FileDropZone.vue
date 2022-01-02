<template>
  <div class="file">
    <div class="dropZone" :for="id" @click="inputFile">
      <!-- 可以考虑不用Antd 组件-->
      <a-icon type="plus-circle" :spin="false" theme="outlined"
              style="transform: translateY(-50%);top: 50%;position: relative;"/>
      <input type="file" :id="id" :name="fileName || 'file:' + id" :ref="id" :multiple="multiple"
             style="visibility: hidden;display: none" @change="inputChange($event)">
    </div>
    <ul class="fileList">
      <li v-for="file in fileList">
        <a-icon type="file-excel"/>
        {{ file.name }}

      </li>
    </ul>
  </div>

</template>

<script>
import {v4 as uuidv4} from 'uuid';
import * as XLSX from 'xlsx'
// 默认接受 application/vnd.ms-excel
export default {
  name: "FileDropZone",
  props: {
    // fileList 容量大小是否不是单个
    multiple: {
      require: false,
      type: Boolean,
      default: () => {
        return false
      },
    },
    id: {
      require: true,
      type: String,
      default: () => {
        return uuidv4().replaceAll('-', '');
      }
    },
    // 该组件中存放的文件列表
    fileList: {
      require: true,
      type: Array,
      default: () => {
        return []
      },
    }
  },
  data() {
    return {
      tooltip: '请拖入文件',
      fileName: '',
      fileReader: new FileReader(),
    }
  },
  mounted() {

  },
  methods: {
    inputFile() {
      this.$refs[this.id].click()
    },
    inputChange($event) {
      console.log($event)
      console.log($event.target)
      console.log($event.target.files)
      this.fileList = $event.target.files;
      console.log(XLSX)

      // 读取完毕的回调
      this.fileReader.onload = function (e) {
        let data = e.target.result;
        let workbook = XLSX.read(data, {type: 'binary'});
        console.log(workbook);
        let json1 = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
        let json2 = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]])
        console.log(json1)
        console.log(json2)
      }
      // 读取文件
      this.fileReader.readAsBinaryString(this.fileList[0])
    }
  }
}
</script>

<style scoped>
.file {
  width: 50px;
  height: 50px;
  margin: 0px auto;
}

.dropZone {
  width: 100%;
  height: 100%;
  background-color: burlywood;
  border-radius: 10px;
}

.fileList {

}

</style>
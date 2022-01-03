<template>
  <div class="file">
    <div class="dropZone" :for="id" @click="inputFile" @dragleave="dragLeaveFile($event)"
         @dragover="dragOverFile($event)" @drop="dropFile($event)">
      <!-- 可以考虑不用Antd 组件-->
      <!--<a-icon type="plus-circle" :spin="false" theme="outlined" style="transform: translateY(-50%);top: 50%;position: relative;"/>-->
      <input type="file" :id="id" :name="'fileLoader:' + id" :ref="id" :multiple="multiple"
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
  },

  data() {
    return {
      tooltip: '请拖入文件',
      // 该组件中存放的文件列表
      fileList: [],
    }
  },
  mounted() {

  },
  methods: {
    inputFile() {
      this.$refs[this.id].click()
    },
    inputChange($event) {
      // console.log($event.target)
      console.log('点击传入文件', $event.target.files)
      if (this.multiple) {
        this.fileList.push($event.target.files[0])
      } else {
        this.fileList = $event.target.files;
      }
    },
    dropFile($event) {
      $event.preventDefault();
      $event.stopPropagation();
      let transferFiles = $event.target.files || $event.dataTransfer.files;
      console.log('拖入文件', transferFiles)
      if (this.multiple) {
        this.fileList.push(transferFiles[0])
      } else {
        this.fileList = $event.target.files;
      }
    },
    dragOverFile($event) {
      $event.preventDefault();
      $event.stopPropagation();
    },
    dragLeaveFile($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }
}
</script>

<style scoped>
.file {
  margin: 0px auto;
}

.dropZone {
  width: 50px;
  height: 50px;
  margin: 0px auto;
  background-color: burlywood;
  border-radius: 10px;
}

.fileList {
  user-select: none;
  height: fit-content;
  width: 100%;
}

</style>

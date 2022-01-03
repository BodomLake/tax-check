import {v4 as uuidv4} from 'uuid';

export class Col {
  constructor(title, dataIndex, key, sorter, fixed, width, children) {
    this.title = title || '未命名';
    const idx = uuidv4()
    this.dataIndex = dataIndex || idx;
    this.key = key || this.dataIndex || idx;
    sorter = sorter;
    this.fixed = fixed;
    this.children = children || [];
    this.width = width;
  }
}

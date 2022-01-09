// ”货物名称“  ???
//   “发票号码“ "发票代码"  "金额" “数量”  ”开票日期“
export default class Subject {
  constructor(key, No, code, money, count, issueDate, asMember) {
    this.key = key;
    this.No = No
    this.code = code
    this.money = money
    this.count = count
    this.issueDate = issueDate || new Date();
    // 是否成为 统计计数的一项呢？
    this.asMember = asMember || true;
  }
}

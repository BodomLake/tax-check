export default class Ticket {
  constructor(goodsName) {
    this.goodsName = goodsName;
    // 总计金额
    this.money = 0;
    // 总计数量
    this.count = 0;
    // 每一栏数据的来源
    this.source = [];
  }

  addSource(src) {
    this.source.push(src)
    return this;
  }

  summary() {
    this.source.forEach((src, index) => {
      this.money += parseFloat(src.money)
      this.count += parseFloat(src.count)
    })
    this.money = this.money.toFixed(2)
    this.count = this.count.toFixed(2)
    return this;
  }

}

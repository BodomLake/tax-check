import Reactive from "./Reactive";

export default class Ticket extends Reactive {
  constructor(goodsName) {
    super();
    this.goodsName = goodsName;
    // 总计金额
    this.money = 0;
    // 总计数量
    this.count = 0;
    // 每一栏数据的来源
    this.source = [];
    this.defineReactive('source')
    this.$watch = {
      'source': (val, oldVal) => {
        if (val != oldVal) {
          this.summary()
        }
      }
    }
  }

  addSource(src) {
    this.source.push(src)
    return this;
  }

  summary() {
    this.source.forEach((src, index) => {
      if (src.asMember) {
        this.money += parseFloat(src.money)
        this.count += parseFloat(src.count)
      }
    })
    this.money = this.money.toFixed(2)
    this.count = this.count.toFixed(2)
    return this;
  }


}

import {v4 as uuidv4} from "uuid";

export default class Union {

  constructor(key, goodsName, earnMoney, earnCount, offerMoney, offerCount) {
    this.key = key || uuidv4(),
    // 购进情况
    this.earnMoney = parseFloat(earnMoney) || 0;
    this.earnCount = parseFloat(earnCount) || 0;
    // 销售情况
    this.offerMoney = parseFloat(offerMoney) || 0;
    this.offerCount = parseFloat(offerCount) || 0;
    // 结存情况(进货-出货)
    this.restMoney = this.earnMoney - this.offerMoney;
    this.restCount = this.earnCount - this.offerCount;
    // 货物名称
    this.goodsName = goodsName || '';
    // 从属
    this.offerSubjects = []
    this.earnSubjects = []
  }

  calcRest() {
    this.restMoney = (this.earnMoney - this.offerMoney).toFixed(2);
    this.restCount = (this.earnCount - this.offerCount).toFixed(2);
    return this;
  }


}

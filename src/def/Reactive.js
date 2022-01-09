export default class Reactive {
  constructor($data, $watch) {
    this.$data = $data || {};
    this.$watch = $watch || {};
    // 默认可以改变 否定的否定就是 mutable
    this.immutable = false;
  }

  setImmutable(flag) {
    this.immutable = flag
  }

  // 添加响应式
  defineReactive(key) {
    // 不存在该属性，直接返回
    if (!this.hasOwnProperty(key)) {
      console.warn('the key: ' + key + ' is not defined in ' + this.constructor.name)
      return;
    }
    // 如果存在，则告知该属性对应的代理（$data[key]）已经被设置
    // 判断是否需要覆盖原来被设置的代理（$data[key]）
    if (this.$data.hasOwnProperty(key)) {
      console.info('the reactive attr "' + key + '" in ' + this.constructor.name + '.$data has already set')
    } else {
      // 代理 数据的变化
      this.$data[key] = this[key];
    }
    // 侵入被代理的属性的setter getter，用$watcher[key]对应的function处理setter
    Object.defineProperty(this, key, {
      get: function () {
        return this.$data[key];
      },
      set: function (val) {
        const oldVal = this.$data[key];
        if (oldVal === val) {
          return val;
        }
        // 是否被截留？
        val = this.$watch[key] && typeof this.$watch[key] === 'function'
          && this.$watch[key].call(this, val, oldVal) || val
        // 没有截留直接返回
        this.$data[key] = val
        return val;
      },
    })
  }
}

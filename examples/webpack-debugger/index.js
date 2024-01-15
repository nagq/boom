const AsyncQueue = require("webpack/lib/util/AsyncQueue");

function processor(item, callback) {
  setTimeout(() => {
    item.date = new Date();
    callback(null, item);
  },2000);
}

const queue = new AsyncQueue({
  name: 'addNumber',
  processor,
  parallelism: 2,
  getKey: (item) => item.key,
});

queue.add({ key: 'item1', name: '19Qingfeng' }, (err, result) => {
  console.log('item1处理后的结果', result);
});

queue.add({ key: 'item2', name: '19Qingfeng' }, (err, result) => {
  console.log('item2处理后的结果', result);
});

queue.add({ key: 'item3', name: '19Qingfeng' }, (err, result) => {
  console.log('item3处理后的结果', result);
});


class ArrayQueue {
  constructor(items) {
    this._list = items ? Array.from(items) : [];
    this._listReversed = [];
  }

  get length() {
    return this._list.length + this._listReversed.length;
  }

  clear() {
    this._list.length = 0;
    this._listReversed.length = 0;
  }

  enqueue(item) {
    this._list.push(item);
  }

  dequeue() {
    if (this._listReversed.length === 0) {
      if (this._list.length === 0) return undefined;
      if (this._list.length === 1) return this._list.pop();
      if (this._list.length < 16) return this._list.shift();
      const temp = this._listReversed;
      this._listReversed = this._list;
      this._listReversed.reverse();
      this._list = temp;
    }
    return this._listReversed.pop();
  }

  delete(item) {
    const i = this._list.indexOf(item);
    if (i >= 0) {
      this._list.splice(i, 1);
    } else {
      const i = this._listReversed.indexOf(item);
      if (i >= 0) this._listReversed.splice(i, 1);
    }
  }

  [Symbol.iterator]() {
    let i = -1;
    let reversed = false;
    return {
      next: () => {
        if (!reversed) {
          i++;
          if (i < this._list.length) {
            return {
              done: false,
              value: this._list[i]
            };
          }
          reversed = true;
          i = this._listReversed.length;
        }
        i--;
        if (i < 0) {
          return {
            done: true,
            value: undefined
          };
        }
        return {
          done: false,
          value: this._listReversed[i]
        };
      }
    };
  }
}


const queue = new ArrayQueue();

for (let i = 0; i < 17; i++) {
	queue.enqueue(i);
}

queue.dequeue();
queue.enqueue(17);

for (q of queue) {
	console.info(q);
}

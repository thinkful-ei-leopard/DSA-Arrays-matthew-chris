const Memory = require('./memory');

let memory = new Memory();

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
  }

  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length +1) * Array.SIZE_RATIO);
    }
    memory.set(this.ptr + this.length, value);
    this.length++;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error('Out of memory');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capacity = size;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    return memory.get(this.ptr + index);
  }

  pop() {
    if (this.length == 0) {
      throw new Error('Index error');
    }
    const value = memory.get(this.ptr + this.length -1 );
    this.length--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index-1);
    this.length--;
  }
}

function main() {
  Array.SIZE_RATIO = 3;

  let arr = new Array();
  
  arr.push(3);
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);
  arr.pop();
  arr.pop();
  arr.pop();

  console.log(arr);
}

main();


//2. 
//What is the length, capacity and memory address of your array?
//length = 1, capacity= 3, ptr = 0
//
//What is the length, capacity and memory address of your array after adding pushes?
//length = 6, capacity= 12, ptr = 3
//
//Explain the result of your program after adding the new lines of code.
//Every push adds 1 to the length, the capacity size is tripled once array capacity is filled,
//and the pointer changes when array is copied to memory space

//3.
//What is the length, capacity, and address of your array?
//length = 3, capacity= 12, ptr = 3
//
//Explain the result of your program after adding the new lines of code.
//the array remains in the same memory space but the length of the array
//decreases by 1 for each pop

//1.
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

//2.
function main() {
  Array.SIZE_RATIO = 3;

  let arr = new Array();
  
  arr.push('tauhida');

  console.log(arr.get(0));
}

// main();
 
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

//4.
//What is the result? 
//NaN
//
//Can you explain your result? 
//The element we added to the array is a string but the memory class was init as float
//
//What is the purpose of the _resize() function in your Array class?
//Copies the data to a new memory space, moves the ptr to that new space, and increases the capacity

//5.
// Complexity: O(n)
function urlify(str) {
  // return str.replace(' ', '%20');
  let result = '';
  for(let i = 0; i < str.length; i++) { //0(n)
    let c = str[i];
    if(c === ' ') { 
      result += '%20';
    } else {
      result += c;
    }
  }
  return result;
}
//console.log(urlify('tauhida parveen'))
//tauhida%20parveen

//6.
// let testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// console.log(filter(testArr, 5));
// Array(5) [5, 6, 7, 8, 9]

// Complexity: O(n)
function filter(arr, num) {
  let result = []; //O(1)
  for(let i = 0; i < arr.length; i++) { //O(n)
    let index = arr[i];
    if(index >= num) {
      result.push(index);
    }
  }
  return result;
}

//7.
// let testArr = [4, 6, -3, 5, -2, 1];
// console.log(maxSum(testArr));
// output: 12
// console.log(fastMaxSum(testArr));
// output: 12

// Our solution
// Complexity: O(n^2)
function maxSum(arr) {
  let sum = 0;
  let maxSum = 0;
  for(let i = 0; i < arr.length; i++) {
    sum = arr[i];
    for(let j = i + 1; j < arr.length; j++) {
      sum += arr[j];
      if(sum > maxSum) {
        maxSum = sum;
      }
    }
  }
  return maxSum;
}

// After some research, can be reduced to O(n)
// Could be reduced even further to O(nlogn),
// however, this would require a 'divide and conquer' method
// that does not end up saving as much time with bigger inputs
function fastMaxSum(arr) {
  let sum = 0;
  let maxSum = 0;
  for(let i = 0; i < arr.length; i++) {
    sum = Math.max(0, sum + arr[i]);
    maxSum = Math.max(sum, maxSum);
  }
  return maxSum;
}

//8

function mergeSort(arr, arr2) {
  let newArr = arr.concat(arr2);
  return newArr.sort();
}

//Complexity: O(logn)
function merge(left, right) {
  let arr = [];

  while(left.length && right.length) {
    if(left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }
  return arr.concat(left.slice().concat(right.slice()));
}

// let testArr = [1, 3, 6, 8, 11];
// let testArr2 = [2, 3, 5, 8, 9, 10];
// console.log(merge(testArr, testArr2));

//9.

// Complexity: O(n^2)
function removeChars(str, charsToRemove) {
  for(let i = 0; i < str.length; i++) {
    let strIndex = str[i];
    for(let j = 0; j < charsToRemove.length; j++) {
      let charIndex = charsToRemove[j];
      if(strIndex !== charIndex) {
        str = str.replace(charIndex, '');
      }
    }
  }
  return str;
}

// let string = 'Battle of the Vowels: Hawaii vs. Grozny'
// let chars = 'aeiou'
// console.log(removeChars(string, chars))
// Bttl f th Vwls: Hw vs. Grzny

//10.
// Complexity: O(n)
function products(arr) {
  let temp = []

  let product = 1
  for (let i = 0; i < arr.length;i++) {
    temp[i] = product
    product *= arr[i]
  }

  product = 1
  for(let i = arr.length -1; i >= 0; i--) {
    temp[i] *= product
    product *= arr[i]
  }

  return temp
}

// let testArray = [1, 3, 9, 4]
// console.log(products(testArray))
//Array(4) [108, 36, 12, 27]
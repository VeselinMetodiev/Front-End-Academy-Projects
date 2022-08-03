import {PointImpl} from "./interfaces.js"

type PrinterFunc = {
    (a: string) : void; //function signature
    description : string; //meta data for the function (not above)
}
interface PrinterFunc2 {
    (a: string) : void;
    description: string;
}

function greeter(fn: PrinterFunc2) { //HOF
    fn(`Hello, World - ${fn.description}`);
  }
function goodbye(fn: PrinterFunc2) { //HOF
    fn(`Goodbye. Have a nice day! - ${fn.description}`);
  }
   
  function printToConsole(s: string) {
    console.log(s);
  }
  printToConsole.description = 'Print to Console';
  printToHTML.description = 'Print to Inner HTML';

  function printToHTML(s: string) {
    const elem =   document.getElementById('results');
    if(elem !== null){
        elem.innerHTML += s + '<br>';
    }
    console.log(s);
  }
   
  greeter(printToConsole);
  greeter(printToHTML);
  goodbye(printToConsole);
  goodbye(printToHTML);

class SomeObject {
    constructor(public name: string){}
}
class SomeOtherObject {
    constructor(public name: string){}
}

  type SomeConstructor<T> = {
    new (s: string): T;
  };
//   type SomeOtherConstructor = {
//     new (s: string): SomeOtherObject;
//   };
  function factory(ctor: SomeConstructor<SomeObject|SomeOtherObject>) {
    return new ctor("hello");
  }

  console.log(factory(SomeObject));
  console.log(factory(SomeOtherObject));
  
  function firstElement<T>(arr: T[]): T {
    return arr[0];
  }

  // s is of type 'string'
const s = firstElement(["a", "b", "c"]).toUpperCase();
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);
console.log(s);
console.log(n);
console.log(u);

function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func);
  }
   
  // Parameter 'n' is of type 'string'
  // 'parsed' is of type 'number[]'
  const parsed = map(["1", "2", "3"], (n) => parseInt(n));

  console.log(parsed);
  
  type Long = { length: number };

  //Constraints
  function longest<T extends Long>(a: T, b: T) {
    if (a.length >= b.length) {
      return a;
    } else {
      return b;
    }
  }
   
  // longerArray is of type 'number[]'
  const longerArray = longest([1, 2], [1, 2, 3]);
  console.log(longerArray);
  
  // longerString is of type 'alice' | 'bob'
  const longerString = longest("alice", "bob");
  console.log(longerString);
  
//   // Error! Numbers don't have a 'length' property
//   const notOK = longest(10, 100);

function minimumLength<Type extends { length: number }>(
    obj: Type,
    minimum: number
  ): { length: number }{
    if (obj.length >= minimum) {
      return obj;
    } else {
      return { length: minimum };
    }
  }

//Callbacks

function myForEach(arr: any[], callback: (arg: any, index: number) => void) {
    for (let i = 0; i < arr.length; i++) {
      callback(arr[i], i);
    }
  }

myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));

function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date; //Signatures
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date { //Declaration
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// const d3 = makeDate(1, 3);
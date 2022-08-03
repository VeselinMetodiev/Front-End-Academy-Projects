// type Point = { // this is a type //constraint of what objects can be put in some places
//     x: number;
//     y: number;
//     z?: number;
//   };

// interface PointI { // this is a type //constraint of what objects can be put in some places
//     x: number;
//     y: number;
//     z?: number;
//   }

  // describe constraints that help to find errors

  export interface Point { // this is a type //constraint of what objects can be put in some places
    x: number;
    y: number;
    z?: number;
    format(): string;
  }

  export class PointImpl implements Point {
    constructor(
        public x: number,
        public y: number,
        public z: number = 0) {}
      format(): string {
          return `[${this.x}]`;
      }
  }

  interface PointDict {
    [key: string]: number
  }

  // Exactly the same as the earlier example
function printCoord(pt: Point) {
    for(const key in pt){
        console.log(`The coordinate's ${key} value is ${(pt as unknown as PointDict)[key]}`);
        
    }
  }
   
  printCoord(new PointImpl(100, 100, 42)); // this is an object

//   const req = { url: "https://example.com", method: "GET" };
//   handleRequest(req.url, req.method);

//   // Change 1:
// const req = { url: "https://example.com", method: "GET" as "GET" };
// // Change 2
// handleRequest(req.url, req.method as "GET");

const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);

function handleRequest(url, method){
    console.log(url, method);
    
}

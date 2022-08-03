function greeter(name = 'Anonimous', date = new Date()): string{
    return `Hello ${name} from Typescript on ${date?.toDateString()}`;
}

document.getElementById('results')!.innerHTML = greeter("Veselin", new Date('1995-12-17T03:24:00'));
document.getElementById('results')!.innerHTML = greeter();
// const elem = document.getElementById('results');
// if(elem !== null) {
//     elem.innerHTML = greeter("Georgi");
// }

function printId(id: number | string){
    //type guarding
    if(typeof id === "string"){
    console.log(id.toUpperCase());
    } else {
        console.log(++id);
    }
}


function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
      // Here: 'x' is 'string[]'
      console.log("Hello, " + x.join(" and "));
    } else {
      // Here: 'x' is 'string'
      console.log("Welcome lone traveler " + x);
    }
  }

  //instanceof guard narrowing
  function logValue(x: Date | string) {
    if (x instanceof Date) {
      console.log(x.toUTCString());               
    } else {
      console.log(x.toUpperCase());           
    }
  }

  logValue(new Date('1995-12-17T03:24:00'));
  logValue("Veselin");

  welcomePeople(["Dimitar", "Ivan", "Hristo"]);
  welcomePeople("John Smith");

printId(42);
printId("abracadabra");

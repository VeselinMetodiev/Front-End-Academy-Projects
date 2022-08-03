class User {
   constructor(public username:string) {}
}

const user = {
    id: 123,
   
    admin: false,
    becomeAdmin: function () {
      this.admin = true;
    },
  };

  interface DB {
    filterUsers(filter: (this: User) => boolean): User[];
  }
   
  const db = getDB();
  const admins = db.filterUsers(function (this: User) {
    return this.username.startsWith('j');
  });

  console.log(admins);

  function getDB() {
    return ({
        users: [new User('john'), new User('jane'), new User('gosho')],
        filterUsers(filter: (this: User) => boolean): User[]{
            const results = [];
            for(const user of this.users){
                if(filter.call(user)){
                    results.push(user);
                }
            }
            return results;
        }
    });
}

function fn(x: string | number) {
    if (typeof x === "string") {
      // do something
    } else if (typeof x === "number") {
      // do something else
    } else {
      x; // has type 'never'!
    }
  }


  // Inferred type is number[] -- "an array with zero or more numbers",
// not specifically two numbers
const args = [8, 5] as const;
const angle = Math.atan2(...args);

//parameter destructuring
function sum({ a, b, c }: { a: number; b: number; c: number }) {
    console.log(a + b + c);
  }

  console.log(sum({a:1,b:2,c:3}));
  
  //functions assignibility
  type voidFunc = () => void;
 
const f1: voidFunc = () => {
  return true;
};
 
const f2: voidFunc = () => true;
 
const f3: voidFunc = function () {
  return true;
};
const LIMIT = 10;

const asyncIterable = {
    [Symbol.asyncIterator](){
        let i = 0;
        return {
            next(){
                const done = i >= LIMIT;
                const value = done ? undefined : i++;
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, 1000, {value, done});
                });
            },
            //Caled if function calls break or return earli in the code
             return() {
                console.log("Interrupted Prematurely");
                return {"done":"true"};
            }
        }
    }
}; //semicolon is needed

//async function

(async () => {
    try {
for await(const num of asyncIterable){
    console.log(num);
    if(num === 3){
        break;
    }
}
    } catch(err) {
        console.log("Error: ", err)
    }
})(); // IIFE



const myIterable = (number = 10) => ({
    [Symbol.iterator]() {
        let first = 0;
        let second = 1;
        let n = 0;
        return {
            next(){
                n++;
                [first, second] = [second, first+second];
                return {
                    value: first,
                    done: number <= n
                }
            }
        }
    }
})

for(const e of myIterable()){
    console.log(e);
}

// for(const e of myIterable(100000)){
//     console.log(e);
// }

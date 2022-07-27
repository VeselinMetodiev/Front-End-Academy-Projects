const myIterable = (to = 10000) => ({
    [Symbol.iterator]() {
        let first = 0;
        let second = 1;
        return {
            next(){
                [first, second] = [second, first+second];
                return {
                    value: first,
                    done: second >= to
                }
            }
        }
    }
})

for(const e of myIterable()){
    console.log(e);
}

for(const e of myIterable(100000)){
    console.log(e);
}

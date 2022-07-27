const myIterable = (to=10000) => ({
    *[Symbol.iterator]() { //No star, no yield, i.e generator function
        for(let first = 0, second = 1; first < to; [first, second] = [second, first + second]) {
            yield first; // <> return value from iterator next()
        }
    }
})

for(const e of myIterable()){
    console.log(e);
}

for(const e of myIterable(1000000)){
    console.log(e);
}
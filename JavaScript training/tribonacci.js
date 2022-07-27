const myIterable = (to=10000) => ({
    *[Symbol.iterator]() { //No star, no yield, i.e generator function
        for(let first = 0, second = 1, third = 1; first < to; [first, second, third] = [second, third, first + second+third]) {
            yield first; // <> return value from iterator next()
        }
    }
})

for(const e of myIterable()){
    console.log(e);
}
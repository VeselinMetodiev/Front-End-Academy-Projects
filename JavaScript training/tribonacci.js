const myIterable = (n = 0, to=100) => ({
    *[Symbol.iterator]() { //No star, no yield, i.e generator function
        for(let first = 0, second = 1, third = 1; n < to; [first, second, third] = [second, third, first + second+third]) {
            yield first; // <> return value from iterator next()
            n++;
        }
    }
})

for(const e of myIterable()){
    console.log(e);
}
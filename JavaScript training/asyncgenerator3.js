async function* numberGen(number) {
    try {
    let i = 0;
    for(i = 0; i < number; i++){
        yield new Promise((resolve, reject) => {
            setTimeout(resolve, 1000, i)
        })
    }
    yield Promise.reject("Rejected error");
    // throw "Rejected error";
} finally { //It must be async generator to execute finally (for Promise.reject)
    console.log("Cleaning up.");
}
}

//async function

(async () => {
    try {
for await(const num of numberGen(5)){
    console.log(num);
}
    } catch(err) {
        console.log("Error: ", err)
    }
})(); // IIFE


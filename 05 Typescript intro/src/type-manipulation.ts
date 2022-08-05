function f() {
    return {x: 10, y: 3};
}

type p = ReturnType<typeof f>;
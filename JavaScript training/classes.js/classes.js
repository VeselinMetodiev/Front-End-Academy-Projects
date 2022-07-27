const READER = 0;
const AUTHOR = 1;
const ADMIN = 2;

const Roles = ['READER', 'AUTHOR', 'ADMIN'];

class Person {
    static nextId = 0;
    id = ++ Person.nextId
    constructor(fName, lName, address) {
        this.fName = fName;
        this.lName = lName;
        this.address = address;
    }
    //private property
#getName() {
    return `${this.fName + " " + this.lName}`;
}
    toString() {
        return `ID: ${this.id}, Name: ${this.#getName}, Address: ${this.address}`
    }
}


//username, password, role

class User extends Person {
    constructor(fName, lName, address, username, password, role = READER){
        super(fName, lName, address);
        this.username = username;
        this.password = password;
        this.role = role;
    }
    toString() { //overriding
        return `${super.toString}, Username: ${this.username}, Password: ${this.password}, Role: ${Roles[this.role]}`;
    }
}

changePassword = function (newPassword){
    this.password = newPassword;
}

const SUPER_ADMIN = {
    __proto__: User.prototype,
    fname:'Default',
    lName: 'Admin',
    address: 'BG',
    username: 'admin',
    password: 'admin',
    role: ADMIN,
    toString() {
        return `SUPERUSER: ${super.toString}`;
    },
    changePassword
}

const p1 = new Person('John', 'Doe', 'London');
const p2 = new Person('Jane', 'Doe', 'NY');
u1 = new User('Ivan', 'Petrov', 'Sofia', 'ivan', 'ivan123');
u2 = new User('Hristina', 'Petrov', 'Sofia', 'hrisi', 'hrisi123', ADMIN);
u3 = new User('Georgi', 'Hristov', 'Plovdiv', 'gogo', 'gogo123', AUTHOR);
const persons = [p1, p2, u1, u2, u3, SUPER_ADMIN];
persons.forEach(p => console.log(p))

console.log(SUPER_ADMIN.toString);
SUPER_ADMIN.changePassword('pass123');
console.log(SUPER_ADMIN.password);
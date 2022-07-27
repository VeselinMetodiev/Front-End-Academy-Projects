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

    toString() {
        return `ID: ${this.id}, Name: ${this.fName + " " + this.lName}, Address: ${this.address}`
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

const p1 = new Person('John', 'Doe', 'London');
const p2 = new Person('Jane', 'Doe', 'NY');
u1 = new User('Ivan', 'Petrov', 'Sofia', 'ivan', 'ivan123');
u2 = new User('Hristina', 'Petrov', 'Sofia', 'hrisi', 'hrisi123', ADMIN);
u3 = new User('Georgi', 'Hristov', 'Plovdiv', 'gogo', 'gogo123', AUTHOR);
const persons = [p1, p2, u1, u2, u3];
persons.forEach(p => console.log(p))
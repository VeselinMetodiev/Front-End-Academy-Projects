function greeter(name: string): string{
    return `Hello ${name} from Typescript`;
}

// document.getElementById('results')!.innerHTML = greeter("Veselin");
const elem = document.getElementById('results');
if(elem != null) {
    elem.innerHTML = greeter("Georgi");
}
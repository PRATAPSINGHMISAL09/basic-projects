const x: number =1 ;
console.log(x);
function greet (name : string){
    console.log(`hello ${name}`);
}
greet('world');

function sum(a: number , b: number): number {
    return a + b;
}
const value : number = sum(1,2);
console.log(value);
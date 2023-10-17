class Retard {
    constructor() {
        this.teste = function(){
            return 1;
        }
    }
}
function setup(){
    debugger;
    var a = new Retard();
    var b = new test();
    b.tester(a);
}
class test {
    constructor() {
        this.tester = function (a) {
            alert(a.teste);
        };
    }
}
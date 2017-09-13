/**
 * @author dadigua
 */

export function a() {
    console.log('b');
}
export function b() {
    console.log('b');
}
let test = () => {
    console.log(this);
};
let test2 = test.bind('123');
test2();
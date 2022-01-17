function test(){
    var  a = 1;
    var b = 2;
    console.log('test', a + b);
}

const test2 = async () => {
    const count = await Promise.resolve(42);
    console.log(count + 1);
}

test();
test2();
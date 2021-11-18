array = ["1", "3", "4", "5"];

array.forEach(x => {
    if (array.indexOf(x) == 1){
        console.log(x);
    }
});

function test(value){

    let passwordArray = new Array(11).fill(" ");

    passwordArray.forEach(x => {

        if (passwordArray.indexOf(x) <= 7){
            passwordArray[passwordArray.indexOf(x)] = "test";
        } else if (passwordArray.indexOf(x) <= 9){
            passwordArray[passwordArray.indexOf(x)] = (Math.floor(Math.random() * 9));
        } else{
            passwordArray[passwordArray.indexOf(x)] = ["!", "?", "."][(Math.floor(Math.random() * 3))];
        }

    });

    console.log(passwordArray)

    let password = passwordArray.join("");

    console.log(password);


}

test(3);
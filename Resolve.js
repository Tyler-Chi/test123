const somePromise = new Promise((resolve, reject) => {

    
    resolve(5);
    reject(6);
});

somePromise.then(
    function(result) {
        console.log("result: ", result);
    },
    function(error) {
        console.log("error: ", error);
    }
)
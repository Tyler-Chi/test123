var createTargetArray = function(nums, index) {
    let targetArray = []
    nums.forEach((value, numsIndex) => {
        const setIndex = index[numsIndex]
        let tempArray
        if(targetArray[setIndex]) {
            tempArray = targetArray.slice(setIndex, targetArray.length)
            console.log("tempArray: ", tempArray);
            targetArray.length = setIndex
            targetArray.push(value)
            targetArray = targetArray.concat(tempArray)
            console.log("targetArray: ", targetArray);
        } else {
            targetArray.push(value)
        }
    })
    return targetArray
};

const out = createTargetArray([1,2,3,4,5],[0,0,0,0,0])
console.log("out: ", out)
var createTargetArray = function(nums, index) {
    let targetArray = []
    nums.forEach((value, numsIndex) => {
        const setIndex = index[numsIndex]
        let tempArray
        if(targetArray[setIndex]) {
            tempArray = targetArray.slice(setIndex, targetArray.length)
            targetArray.length = setIndex
            targetArray.push(value)
            targetArray = targetArray.concat(tempArray)
        } else {
            targetArray.push(value)
        }
    })
    return targetArray
};
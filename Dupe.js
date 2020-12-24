
function deepDupe(twoDimArray) {
    return twoDimArray.map((firstLevelItem) => {
        return Array.isArray(firstLevelItem) ?
            firstLevelItem.map(secondLevelItem => secondLevelItem) :
            firstLevelItem
    });
}

function reverse(arr) {
    let startIndex = 0;
    let endIndex = arr.length - 1;

    while (startIndex < endIndex) {
        let startItem = arr[startIndex];
        let endItem = arr[endIndex];
        // switch them
        arr[endIndex] = startItem;
        arr[startIndex] = endItem;
        startIndex += 1;
        endIndex -= 1;
    }

    return arr;
}

out = reverse([1,2,3,4,5])
console.log(out)
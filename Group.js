// console.log(group(data, 'name'));
//   /*
//   { foo: [ { name: 'foo', id: 7 }, { name:'foo', id: 8 } ],
//     bar: [ { name: 'bar', id: 8 } ] }
//     */
//   console.log(group(data, 'id'));
//   /*
//   { '7': [ { name: 'foo', id: 7 } ],
//     '8': [ { name: 'foo', id: 8 }, { name:'bar', id: 8 } ] }

    const data = [
    {
      name: 'foo',
      id: 7
    },
    {
      name: 'foo',
      id: 8
    },
    {
      name: 'bar',
      id: 8
    }
  ];
  
function group(objectList, key) {
    const output = {};
    
    objectList.forEach(object => {
        const identifier = object[key];
        if (output[identifier]) {
            output[identifier].push(object);
        } else {
            output[identifier] = [object];
        }
    });

    return output;
}

function except(listA, listB) {
    const setB = new Set(listB);
    return listA.filter(el => !setB.has(el));
}

function teachersMerge(...args) {
    Object.assign({}, ...args);
    return args.reduce(function (acc, currentObj) {
        return Object.assign(acc,currentObj)
    }, {})
}

function otherMerge(...args) {
    return Object.assign({}, ...args)
}

let out = otherMerge({ x: 1 }, { y: 2, x: 3})
console.log(out)
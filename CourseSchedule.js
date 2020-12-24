function findOrder(numCourses, prerequisites) {
    const output = [];

    // key/value is courseId/(set of prereqs). This one will update as courses
    // are completed.
    const parentToChild = {};
    // key/value is childId/parentId
    const childToParent = {};

    const nodeIdSet = new Set();
    for (let i = 0 ; i < numCourses; i++) {
        nodeIdSet.add(i);
    }

    // Go through the prerequisites array, populate the above hashes.
    prerequisites.forEach(prerequisite => {
        const [parentId, childId] = prerequisite;
        const currentPrereqSet = parentToChild[parentId];
        parentToChild[parentId] = currentPrereqSet ? currentPrereqSet.add(childId) : new Set([childId]);

        currentParentSet = childToParent[childId];
        childToParent[childId] = currentParentSet ? currentParentSet.add(parentId) : new Set([parentId]);
    });

    // These are the nodes that are at the bottom, because they don't have children. This means they are POTENTIALLY available.
    // Need to initialize the while loop by populating this with the bottom layer of nodes, that for sure don't have children.
    let potentialNodes = [...nodeIdSet].filter(nodeId => !parentToChild[nodeId]);

    while (potentialNodes.length > 0) {
        console.log("potentialNodes: ", potentialNodes);
        const nextPotentialNodes = [];
        potentialNodes.forEach(nodeId => {
            const children = parentToChild[nodeId];
            if (!children || children.size == 0) {
                // This means that the node has no prerequesites, so we will complete it. This means putting it into the output,
                // as well as marking it as complete in any of it's parents.
                output.push(nodeId);
                const parentIdSet = childToParent[nodeId];
                if (parentIdSet && parentIdSet.size > 0) {
                    parentIdSet.forEach(parentId => {
                        parentToChild[parentId].delete(nodeId);
                        if (parentToChild[parentId].size == 0) {
                            // This parentId has no more children.
                            nextPotentialNodes.push(parentId);
                        }
                    });
                }
            }
        });
        potentialNodes = nextPotentialNodes;
    }

    return output.length == numCourses ? output : [];

}

let out = findOrder(3, [[1,0],[1,2],[0,1]]);
console.log(out)

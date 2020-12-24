const parser = require('cron-parser');

// Cache the calculated ones already, so don't need to calculate twice.
const scheduleToTriggerMinutesMap = {};

function convertScheduleToTriggerMinutes(cronExpression) {
    // See if the triggertimes for this schedule has already been calculated.
    if (scheduleToTriggerMinutesMap[cronExpression]) {
        return scheduleToTriggerMinutesMap[cronExpression];
    }

    // Calculate, cache, and return.
    const output = [];

    const options = {
        currentDate: 0,
        endDate: 7 * 24 * 60 * 60 * 1000, // Iterate through a week, excluding months for now.
        iterator: true
    };
    const interval = parser.parseExpression(cronExpression, options);
    while(true) {
        try {
            // Maybe there is a better way to do this:
            const triggerDate = interval.next().value.toDate();
            const triggerMinute = Date.parse(triggerDate) / (60 * 1000);            
            output.push(triggerMinute);
        } catch (err) {
            break;
        }
    }
    scheduleToTriggerMinutesMap[cronExpression] = output;
    return output;
}

const cronExp1 = "0 0 */8 * * *";
const cronExp12 = "0 0 4/8 * * *";

const cronExp2 = "0 0 */6 * * *";
const cronExp22 = "0 0 3/6 * * *";


const testInput = {
    "id1": cronExp1,
    "id2": cronExp2
}

convertScheduleToTriggerMinutes(cronExp12);

/**
 * Takes in input similar to testInput, with key/value pairs of scheduleId/cronExpression.
 */
function validateScheduleCombination(scheduleCombination, minTriggerGap) {
    const offendingIds = new Set();
    const triggerTimeToIdMap = {};

    for (const [scheduleId, cronExpression] of Object.entries(scheduleCombination)) {
        const triggerMinutes = convertScheduleToTriggerMinutes(cronExpression);
        triggerMinutes.reduce((acc, triggerMinute) => {
            const currentIdSet = acc[triggerMinute];
            if (currentIdSet) {
                currentIdSet.add(scheduleId);
                // b/c this was already populated, these are all offending ids.
                currentIdSet.forEach(id => offendingIds.add(id));
            } else {
                acc[triggerMinute] = new Set([scheduleId]);
            }
            return acc;
        }, triggerTimeToIdMap);
    }

    // By this time, the ids of schedules that collide have been put in offendingIds. Now need
    // to check the intervals between the triggers. Ideally there would be a mergeSort of all the possible
    // triggerTimes...for now this is fine:
    const allTriggerTimes = Object.keys(triggerTimeToIdMap).sort((a, b) => a - b);
    const scheduleCount = Object.keys(scheduleCombination).length;

    for (let i = 0; i < allTriggerTimes.length - 1; i++) {
        if (offendingIds.size == scheduleCount) {
            break;
        }
        const trigger1 = allTriggerTimes[i];
        const trigger2 = allTriggerTimes[i + 1];
        if (trigger2 - trigger1 < minTriggerGap) {
            mergeSets(
                offendingIds,
                triggerTimeToIdMap[trigger1],
                triggerTimeToIdMap[trigger2]
            );
        }
    }
    return offendingIds;
}

// Add this one to the UTIL class. used for merging multiple sets into a new set
function mergeSets(outputSet, ...inputSets) {
    return inputSets.reduce((acc, inputSet) => {
        inputSet.forEach(el => acc.add(el));
        return acc;
    }, outputSet);
}

const out = validateScheduleCombination(testInput, 60);
console.log(out);
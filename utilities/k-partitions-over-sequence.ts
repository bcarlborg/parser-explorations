
function allBinaryStringsWithIOnes(i: number, len: number): string[] {
    if (i === 0) return ['0'.repeat(len)];
    else if (len === 0) return [];
    else if (i === len) return ['1'.repeat(len)];
    else {
        // we can define all strings of length n with i ones recursively as the combined set of the following
        // '1' prepended to all strings with (i-1) ones over length len - 1
        // '0' prepended to all strings with ( i ) ones over length len - 1
        const stringsStartingWithOne = allBinaryStringsWithIOnes(i - 1, len - 1).map((str) => '1' + str);
        const stringsStartingWithZero = allBinaryStringsWithIOnes(i, len - 1).map((str) => '0' + str);

        return [...stringsStartingWithOne, ...stringsStartingWithZero];
    }
}

export function generateKPartitionsOverSequence(k: number, sequenceStartNumber: number, sequenceEndNumber: number) {
    const sequenceLength = sequenceEndNumber - sequenceStartNumber + 1;
    if (k < 1 || sequenceLength < 1) throw new Error('invalid paritition for elements values');

    const oneStrings = allBinaryStringsWithIOnes(k - 1, sequenceLength - 1);

    return oneStrings.map(oneString => {
        let paritionIndexes = [];
        let currentPartitionStart = sequenceStartNumber;
        let currentPartitionEnd = sequenceStartNumber;

        for (let i = 0; i < oneString.length; i++) {
            const char = oneString[i];

            if (char === '1') {
                paritionIndexes.push([currentPartitionStart, currentPartitionEnd])
                currentPartitionStart = currentPartitionEnd + 1;
            }

            currentPartitionEnd++;
        }

        paritionIndexes.push([currentPartitionStart, sequenceEndNumber]);
        return paritionIndexes;
    });
}
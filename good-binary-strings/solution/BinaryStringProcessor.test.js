const BinaryStringProcessor = require('./BinaryStringProcessor');

describe('BinaryStringProcessor', () => {
    const testCases = [
        {
            name: "provided sample test #1",
            input: "11011000",
            expectedOutput: "11100100"
        },
        {
            name: "provided sample test #2",
            input: "1100",
            expectedOutput: "1100"
        },
        {
            name: "provided sample test #3",
            input: "1101001100",
            expectedOutput: "1101001100"
        },

        // Other edge cases tests
        {
            name: "empty string",
            input: "",
            expectedOutput: "Invalid binary string"
        },
        {
            name: "single character string",
            input: "1",
            expectedOutput: "Invalid binary string"
        },
        {
            name: "single character string",
            input: "0",
            expectedOutput: "Invalid binary string"
        },
        {
            name: "non binary string value is provided",
            input: "NoneBinaryString",
            expectedOutput: "Invalid binary string"
        },
        {
            name: "disproportionate count of zeros and ones",
            input: "11100",
            expectedOutput: "Invalid binary string"
        },
        {
            name: "prefix contains a greater number of zeros than ones",
            input: "10010",
            expectedOutput: "Invalid binary string"
        },
        {
            name: "basic valid binary string",
            input: "10",
            expectedOutput: "10"
        },
        {
            name: "simple good binary string",
            input: "110010",
            expectedOutput: "110010"
        },
        {
            name: "swap two substrings to get a larger value",
            input: "1010111000",
            expectedOutput: "1110001010"
        },
    ]

    testCases.forEach((testCase) => {
        it(`Should return ${testCase.expectedOutput} for ${testCase.name} [${testCase.input}]`, () => {
            const result = BinaryStringProcessor.processAndReturnLargestGoodString(testCase.input);
            expect(result).toBe(testCase.expectedOutput);
        });
    });
});
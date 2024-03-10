const BinaryStringProcessor = {
    checkGoodString: function(binaryString) {
        let numberOfOnes = 0;
        let numberOfZeros = 0;
        let isBinaryStringEmpty = binaryString.length === 0;

        if(isBinaryStringEmpty) {
            return false;
        }

        for (let character of binaryString) {
            let isCharacterOne = character === '1';
            let isCharacterZero = character === '0';

            if (isCharacterOne) {
                numberOfOnes += 1;
            } else if (isCharacterZero) {
                numberOfZeros += 1;
            } else {
                return false;
            }

            let areMoreZerosThanOnes = numberOfOnes < numberOfZeros;

            if (areMoreZerosThanOnes) {
                return false;
            }
        }

        let areNumberOfZerosAndOnesEqual = numberOfZeros === numberOfOnes;

        return areNumberOfZerosAndOnesEqual;
    },

    findLargestGoodString: function(prefix, binaryString, curLargeValue) {
        if (binaryString.length < 2) {
            return curLargeValue;
        }

        let goodSubstrings = [];
        let currentSubstring = "";

        binaryString.split('').forEach(char => {
            currentSubstring += char;

            if (this.checkGoodString(currentSubstring)) {
                goodSubstrings.push(currentSubstring);
                currentSubstring = "";
            }
        });

        goodSubstrings.sort().reverse();

        let largestGoodString = prefix + goodSubstrings.join("") + currentSubstring;

        let goodStringValue = parseInt(largestGoodString, 2);

        if (goodStringValue > curLargeValue) {
            curLargeValue = goodStringValue;
        }

        return this.findLargestGoodString(prefix + binaryString[0], binaryString.slice(1), curLargeValue);
    },

    processAndReturnLargestGoodString: function(binaryString) {
        if (!this.checkGoodString(binaryString)) {
            return "Invalid binary string";
        }

        let largestGoodString = this.findLargestGoodString("", binaryString, 0).toString(2);
        return largestGoodString;
    }
};

module.exports = BinaryStringProcessor;
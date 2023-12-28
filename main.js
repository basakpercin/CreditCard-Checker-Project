// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:

//validateCred return true if array contains digits of a valid card number false if not, should not mutate original array.

function validateCred(array) {
    let len = array.length;
    let doubledDigit = 0;
    let checkArray = [];
    let sum = 0;

    if (len % 2 == 0){
        for (let i = len - 1; i >= 0; i--){
            if(i % 2 == 1){
                checkArray.unshift(array[i]);
                sum += array[i];
            } else {
                doubledDigit = array[i] * 2;
                if(doubledDigit > 9){
                    doubledDigit = doubledDigit - 9;
                }
                sum += doubledDigit;
                checkArray.unshift(doubledDigit);
            }
        }
    } else {
        for (let i = len - 1; i >= 0; i--){
            if(i % 2 == 0){
                sum += array[i];
                checkArray.unshift(array[i]);
            } else {
                doubledDigit = array[i] * 2;
                if(doubledDigit > 9){
                    doubledDigit = doubledDigit - 9;
                }
                sum += doubledDigit;
                checkArray.unshift(doubledDigit);
            }
        }
    }
    return(sum % 10 == 0);
};

function findInvalidCards(nestedArray) {
    let invalidArray = [];
    for(let i = 0; i < nestedArray.length; i++){
        if(validateCred(nestedArray[i]) == false){
            invalidArray.push(nestedArray[i]);
        }
    }
    return invalidArray;
};

//takes in a nested array of invalid numbers, returns array of companies, or company not found, no duplicates.
function idInvalidCardCompanies(nestedArray){
    let companyArray = [];
    let invalidArray = findInvalidCards(nestedArray);
    for(let i = 0; i < invalidArray.length; i++){
        if(invalidArray[i][0] == 3) {
            if(companyArray.indexOf('Amex') == -1){
                companyArray.push('Amex');
            }
        } else if(invalidArray[i][0] == 4){
            if(companyArray.indexOf('Visa') == -1){
                companyArray.push('Visa');
            }
        } else if(invalidArray[i][0] == 5){
            if(companyArray.indexOf('Mastercard') == -1){
                companyArray.push('Mastercard');
            }
        } else if(invalidArray[i][0] == 6){
            if(companyArray.indexOf('Discover') == -1){
                companyArray.push('Discover');
            }
        } else {
                console.log('Company not found');
            }
    }
    return companyArray;
};

// console.log(validateCred(mystery1));

console.log(idInvalidCardCompanies(batch));

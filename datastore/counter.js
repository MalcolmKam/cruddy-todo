const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    // console.log(err, ' err ', Number(fileData), ' filedata');
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
  readCounter((err, count) => {
    count++;
    writeCounter(count, (err, counterString) => {
      callback(err, counterString);
    });
  });
};

// writeCounter(count, (callback) => callback(null, counterString))

// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');

// exports.getNextUniqueId = () => {

//   var currentCount = readCounter((err, x) => {

//     // resultof cb = callbackinvoked
//     // writecounter(resultofprevcb)


//   });
//   console.log(currentCount, 'currentcount');
//   writeCounter(currentCount, (err, counter) => {
//     counter++;
//   });


//   // var count = readcounter()
//   // does readcounter
//     // read 0 -> return 0 out

//     // writeCounter gets 00000 version of ^
//     // callback sets new counter to 1

//     // looks counter.txt,

//   // counter = counter + 1;
//   // return zeroPaddedNumber(counter);
// };

// exports.getNextUniqueId = (callback) => {
//   readCounter((error, count) => {
//     if (error) {
//       throw ('error reading');
//     } else {
//       //increment count
//       count++;
//       //call write counter with the count
//       writeCounter(count, (counterString) => {

//         callback(counterString); // addtoDom(ounterstring)

//       });
//     }
//   });

// };

/**
 *
 * (err, id) => {
      expect(err).to.be.null;
      expect(id).to.exist;
      done();
    }
 */



// exports.getNextUniqueId = () => {
//   readCounter((error, count) => {
//     if (error) {
//       throw ('error reading');
//     } else {
//       //increment count
//       count++;
//       //call write counter with the count
//       writeCounter(count, (error, counterString) => {
//         if (error) {
//           throw ('error writing');
//         } else {
//           console.log('REACHED END OF WRITECOUNTER', counterString);
//           return counterString; // addtoDom(ounterstring)
//         }
//       });
//     }
//   });
// };
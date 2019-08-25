const HashidsGenerator = require('hashids');
// Never include 0's or 1's or i's or d's in hash :)
const hashids = new HashidsGenerator(
  'e476ebb5-56fa-4d0e-83e0-143077d2cc31',
  0, 'abcefghjklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ23456789'
);
 
const encoder = (id) => {
  // Lowercase value
  const lowercase = id+''.toLowerCase();
  // split the value into groups of 10 for encoding
  const groups = lowercase.match(/.{1,10}/g);
  // encode each section as base 10 to be hashed
  baseTens = groups.map( ( group ) => {
    return parseInt(group,36).toString(10);
  });
  // hash the value
  return hashids.encode(baseTens);
};

const decoder = (id) => { 
  // Decode the encoded base 10 values back into groups of 10
  const groups = hashids.decode(id);
  // encode each section as base 36 to go back to original value
  return groups.map( ( group ) => {
    return parseInt(group,10).toString(36);
  }).join('');  
};

const encode = (id) => {
  const parts = id.split('-');
  return parts.map( part => encoder(part) ).join('-');
}

const decode = (id) => {
  const parts = id.split('-');
  return parts.map( part => decoder(part) ).join('-');
}

const str1 = 'TheQuickBrownFoxJumpedOverTheFat69PoundLazzzydog';
const str2 = 'id-177890';
const str3 = 'id-199024-Joe-Puzzo';
const en1 = encode(str1);
const en2 = encode(str2);
const en3 = encode(str3);


console.log('Encoded', en1);
console.log('Decoded', decode(en1));
console.log('Encoded', en2);
console.log('Decoded', decode(en2));
console.log('Encoded', en3);
console.log('Decoded', decode(en3));


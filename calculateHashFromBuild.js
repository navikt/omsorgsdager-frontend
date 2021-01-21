const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');

let fileToGenerateHash;
process.argv.forEach((val, index) => {
  if(index == 2) fileToGenerateHash = val;
});

console.log(`-------------------------------  Generated hashes  --------------------------------`);

const pathToFile = path.join(__dirname, '/build', `/${pkg.version}`, fileToGenerateHash);
const hashSHA256 = crypto.createHash('sha256');
const hashSHA384 = crypto.createHash('sha384');

const stream = fs.ReadStream(pathToFile);
stream.on('data', (data) => {
  hashSHA256.update(data);
  hashSHA384.update(data);
});

stream.on('end', () => {
  const base64EncodedSHA256Hash = hashSHA256.digest('base64');
  const base64EncodedSHA384Hash = hashSHA384.digest('base64');
  console.log(`SHA256 ${fileToGenerateHash}: ${base64EncodedSHA256Hash}`);
  console.log(`SHA384 ${fileToGenerateHash}: ${base64EncodedSHA384Hash}`);
  console.log('-----------------------------------------------------------------------------------');
});

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');

console.log('------------------ Generating SHA256 hash -----------------');

let fileToGenerateHash;
process.argv.forEach((val, index) => {
  if(index == 2) fileToGenerateHash = val;
});

const pathToFile = path.join(__dirname, '/build', `/${pkg.version}`, fileToGenerateHash);
const hash = crypto.createHash('sha256');

const stream = fs.ReadStream(pathToFile);
stream.on('data', (data) => {
  hash.update(data);
});

stream.on('end', () => {
  const base64EncodedHash = hash.digest('base64');
  console.log(`${fileToGenerateHash}: ${base64EncodedHash}`);
  console.log('-----------------------------------------------------------');
});

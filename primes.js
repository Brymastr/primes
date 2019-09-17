const fs = require('fs');
const inputFile = fs.readFileSync('./primes.txt', 'utf8');
const outputFile = fs.createWriteStream('./output.dat', { flags: 'w' });

const primes = inputFile.split(/[^0-9]+/);
primes.shift();

(async () => {
  let i = 0,
    num = 1;
  let lastPrime = 0;
  const limit = 32452843;
  while (true) {
    const currentPrime = primes[i++];

    const numberOfZeros = currentPrime - lastPrime - 1;
    for (let j = 0; j < numberOfZeros; j++) {
      await write('0');
      num++;
    }
    lastPrime = currentPrime;
    await write('1');
    if (++num >= limit) break;
  }
})();

async function write(num) {
  if (!outputFile.write(num)) {
    await new Promise(resolve => outputFile.once('drain', resolve));
    outputFile.write(num);
  }
  return;
}

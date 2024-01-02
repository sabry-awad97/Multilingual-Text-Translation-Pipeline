import translate from '@vitalets/google-translate-api';

import * as readline from 'node:readline/promises';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  const text = await rl.question('Enter text to translate: ');
  const result = await translate(text, { from: 'en', to: 'de' });
  console.log(result.text);
  rl.close();
}

main();

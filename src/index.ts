import { Readable, Writable } from 'stream';
import { pipeline } from 'stream/promises';
import { ThrottleStream } from './ThrottleStream';
import { TranslateStream } from './TranslateStream';

async function main() {
  const stdinReadable: Readable = process.stdin;
  const stdoutTransform: Writable = process.stdout;

  // Handling errors
  stdinReadable.on('error', error => {
    console.error('Error reading from stdin:', error);
  });

  stdoutTransform.on('error', error => {
    console.error('Error writing to stdout:', error);
  });

  const delayBetweenChunks = 500;
  const throttle = new ThrottleStream(delayBetweenChunks);
  const translator = new TranslateStream();

  pipeline(stdinReadable, throttle, translator, stdoutTransform).catch(
    error => {
      console.error('Pipeline encountered an error:', error);
    }
  );
}

main();

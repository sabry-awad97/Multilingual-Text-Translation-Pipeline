import { Transform, TransformCallback } from 'stream';
import { setTimeout } from 'timers/promises';

export class ThrottleStream extends Transform {
  private throttleTime: number;
  private lastPushTime: number;

  constructor(throttleTime: number) {
    super();
    this.throttleTime = throttleTime;
    this.lastPushTime = Date.now();
  }

  async _transform(chunk: any, encoding: string, callback: TransformCallback) {
    const now = Date.now();
    const elapsed = now - this.lastPushTime;

    if (elapsed < this.throttleTime) {
      let remainingTime = this.throttleTime - elapsed;
      while (remainingTime > 0) {
        // Wait in chunks of 10ms for responsiveness
        const waitTime = Math.min(remainingTime, 10);
        remainingTime -= waitTime;
        await setTimeout(waitTime);
      }
    }

    callback(null, chunk);
    this.lastPushTime = Date.now();
  }
}

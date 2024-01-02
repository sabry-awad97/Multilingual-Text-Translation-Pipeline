import { Transform } from 'stream';
import translate from '@vitalets/google-translate-api';

export class TranslateStream extends Transform {
  private retries: number = 0;

  private async translateWithRetry(text: string): Promise<string | null> {
    try {
      const res = await translate(text, { to: 'es' });
      return res.text || null;
    } catch (error) {
      console.error('Error in translation service:', error);
      return null;
    }
  }

  async _transform(chunk: Buffer, encoding: string, callback: Function) {
    const data: string = chunk.toString();
    const translation: string | null = await this.translateWithRetry(data);
    if (translation !== null) {
      this.push(`'${translation}'\n`);
    } else {
      this.retries++;
      if (this.retries < 3) {
        await this._transform(chunk, encoding, callback); // Retry translation
      } else {
        console.error('Fatal error, retrying is not helping');
        this.retries = 0;
      }
    }

    callback();
  }
}

import { CronStringPipe } from './cron-string.pipe';

describe('CronStringPipe', () => {
  it('create an instance', () => {
    const pipe = new CronStringPipe();
    expect(pipe).toBeTruthy();
  });
});

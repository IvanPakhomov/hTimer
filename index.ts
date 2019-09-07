export class Timer {
  private _minutes: number = 0;
  private _seconds: number = 0;
  private startTime: number = 0;
  private endTime: number = 0;
  private timeout: NodeJS.Timeout = null;

  minutes(minutes: number) {
    this._minutes = minutes;

    return this;
  }

  seconds(seconds: number) {
    this._seconds = seconds;

    return this;
  }

  listen(cb: CallableFunction = null) {
    if (!cb) {
      return;
    }

    this.timeout = setTimeout(() => {
      if (this.isExpired()) {
        this.stop();
        cb();
      }
    }, 1000);
  }

  stop() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  start() {
    let length = this._minutes * 60 + this._seconds;
    this.startTime = ~~(Date.now() / 1000);
    this.endTime = this.startTime + length;

    return this;
  }

  update() {
    let length = this._minutes * 60 + this._seconds;
    this.endTime = this.startTime + length;
  }

  isExpired() {
    let now = ~~(Date.now() / 1000);

    return now >= this.endTime;
  }
}
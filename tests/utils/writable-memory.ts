import { Duplex } from "node:stream";


export class WritableMemory extends Duplex {

  public override _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void) {
    this.push(chunk);
    callback();
  }


  public override _read() {}


  public override _final(callback: (error?: Error | null) => void) {
    this.push(null);
    callback();
  }

}

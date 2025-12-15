export const LinePrinter = {
  async run(path: string): Promise<void> {
    const f = await Deno.open(path);
    const dec = new TextDecoder("utf-8");
    const BUF_SIZE = 64 * 1024;
    const buf = new Uint8Array(BUF_SIZE);
    let lineBuf: number[] = [];

    try {
      while (true) {
        const r = await f.read(buf);
        const n = r?.n ?? 0;
        const eof = r?.eof ?? false;

        if (n > 0) {
          for (let i = 0; i < n; i++) {
            const b = buf[i];
            if (b === 0x0A) { // '\n'
              // CRLF の '\r' を取り除く
              if (lineBuf.length > 0 && lineBuf[lineBuf.length - 1] === 0x0D) lineBuf.pop();
              console.log(dec.decode(Uint8Array.from(lineBuf)));
              lineBuf = [];
            } else {
              lineBuf.push(b);
            }
          }
        }

        if (eof) break;
      }

      // 最後の行が改行で終わらない場合の出力
      if (lineBuf.length > 0) {
        if (lineBuf[lineBuf.length - 1] === 0x0D) lineBuf.pop();
        console.log(dec.decode(Uint8Array.from(lineBuf)));
      }
    } finally {
      f.close();
    }
  }
};

LinePrinter.run("README.md").catch(console.error);

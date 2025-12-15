import {Connector} from 'glue'
import {VimWriter} from 'writer'
import {Denops} from "jsr:@denops/std@^7.0.0/function";

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = new Connector(denops, (handler, fname)=>new VimWriter(handler, fname))
}

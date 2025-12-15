export class Writer{
  filename: string = ''
  connector: any
  constructor(connector: any, filename: string = ''){ }
  async makefile(filename: string = ''){}
  async reset(filename: string = ''){}
  async hide(filename: string = ''){}
  async write(text: string, filename: string = ''){}
  async message(text: string){ }
}


export class DenoWriter{
  connector: any
  filename: string = ''
  constructor(connector: any, filename: string = ''){
    this.connector = connector
    this.filename = filename
  }
  async makefile(filename: string){
  }
  async reset() {
  }
  async hide() {
  }
  async write(text: string, filename: string = ''){
    Deno.stdout.write(new TextEncoder().encode(text))
  }
  async message(text: string){
    console.log(text)
  }
}

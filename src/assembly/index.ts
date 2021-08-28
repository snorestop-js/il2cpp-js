import { Il2CppReference } from "../reference";
import { Il2CppImage } from "../image";
import util from "util"

export class Il2CppAssembly extends Il2CppReference<"Il2CppAssembly"> {
  [util.inspect.custom](): string {
    return `[Il2CppAssembly (${this.getPointer().toString(16).padStart(8, "0")})] { \n  name: "${this.getName()}"\n  image: ${this.getImage()[util.inspect.custom]().split("\n").map(n => `  ${n}`).join("\n").slice(2)}\n}`
  }

  getImage(): Il2CppImage {
    return __IL2CPP.il2cpp_assembly_get_image(this.getPointer()).asPointer().of(Il2CppImage);
  }

  getName(): string {
    const [aname] = new Int32Array(__IL2CPP.snorestop_create_buffer_readonly(4, this.getPointer() + 16));
    // const stringIndex = MemoryView.fromPointer(this.getPointer()).readI32(16);

    let i = 0;
    let currChar = 0;
    let str = "";

    do {
      currChar = new Uint8Array(__IL2CPP.snorestop_create_buffer_readonly(1, aname + (i++)))[0]

      if (currChar !== 0) {
        str += String.fromCharCode(currChar);
      }
    } while (currChar !== 0)

    return str;
  }
}

import { Il2CppClass } from "../class";
import { Il2CppReference } from "../reference";
import { Il2CppType } from "../type";

export class Il2CppPropertyInfo extends Il2CppReference<"PropertyInfo"> {
  getName(): string {
    const [aname] = new Int32Array(__IL2CPP.snorestop_create_buffer_readonly(4, this.getPointer() + 4));
    // const stringIndex = MemoryView.fromPointer(this.getPointer()).readI32();

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

  getParent(): Il2CppClass {
    const [parent] = new Int32Array(__IL2CPP.snorestop_create_buffer_readonly(4, this.getPointer()));
    return parent.asPointer().of(Il2CppClass);
  }
}

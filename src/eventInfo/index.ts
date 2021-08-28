import { Il2CppClass } from "../class";
import { Il2CppReference } from "../reference";
import { Il2CppType } from "../type";

export class Il2CppEventInfo extends Il2CppReference<"EventInfo"> {
  getName(): string {
    const [aname] = new Int32Array(__IL2CPP.snorestop_create_buffer_readonly(4, this.getPointer()));
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

  getType(): Il2CppType {
    const [eventType] = new Int32Array(__IL2CPP.snorestop_create_buffer_readonly(4, this.getPointer() + 4));
    return eventType.asPointer().of(Il2CppType);
  }

  getParent(): Il2CppClass {
    const [parent] = new Int32Array(__IL2CPP.snorestop_create_buffer_readonly(4, this.getPointer() + 8));
    return parent.asPointer().of(Il2CppClass);
  }
}

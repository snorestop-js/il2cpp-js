import { Il2CppClass } from "../class";
import { Il2CppReference } from "../reference";
import { Il2CppType } from "../type";

export class Il2CppEventInfo extends Il2CppReference<"EventInfo"> {
  getName(): string {
    const stringPtr = MemoryView.fromPointer(this.getPointer()).readPtr();

    let currChar = 0;
    let str = "";

    do {
      currChar = stringPtr.readU8();

      if (currChar !== 0) {
        str += String.fromCharCode(currChar);
      }
    } while (currChar !== 0)

    return str;
  }

  getType(): Il2CppType {
    return MemoryView.fromPointer(this.getPointer()).readU32(4).asPointer().of(Il2CppType);
  }

  getParent(): Il2CppClass {
    return MemoryView.fromPointer(this.getPointer()).readU32(8).asPointer().of(Il2CppClass);
  }
}

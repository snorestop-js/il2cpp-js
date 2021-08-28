import { Il2CppClass } from "../class";
import { Il2CppReference } from "../reference";
import { Il2CppType } from "../type";

export class Il2CppPropertyInfo extends Il2CppReference<"PropertyInfo"> {
  getName(): string {
    const stringPtr = MemoryView.fromPointer(this.getPointer()).readPtr(4);

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

  getParent(): Il2CppClass {
    return MemoryView.fromPointer(this.getPointer()).readU32().asPointer().of(Il2CppClass);
  }
}

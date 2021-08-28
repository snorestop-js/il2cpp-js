import { Il2CppClass } from "../class";
import { Il2CppReference } from "../reference";
import { Il2CppType } from "../type";
import util from "util";

export class Il2CppEventInfo extends Il2CppReference<"EventInfo"> {
  [util.inspect.custom](): string {
    return `[Il2CppEventInfo (${this.getPointer().toString(16).padStart(8, "0")})] { \n  name: "${this.getName()}"\n  type: ${this.getType()[util.inspect.custom]().split("\n").join("\n  ")},\n  parent: ${this.getParent()[util.inspect.custom]().split("\n").join("\n  ")}\n}`
  }

  getName(): string {
    return MemoryView.fromPointer(MemoryView.fromPointer(this.getPointer()).readPtr()).readCString();
  }

  getType(): Il2CppType {
    return MemoryView.fromPointer(this.getPointer()).readU32(4).asPointer().of(Il2CppType);
  }

  getParent(): Il2CppClass {
    return MemoryView.fromPointer(this.getPointer()).readU32(8).asPointer().of(Il2CppClass);
  }
}

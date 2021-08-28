import { Il2CppClass } from "../class";
import { Il2CppReference } from "../reference";
import util from "util";

export class Il2CppPropertyInfo extends Il2CppReference<"PropertyInfo"> {
  [util.inspect.custom](): string {
    return `[Il2CppPropertyInfo (${this.getPointer().toString(16).padStart(8, "0")})] { \n  name: "${this.getName()}"\n  parent: ${this.getParent()[util.inspect.custom]().split("\n").join("\n  ")},\n  parent: ${this.getParent()[util.inspect.custom]().split("\n").join("\n  ")}\n}`
  }

  getName(): string {
    return MemoryView.fromPointer(MemoryView.fromPointer(this.getPointer()).readPtr(4)).readCString();
  }

  getParent(): Il2CppClass {
    return MemoryView.fromPointer(this.getPointer()).readU32().asPointer().of(Il2CppClass);
  }
}

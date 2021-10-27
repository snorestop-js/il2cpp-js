import { Il2CppObject } from "../object";
import util from "util";

export class Il2CppString extends Il2CppObject<"Il2CppString"> {
  static fromJsString(str: string): Il2CppString {
    return __IL2CPP.il2cpp_string_new(str).asHandle().to(Il2CppString);
  }

  [util.inspect.custom](): string {
    return `[Il2CppString (${this.getPointer().toString(16).padStart(8, "0")})] ${JSON.stringify(this.getContent())}`
  }

  getLength(): number {
    return MemoryView.fromPointer(this.getPointer() + Il2CppObject.getHeaderSize()).readI32();
  }

  getContentPointer(): IntPtr<any> {
    return this.getPointer() + Il2CppObject.getHeaderSize() + 4;
  }

  getContent(): string {
    return MemoryView.fromPointer(this.getPointer() + Il2CppObject.getHeaderSize() + 4).readCString(true);
  }
}

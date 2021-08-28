import { Il2CppObject } from "../object";

export class Il2CppString extends Il2CppObject<"Il2CppString"> {
  static fromJsString(str: string): Il2CppString {
    return __IL2CPP.il2cpp_string_new(str).asPointer().of(Il2CppString);
  }

  getLength(): number {
    return MemoryView.fromPointer(this.getPointer() + Il2CppObject.getHeaderSize()).readI32();
  }

  getContent(): string {
    return MemoryView.fromPointer(this.getPointer() + Il2CppObject.getHeaderSize() + 4).readCString(true);
  }
}

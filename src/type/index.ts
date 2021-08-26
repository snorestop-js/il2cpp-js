import { inspect } from "util";

export class Il2CppType {
  private static cache: Map<IntPtr<"Il2CppType">, Il2CppType> = new Map();

  private constructor(
    private ptr: IntPtr<"Il2CppType">,
  ) {
    if (ptr === 0) throw new Error("Constructed Il2CppType with NullPtr");

    Il2CppType.cache.set(ptr, this);
  }

  static fromPointer(pointer: IntPtr<"Il2CppType">): Il2CppType {
    if (this.cache.has(pointer)) return this.cache.get(pointer)!

    return new Il2CppType(pointer);
  }

  [inspect.custom](): string {
    return `[IL2CPP ${this.isStatic() ? "Static " : ""}Type {${this.getName()}} (0x${this.ptr.toString(16).padStart(8, "0")})]`
  }

  getName(): string {
    return __IL2CPP.il2cpp_type_get_name(this.ptr);
  }

  isStatic(): boolean {
    return __IL2CPP.il2cpp_type_is_static(this.ptr);
  }

  getUnderlyingType() {
    return __IL2CPP.il2cpp_type_get_type(this.ptr);
  }
}

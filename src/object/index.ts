import { inspect } from "util";
import { Il2CppClass } from "../class";
import { Il2CppField } from "../field";

export class Il2CppObject {
  private static cache: Map<IntPtr<"Il2CppObject">, Il2CppObject> = new Map();

  private constructor(
    private ptr: IntPtr<"Il2CppObject">,
  ) {
    if (ptr === 0) throw new Error("Constructed Il2CppObject with NullPtr");

    Il2CppObject.cache.set(ptr, this);
  }

  static fromPointer(pointer: IntPtr<"Il2CppObject">): Il2CppObject {
    if (this.cache.has(pointer)) this.cache.get(pointer)!;

    return new Il2CppObject(pointer);
  }

  [inspect.custom](): string {
    return `[IL2CPP Object (0x${this.ptr.toString(16).padStart(8, "0")})]`
  }

  getPointer(): IntPtr<"Il2CppObject"> {
    return this.ptr;
  }

  getClass(): Il2CppClass {
    return Il2CppClass.fromPointer(__IL2CPP.il2cpp_object_get_class(this.ptr));
  }

  // getField(): Il2CppField {
  //   return Il2CppField.fromPointer(IL2Cpp)
  // }
}

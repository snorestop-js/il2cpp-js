import { inspect } from "util";
import { Il2CppClass } from "../class";

export class Il2CppArray<T> {
  private static cache: Map<IntPtr<"Il2CppArray">, Il2CppArray<any>> = new Map();

  private constructor(
    private ptr: IntPtr<"Il2CppArray">,
  ) {
    if (ptr === 0) throw new Error("Constructed Il2CppArray with NullPtr");

    Il2CppArray.cache.set(ptr, this);
  }

  static fromPointer(pointer: IntPtr<"Il2CppArray">): Il2CppArray<any> {
    if (this.cache.has(pointer)) this.cache.get(pointer)!;

    return new Il2CppArray(pointer);
  }

  [inspect.custom](): string {
    return `[IL2CPP Array [${this.getLength()}] (0x${this.ptr.toString(16).padStart(8, "0")})]`
  }

  getPointer(): IntPtr<"Il2CppArray"> {
    return this.ptr;
  }

  getLength(): number {
    return __IL2CPP.il2cpp_array_length(this.ptr);
  }

  getSize(): number {
    return __IL2CPP.il2cpp_array_get_byte_length(this.ptr);
  }

  getClass(): Il2CppClass {
    return Il2CppClass.fromPointer((new Uint32Array(__IL2CPP.snorestop_create_buffer_readonly(4, this.ptr))[0]) as IntPtr<any>)
  }
}

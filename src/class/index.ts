import { Image } from "../image";

export class Class {
  private static cache: Map<IntPtr<"Il2CppClass">, Class> = new Map();

  private constructor(
    private ptr: IntPtr<"Il2CppClass">,
  ) {
    if (ptr === 0) throw new Error("Constructed Il2CppClass with NullPtr");

    Class.cache.set(ptr, this);
  }

  static fromPointer(pointer: IntPtr<"Il2CppClass">): Class {
    if (this.cache.has(pointer)) return this.cache.get(pointer)!

    return new Class(pointer);
  }

  static fromName(image: Image, namespace: string, name: string): Class | undefined {
    const pointer = __IL2CPP.il2cpp_class_from_name(image.getPointer(), namespace, name);

    if (pointer === 0) {
      return undefined;
    }

    return new Class(pointer);
  }

  getPointer(): IntPtr<"Il2CppClass"> {
    return this.ptr;
  }

  getName(): string {
    return __IL2CPP.il2cpp_class_get_name(this.ptr);
  }

  getNamespace(): string {
    return __IL2CPP.il2cpp_class_get_namespace(this.ptr);
  }
}

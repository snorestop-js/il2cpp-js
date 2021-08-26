import { Il2CppImage } from "../image";
import { inspect } from "util";
import { Il2CppField } from "../field";

export class Il2CppClass {
  private static cache: Map<IntPtr<"Il2CppClass">, Il2CppClass> = new Map();

  private constructor(
    private ptr: IntPtr<"Il2CppClass">,
  ) {
    if (ptr === 0) throw new Error("Constructed Il2CppClass with NullPtr");

    Il2CppClass.cache.set(ptr, this);
  }

  static fromPointer(pointer: IntPtr<"Il2CppClass">): Il2CppClass {
    if (this.cache.has(pointer)) return this.cache.get(pointer)!

    return new Il2CppClass(pointer);
  }

  static fromName(image: Il2CppImage, namespace: string, name: string): Il2CppClass | undefined {
    const pointer = __IL2CPP.il2cpp_class_from_name(image.getPointer(), namespace, name);

    if (pointer === 0) {
      return undefined;
    }

    return new Il2CppClass(pointer);
  }

  [inspect.custom](): string {
    const namespace = this.getNamespace();

    if (namespace) {
      return `[IL2CPP Class {${namespace}.${this.getName()}} (0x${this.ptr.toString(16).padStart(8, "0")})]`
    }

    return `[IL2CPP Class {${this.getName()}} (0x${this.ptr.toString(16).padStart(8, "0")})]`
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

  getFields(): Il2CppField[] {
    return __IL2CPP.il2cpp_class_get_fields(this.ptr).map(field => Il2CppField.fromPointer(field));
  }

  getField(fieldName: string): Il2CppField | undefined {
    const ptr = __IL2CPP.il2cpp_class_get_field_from_name(this.ptr, fieldName);

    if (ptr === 0) return undefined;

    return Il2CppField.fromPointer(ptr);
  }
}

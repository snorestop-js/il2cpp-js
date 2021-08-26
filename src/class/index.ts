import { Il2CppImage } from "../image";
import { inspect } from "util";
import { Il2CppStaticField } from "../field";
import { Il2CppInstanceField } from "../field/instance";
import { Il2CppStaticMethod } from "../method";
import { Il2CppInstanceMethod } from "../method/instance";
import { Il2CppType } from "../type";

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

  getType(): Il2CppType {
    return Il2CppType.fromPointer(__IL2CPP.il2cpp_class_get_type(this.ptr));
  }

  getFields(): (Il2CppStaticField | Il2CppInstanceField)[] {
    return __IL2CPP.il2cpp_class_get_fields(this.ptr).map(field => {
      if(__IL2CPP.il2cpp_type_is_static(__IL2CPP.il2cpp_field_get_type(field))) {
        return Il2CppStaticField.fromPointer(field);
      } else {
        return Il2CppInstanceField.fromPointer(field, undefined as any)
      }
    });
  }

  getField(fieldName: string): (Il2CppStaticField | Il2CppInstanceField) | undefined {
    const ptr = __IL2CPP.il2cpp_class_get_field_from_name(this.ptr, fieldName);

    if (ptr === 0) return undefined;

    if (__IL2CPP.il2cpp_type_is_static(__IL2CPP.il2cpp_field_get_type(ptr))) {
      return Il2CppStaticField.fromPointer(ptr);
    } else {
      return Il2CppInstanceField.fromPointer(ptr, undefined as any)
    }
  }

  getMethods(): (Il2CppStaticMethod | Il2CppInstanceMethod)[] {
    return __IL2CPP.il2cpp_class_get_methods(this.ptr).map(method => {
      if(__IL2CPP.il2cpp_method_get_flags(method) & 0x10) {
        return Il2CppStaticMethod.fromPointer(method);
      } else {
        return Il2CppInstanceMethod.fromPointer(method);
      }
    });
  }

  getMethod(fieldName: string, argCount: number): (Il2CppStaticMethod | Il2CppInstanceMethod) | undefined {
    const ptr = __IL2CPP.il2cpp_class_get_method_from_name(this.ptr, fieldName, argCount);

    if (ptr === 0) return undefined;

    if (__IL2CPP.il2cpp_method_get_flags(ptr) & 0x10) {
      return Il2CppStaticMethod.fromPointer(ptr);
    } else {
      return Il2CppInstanceMethod.fromPointer(ptr);
    }
  }
}

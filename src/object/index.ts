import { inspect } from "util";
import { Il2CppClass } from "../class";
import { Il2CppStaticField } from "../field";
import { Il2CppInstanceField } from "../field/instance";
import { Il2CppStaticMethod } from "../method";
import { Il2CppInstanceMethod } from "../method/instance";

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

  getFields(): Il2CppInstanceField[] {
    let instanceFields: Il2CppInstanceField[] = [];

    this.getClass().getFields().forEach(field => {
      if (field instanceof Il2CppInstanceField) {
        instanceFields.push(Il2CppInstanceField.fromPointer(field.getPointer(), this));
      }
    })

    return instanceFields;
  }

  getField(key: string): Il2CppInstanceField | undefined {
    const field = this.getClass().getField(key);

    if (field === undefined) return undefined;
    if (field instanceof Il2CppStaticField) return undefined;

    return Il2CppInstanceField.fromPointer(field.getPointer(), this);
  }

  getMethods(): Il2CppInstanceMethod[] {
    let instanceMethods: Il2CppInstanceMethod[] = [];

    this.getClass().getMethods().forEach(method => {
      if (method instanceof Il2CppInstanceMethod) {
        instanceMethods.push(Il2CppInstanceMethod.fromPointer(method.getPointer(), this));
      }
    })

    return instanceMethods;
  }

  getMethod(key: string, argCount: number): Il2CppInstanceMethod | undefined {
    const method = this.getClass().getMethod(key, argCount);

    if (method === undefined) return undefined;
    if (method instanceof Il2CppStaticMethod) return undefined;

    return Il2CppInstanceMethod.fromPointer(method.getPointer(), this);
  }
}

import { inspect } from "util";
import { Il2CppTypeEnum } from "../../enums";
import { Il2CppArray } from "../array";
import { Il2CppClass } from "../class";
import { Il2CppObject } from "../object";
import { Il2CppString } from "../string";
import { Il2CppType } from "../type";

export class Il2CppField {
  private static cache: Map<IntPtr<"FieldInfo">, Il2CppField> = new Map();

  private constructor(
    private ptr: IntPtr<"FieldInfo">,
  ) {
    if (ptr === 0) throw new Error("Constructed FieldInfo with NullPtr");

    Il2CppField.cache.set(ptr, this);
  }

  static fromPointer(pointer: IntPtr<"FieldInfo">): Il2CppField {
    if (this.cache.has(pointer)) return this.cache.get(pointer)!

    return new Il2CppField(pointer);
  }

  [inspect.custom](): string {
    return `[IL2CPP Field {${this.getParent().getName()}${this.getType().isStatic() ? "." : "#"}${this.getName()}} (0x${this.ptr.toString(16).padStart(8, "0")})]`
  }

  getName(): string {
    return __IL2CPP.il2cpp_field_get_name(this.ptr);
  }

  getParent(): Il2CppClass {
    return Il2CppClass.fromPointer(__IL2CPP.il2cpp_field_get_parent(this.ptr));
  }

  getType(): Il2CppType {
    return Il2CppType.fromPointer(__IL2CPP.il2cpp_field_get_type(this.ptr));
  }

  getValue<T>(): T | undefined {
    const type = this.getType();

    switch (type.getUnderlyingType()) {
      case Il2CppTypeEnum.IL2CPP_TYPE_BOOLEAN:
      case Il2CppTypeEnum.IL2CPP_TYPE_U1:
      case Il2CppTypeEnum.IL2CPP_TYPE_I1:
        return __IL2CPP.il2cpp_field_static_get_value(this.ptr, false, 1) as unknown as T;
      case Il2CppTypeEnum.IL2CPP_TYPE_U2:
      case Il2CppTypeEnum.IL2CPP_TYPE_I2:
        return __IL2CPP.il2cpp_field_static_get_value(this.ptr, false, 2) as unknown as T;
      case Il2CppTypeEnum.IL2CPP_TYPE_U4:
      case Il2CppTypeEnum.IL2CPP_TYPE_I4:
        return __IL2CPP.il2cpp_field_static_get_value(this.ptr, false, 4) as unknown as T;
      case Il2CppTypeEnum.IL2CPP_TYPE_R4:
        const ptr3 = __IL2CPP.il2cpp_field_static_get_value(this.ptr, true, 4);
        return new Float32Array(ptr3).at(0)! as unknown as T;
      case Il2CppTypeEnum.IL2CPP_TYPE_U8:
      case Il2CppTypeEnum.IL2CPP_TYPE_I8:
      case Il2CppTypeEnum.IL2CPP_TYPE_R8:
        throw new Error("Cannot read 64-bit types.");
      case Il2CppTypeEnum.IL2CPP_TYPE_STRING:
        const ptr = __IL2CPP.il2cpp_field_static_get_value(this.ptr, true, 4);
        return Il2CppString.fromPointer(new Uint32Array(ptr).at(0)! as IntPtr<"Il2CppString">) as unknown as T;
      case Il2CppTypeEnum.IL2CPP_TYPE_SZARRAY:
      case Il2CppTypeEnum.IL2CPP_TYPE_ARRAY:
        const ptr2 = new Uint32Array(__IL2CPP.il2cpp_field_static_get_value(this.ptr, true, 4)).at(0)! as IntPtr<"Il2CppArray">;

        if (ptr2 === 0) return undefined;

        return Il2CppArray.fromPointer(ptr2) as unknown as T;
      case Il2CppTypeEnum.IL2CPP_TYPE_CLASS:
        const ptr5 = new Uint32Array(__IL2CPP.il2cpp_field_static_get_value(this.ptr, true, 4)).at(0)! as IntPtr<unknown>;

        if (ptr5 === 0) return undefined;

        return Il2CppObject.fromPointer(ptr5 as any) as unknown as T;
      default:
        throw new Error(`Cannot read ${Il2CppTypeEnum[type.getUnderlyingType()]} type.`);
    }
  }
}

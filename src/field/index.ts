import { inspect } from "util";
import { Il2CppTypeEnum } from "../../enums";
import { Il2CppArray } from "../array";
import { Il2CppClass } from "../class";
import { Il2CppObject } from "../object";
import { Il2CppString } from "../string";
import { Il2CppType } from "../type";

export class Il2CppStaticField {
  private static cache: Map<IntPtr<"FieldInfo">, Il2CppStaticField> = new Map();

  private constructor(
    private ptr: IntPtr<"FieldInfo">,
  ) {
    if (ptr === 0) throw new Error("Constructed FieldInfo with NullPtr");

    if (!this.getType().isStatic()) throw new Error("Constructed Il2CppStaticField with InstanceField");

    Il2CppStaticField.cache.set(ptr, this);
  }

  static fromPointer(pointer: IntPtr<"FieldInfo">): Il2CppStaticField {
    if (this.cache.has(pointer)) return this.cache.get(pointer)!

    return new Il2CppStaticField(pointer);
  }

  getPointer(): IntPtr<"FieldInfo"> {
    return this.ptr;
  }

  [inspect.custom](): string {
    return `[IL2CPP Static Field {${this.getParent().getName()}.${this.getName()}} (0x${this.ptr.toString(16).padStart(8, "0")})]`
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

  setValue(value: any) {
    const type = this.getType();

    switch (type.getUnderlyingType()) {
      case Il2CppTypeEnum.IL2CPP_TYPE_BOOLEAN:
      case Il2CppTypeEnum.IL2CPP_TYPE_U1:
      case Il2CppTypeEnum.IL2CPP_TYPE_I1:{
        const buffer = __IL2CPP.snorestop_create_buffer_readonly(1);
        new Uint8Array(buffer)[0] = value;
        return __IL2CPP.il2cpp_field_static_set_value(this.ptr, buffer);
      }
      // case Il2CppTypeEnum.IL2CPP_TYPE_U2:
      // case Il2CppTypeEnum.IL2CPP_TYPE_I2:{
      //   const buffer = __IL2CPP.snorestop_create_buffer_readonly(2);
      //   new Uint8Array(buffer)[0] = value;
      //   return __IL2CPP.il2cpp_field_static_set_value(this.ptr, buffer);
      // }
      // case Il2CppTypeEnum.IL2CPP_TYPE_U4:
      // case Il2CppTypeEnum.IL2CPP_TYPE_I4:
      //   return __IL2CPP.il2cpp_field_static_get_value(this.ptr, false, 4);
      // case Il2CppTypeEnum.IL2CPP_TYPE_R4:
      //   const ptr3 = __IL2CPP.il2cpp_field_static_get_value(this.ptr, true, 4);
      //   break;
      // case Il2CppTypeEnum.IL2CPP_TYPE_U8:
      // case Il2CppTypeEnum.IL2CPP_TYPE_I8:
      // case Il2CppTypeEnum.IL2CPP_TYPE_R8:
      //   throw new Error("Cannot read 64-bit types.");
      // case Il2CppTypeEnum.IL2CPP_TYPE_STRING:
      //   const string = t as Il2CppString;
      //   const ptr = __IL2CPP.il2cpp_field_static_get_value(this.ptr, true, 4);
      //   return Il2CppString.fromPointer(new Uint32Array(ptr).at(0)! as IntPtr<"Il2CppString">);
      // case Il2CppTypeEnum.IL2CPP_TYPE_SZARRAY:
      // case Il2CppTypeEnum.IL2CPP_TYPE_ARRAY:
      //   const ptr2 = new Uint32Array(__IL2CPP.il2cpp_field_static_get_value(this.ptr, true, 4)).at(0)! as IntPtr<"Il2CppArray">;

      //   if (ptr2 === 0) return undefined;

      //   return Il2CppArray.fromPointer(ptr2);
      // case Il2CppTypeEnum.IL2CPP_TYPE_CLASS:{
      //   const buffer = __IL2CPP.snorestop_create_buffer_readonly(1);
      //   new u32(buffer)[0] = value;
      //   return __IL2CPP.il2cpp_field_static_set_value(this.ptr, buffer);
      // }
      default:
        throw new Error(`Cannot read ${Il2CppTypeEnum[type.getUnderlyingType()]} type.`);
    }
  }
}

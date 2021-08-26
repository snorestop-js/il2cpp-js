import { ComponentSpawnEvent } from "@skeldjs/client";
import { inspect } from "util";
import { Il2CppTypeEnum } from "../../enums";
import { Il2CppArray } from "../array";
import { Il2CppClass } from "../class";
import { Il2CppObject } from "../object";
import { Il2CppString } from "../string";
import { Il2CppType } from "../type";

export class Il2CppInstanceField {
  private static cache: Map<IntPtr<"FieldInfo">, Map<IntPtr<"Il2CppObject"> | undefined, Il2CppInstanceField>> = new Map();

  private constructor(
    private ptr: IntPtr<"FieldInfo">,
    private parent?: Il2CppObject,
  ) {
    if (ptr === 0) throw new Error("Constructed FieldInfo with NullPtr");

    if (this.getType().isStatic()) throw new Error("Constructed Il2CppInstanceField with StaticField");

    if (Il2CppInstanceField.cache.has(ptr)) {
      Il2CppInstanceField.cache.get(ptr)!.set(parent?.getPointer(), this)
    } else {
      Il2CppInstanceField.cache.set(ptr, new Map().set(parent?.getPointer(), this));
    }
  }

  static fromPointer(pointer: IntPtr<"FieldInfo">, parent?: Il2CppObject): Il2CppInstanceField {
    if (this.cache.has(pointer) && this.cache.get(pointer)!.has(parent?.getPointer())) {
      return this.cache.get(pointer)!.get(parent?.getPointer())!;
    }

    return new Il2CppInstanceField(pointer, parent);
  }

  getPointer(): IntPtr<"FieldInfo"> {
    return this.ptr;
  }

  [inspect.custom](): string {
    return `[IL2CPP Field {${this.getParentClass().getName()}#${this.getName()}} (0x${this.ptr.toString(16).padStart(8, "0")})]`
  }

  getName(): string {
    return __IL2CPP.il2cpp_field_get_name(this.ptr);
  }

  getParent(): Il2CppObject | undefined {
    return this.parent;
  }

  getParentClass(): Il2CppClass {
    return Il2CppClass.fromPointer(__IL2CPP.il2cpp_field_get_parent(this.ptr));
  }

  getType(): Il2CppType {
    return Il2CppType.fromPointer(__IL2CPP.il2cpp_field_get_type(this.ptr));
  }

  getValue<T>(): T | undefined {
    if (this.parent === undefined) {
      throw new Error("Cannot get value on a dangling instanceField");
    }

    const type = this.getType();

    switch (type.getUnderlyingType()) {
      case Il2CppTypeEnum.IL2CPP_TYPE_BOOLEAN:
      case Il2CppTypeEnum.IL2CPP_TYPE_U1:
      case Il2CppTypeEnum.IL2CPP_TYPE_I1:
        return __IL2CPP.il2cpp_field_get_value(this.parent.getPointer(), this.ptr, false, 1) as unknown as T;
      case Il2CppTypeEnum.IL2CPP_TYPE_U2:
      case Il2CppTypeEnum.IL2CPP_TYPE_I2:
        return __IL2CPP.il2cpp_field_get_value(this.parent.getPointer(), this.ptr, false, 2) as unknown as T;
      case Il2CppTypeEnum.IL2CPP_TYPE_U4:
      case Il2CppTypeEnum.IL2CPP_TYPE_I4:
        return __IL2CPP.il2cpp_field_get_value(this.parent.getPointer(), this.ptr, false, 4) as unknown as T;
      case Il2CppTypeEnum.IL2CPP_TYPE_R4:
        const ptr3 = __IL2CPP.il2cpp_field_get_value(this.parent.getPointer(), this.ptr, true, 4);
        return new Float32Array(ptr3).at(0)! as unknown as T;
      case Il2CppTypeEnum.IL2CPP_TYPE_U8:
      case Il2CppTypeEnum.IL2CPP_TYPE_I8:
      case Il2CppTypeEnum.IL2CPP_TYPE_R8:
        throw new Error("Cannot read 64-bit types.");
      case Il2CppTypeEnum.IL2CPP_TYPE_STRING:
        const ptr = __IL2CPP.il2cpp_field_get_value(this.parent.getPointer(), this.ptr, false, 4);
        return Il2CppString.fromPointer(ptr as IntPtr<"Il2CppString">) as unknown as T;
      case Il2CppTypeEnum.IL2CPP_TYPE_SZARRAY:
      case Il2CppTypeEnum.IL2CPP_TYPE_ARRAY:
        const ptr2 = new Uint32Array(__IL2CPP.il2cpp_field_get_value(this.parent.getPointer(), this.ptr, true, 4)).at(0)! as IntPtr<"Il2CppArray">;

        if (ptr2 === 0) return undefined;

        return Il2CppArray.fromPointer(ptr2) as unknown as T;
      case Il2CppTypeEnum.IL2CPP_TYPE_CLASS:
        const ptr5 = new Uint32Array(__IL2CPP.il2cpp_field_get_value(this.parent.getPointer(), this.ptr, true, 4)).at(0)! as IntPtr<unknown>;

        if (ptr5 === 0) return undefined;

        return Il2CppObject.fromPointer(ptr5 as any) as unknown as T;
      default:
        throw new Error(`Cannot read ${Il2CppTypeEnum[type.getUnderlyingType()]} type.`);
    }
  }
}

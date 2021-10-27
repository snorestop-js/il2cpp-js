import { Il2CppReference } from "../reference";
import { Il2CppObject } from "../object";
import { Il2CppClass } from "../class";
import util from "util";
import { Il2CppString } from "../string";
import { Il2CppArray } from "../array";

export enum Il2CppBaseType {
  IL2CPP_TYPE_END = 0x00,            /* End of List */
  IL2CPP_TYPE_VOID = 0x01,
  IL2CPP_TYPE_BOOLEAN = 0x02,
  IL2CPP_TYPE_CHAR = 0x03,
  IL2CPP_TYPE_I1 = 0x04,
  IL2CPP_TYPE_U1 = 0x05,
  IL2CPP_TYPE_I2 = 0x06,
  IL2CPP_TYPE_U2 = 0x07,
  IL2CPP_TYPE_I4 = 0x08,
  IL2CPP_TYPE_U4 = 0x09,
  IL2CPP_TYPE_I8 = 0x0a,
  IL2CPP_TYPE_U8 = 0x0b,
  IL2CPP_TYPE_R4 = 0x0c,
  IL2CPP_TYPE_R8 = 0x0d,
  IL2CPP_TYPE_STRING = 0x0e,
  IL2CPP_TYPE_PTR = 0x0f,            /* arg: <type> token */
  IL2CPP_TYPE_BYREF = 0x10,          /* arg: <type> token */
  IL2CPP_TYPE_VALUETYPE = 0x11,      /* arg: <type> token */
  IL2CPP_TYPE_CLASS = 0x12,          /* arg: <type> token */
  IL2CPP_TYPE_VAR = 0x13,            /* Generic parameter in a generic type definition, represented as number (compressed unsigned integer) number */
  IL2CPP_TYPE_ARRAY = 0x14,          /* type, rank, boundsCount, bound1, loCount, lo1 */
  IL2CPP_TYPE_GENERICINST = 0x15,    /* <type> <type-arg-count> <type-1> \x{2026} <type-n> */
  IL2CPP_TYPE_TYPEDBYREF = 0x16,
  IL2CPP_TYPE_I = 0x18,
  IL2CPP_TYPE_U = 0x19,
  IL2CPP_TYPE_FNPTR = 0x1b,          /* arg: full method signature */
  IL2CPP_TYPE_OBJECT = 0x1c,
  IL2CPP_TYPE_SZARRAY = 0x1d,        /* 0-based one-dim-array */
  IL2CPP_TYPE_MVAR = 0x1e,           /* Generic parameter in a generic method definition, represented as number (compressed unsigned integer)  */
  IL2CPP_TYPE_CMOD_REQD = 0x1f,      /* arg: typedef or typeref token */
  IL2CPP_TYPE_CMOD_OPT = 0x20,       /* optional arg: typedef or typref token */
  IL2CPP_TYPE_INTERNAL = 0x21,       /* CLR internal type */

  IL2CPP_TYPE_MODIFIER = 0x40,       /* Or with the following types */
  IL2CPP_TYPE_SENTINEL = 0x41,       /* Sentinel for varargs method signature */
  IL2CPP_TYPE_PINNED = 0x45,         /* Local var that points to pinned object */

  IL2CPP_TYPE_ENUM = 0x55            /* an enumeration */
}

export class Il2CppType extends Il2CppReference<"Il2CppType"> {
  [util.inspect.custom](): string {
    return `[Il2CppReflectionType (${this.getPointer().toString(16).padStart(8, "0")})] { \n  name: "${this.getName()}",\n  isStatic: ${this.isStatic()},\n  isByReference: ${this.isByReference()},\n  isPointerType: ${this.isPointerType()},\n  assemblyQualifiedName: \"${this.getAssemblyQualifiedName()}\",\n  attributes: ${this.getAttributes()},\n  classOrElementClass: ${this.getClassOrElementClass()[util.inspect.custom]().split("\n").join("\n  ")},\n  object: ${this.getObject()[util.inspect.custom]().split("\n").join("\n  ")}\n}`
  }

  equals(type: Il2CppType): boolean {
    return __IL2CPP.il2cpp_type_equals(this.getPointer(), type.getPointer());
  }

  getName(): string {
    return __IL2CPP.il2cpp_type_get_name(this.getPointer());
  }

  isStatic(): boolean {
    return __IL2CPP.il2cpp_type_is_static(this.getPointer());
  }

  isByReference(): boolean {
    return __IL2CPP.il2cpp_type_is_byref(this.getPointer());
  }

  isPointerType(): boolean {
    return __IL2CPP.il2cpp_type_is_pointer_type(this.getPointer());
  }

  getAssemblyQualifiedName(): string {
    return __IL2CPP.il2cpp_type_get_assembly_qualified_name(this.getPointer())
  }

  getAttributes(): number {
    return __IL2CPP.il2cpp_type_get_attrs(this.getPointer());
  }

  getClassOrElementClass(): Il2CppClass {
    return __IL2CPP.il2cpp_type_get_class_or_element_class(this.getPointer()).asPointer().of(Il2CppClass)
  }

  getObject(): Il2CppObject {
    return __IL2CPP.il2cpp_type_get_object(this.getPointer()).asHandle().to(Il2CppObject);
  }

  getBaseType(): Il2CppBaseType {
    return __IL2CPP.il2cpp_type_get_type(this.getPointer());
  }

  parseValue(view: MemoryView<unknown>, baseType: Il2CppType = this): any {
    console.log(view.getHead(), Il2CppBaseType[this.getBaseType()]);
    if (view.getHead() === 0) return undefined;

    switch (this.getBaseType()) {
      case Il2CppBaseType.IL2CPP_TYPE_I1:
        return view.readI8();
      case Il2CppBaseType.IL2CPP_TYPE_I2:
        return view.readI16();
      case Il2CppBaseType.IL2CPP_TYPE_I4:
        return view.readI32();
      case Il2CppBaseType.IL2CPP_TYPE_I8:
        return view.readI64();
      case Il2CppBaseType.IL2CPP_TYPE_U1:
        return view.readU8();
      case Il2CppBaseType.IL2CPP_TYPE_U2:
        return view.readU16();
      case Il2CppBaseType.IL2CPP_TYPE_U4:
        return view.readU32();
      case Il2CppBaseType.IL2CPP_TYPE_U8:
        return view.readU64();
      case Il2CppBaseType.IL2CPP_TYPE_BOOLEAN:
        return view.readU8() == 1;
      case Il2CppBaseType.IL2CPP_TYPE_CHAR:
        return view.readU16();
      case Il2CppBaseType.IL2CPP_TYPE_I:
        return process.arch === "x32" ? view.readI32() : view.readI64();
      case Il2CppBaseType.IL2CPP_TYPE_U:
        return process.arch === "x32" ? view.readU32() : view.readU64();
      case Il2CppBaseType.IL2CPP_TYPE_R4:
        return view.readF32();
      case Il2CppBaseType.IL2CPP_TYPE_R8:
        return view.readF64();
      case Il2CppBaseType.IL2CPP_TYPE_STRING:
        //TODO: gc
        return new Il2CppString(__IL2CPP.il2cpp_gchandle_new(view.readPtr(), false));
      case Il2CppBaseType.IL2CPP_TYPE_SZARRAY:
        return new Il2CppArray(__IL2CPP.il2cpp_gchandle_new(view.readPtr(), false));
      case Il2CppBaseType.IL2CPP_TYPE_CLASS: {
        const ptr = view.readPtr();

        if (ptr === 0) return undefined;

        return new Il2CppObject(__IL2CPP.il2cpp_gchandle_new(ptr, false));
      }
      case Il2CppBaseType.IL2CPP_TYPE_OBJECT: {
        const ptr = view.readPtr();

        if (ptr === 0) return undefined;

        return new Il2CppObject(__IL2CPP.il2cpp_gchandle_new(ptr, false));
      }
      case Il2CppBaseType.IL2CPP_TYPE_ARRAY:
        return new Il2CppArray(__IL2CPP.il2cpp_gchandle_new(view.readPtr(), false));
      case Il2CppBaseType.IL2CPP_TYPE_VALUETYPE:
        if (baseType.getBaseType() === Il2CppBaseType.IL2CPP_TYPE_VALUETYPE && Il2CppClass.fromType(baseType).isEnum()) {
          return Il2CppClass.fromType(baseType).enumBasetype().parseValue(view, this);
        } else {
          const fields = Il2CppClass.fromIl2CppType(baseType).getAllFields().filter(f => !f.getType().isStatic());
          const object: any = {};

          for (let i = 0; i < fields.length; i++) {
            object[fields[i].getName()] = fields[i].getType().parseValue(view, baseType);
          }

          return object;
        }
      default:
        console.log("Failed to read", Il2CppBaseType[this.getBaseType()])
        return undefined;
    }
  }
}

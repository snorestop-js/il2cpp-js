import { Il2CppClass } from "../class";
import { Il2CppReference } from "../reference";
import { Il2CppType } from "../type";
import util from "util";
import { Il2CppObject } from "../object";

export class Il2CppFieldInfo extends Il2CppReference<"FieldInfo"> {
  [util.inspect.custom](): string {
    return `[Il2CppFieldInfo (${this.getPointer().toString(16).padStart(8, "0")})] { \n  name: "${this.getName()}"\n  type: ${this.getType()[util.inspect.custom]().split("\n").join("\n  ")},\n  parent: ${this.getParent()[util.inspect.custom]().split("\n").join("\n  ")}\n}`
  }

  getFlags(): number {
    return __IL2CPP.il2cpp_field_get_flags(this.getPointer());
  }

  getName(): string {
    return __IL2CPP.il2cpp_field_get_name(this.getPointer());
  }

  getOffset(): number {
    return __IL2CPP.il2cpp_field_get_offset(this.getPointer());
  }

  getParent(): Il2CppClass {
    return __IL2CPP.il2cpp_field_get_parent(this.getPointer()).asPointer().of(Il2CppClass);
  }

  getType(): Il2CppType {
    return __IL2CPP.il2cpp_field_get_type(this.getPointer()).asPointer().of(Il2CppType);
  }

  hasAttribute(attributeClass: Il2CppClass): boolean {
    return __IL2CPP.il2cpp_field_has_attribute(this.getPointer(), attributeClass.getPointer())
  }

  isLiteral(): boolean {
    return __IL2CPP.il2cpp_field_is_literal(this.getPointer())
  }

  getSize(): number {
    return Il2CppClass.fromType(this.getType()).getValueSize();
  }

  getValue(object?: Il2CppObject): any {
    const size = this.getSize();

    console.log("SIZE", this.getType().getClassOrElementClass().getName(), size);

    if (this.getType().isStatic()) {
      if (object) {
        throw new Error("Including object reference for static getValue call");
      }

      return this.getType().parseValue(__IL2CPP.il2cpp_field_static_get_value(this.getPointer(), size));
    } else {
      if (!object) {
        throw new Error("Missing object reference for non-static getValue call");
      }

      return this.getType().parseValue(__IL2CPP.il2cpp_field_get_value(object.getPointer(), this.getPointer(), size));
    }
  }

  getValuePointer(object?: Il2CppObject): IntPtr<any> {
    const size = this.getSize();

    console.log("SIZE", this.getType().getClassOrElementClass().getName(), size);

    if (this.getType().isStatic()) {
      if (object) {
        throw new Error("Including object reference for static getValue call");
      }

      return __IL2CPP.il2cpp_field_static_get_value(this.getPointer(), size).getHead();
    } else {
      if (!object) {
        throw new Error("Missing object reference for non-static getValue call");
      }

      return __IL2CPP.il2cpp_field_get_value(object.getPointer(), this.getPointer(), size).getHead();
    }
  }
}

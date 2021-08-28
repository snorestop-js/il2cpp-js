import { Il2CppClass } from "../class";
import { Il2CppReference } from "../reference";
import { Il2CppType } from "../type";

export class Il2CppFieldInfo extends Il2CppReference<"FieldInfo"> {
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
}

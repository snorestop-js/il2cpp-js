import { Il2CppReference } from "../reference";
import { Il2CppObject } from "../object";
import { Il2CppClass } from "../class";
import util from "util";

export class Il2CppType extends Il2CppReference<"Il2CppType"> {
  [util.inspect.custom](): string {
    return `[Il2CppReflectionType (${this.getPointer().toString(16).padStart(8, "0")})] { \n  name: "${this.getName()}"\n  isStatic: ${this.isStatic()}\n  isByReference: ${this.isByReference()}\n  isPointerType: ${this.isPointerType()}\n  assemblyQualifiedName: ${this.getAssemblyQualifiedName()}\n  attributes: ${this.getAssemblyQualifiedName()}\n  classOrElementClass: ${this.getClassOrElementClass()[util.inspect.custom]().split("\n").join("\n  ")}\n  object: ${this.getObject()[util.inspect.custom]().split("\n").join("\n  ")}\n}`
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
    return __IL2CPP.il2cpp_type_get_object(this.getPointer()).asPointer().of(Il2CppObject);
  }
}

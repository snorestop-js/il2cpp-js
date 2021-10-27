import { Il2CppReference } from "../reference";
import util from "util";
import { Il2CppType } from "../type";
import { Il2CppClass } from "../class";
import { Il2CppObject } from "../object";
import { Il2CppException } from "../exception";

export class Il2CppMethodInfo extends Il2CppReference<"MethodInfo"> {
  static getFromReflection(object: Il2CppObject): Il2CppMethodInfo {
    return __IL2CPP.il2cpp_method_get_from_reflection(object.getPointer()).asPointer().of(Il2CppMethodInfo);
  }

  [util.inspect.custom](): string {
    return `[Il2CppMethodInfo (${this.getPointer().toString(16).padStart(8, "0")})] function ${this.getName()}(${this.getAllParameters().map(p => `${p.name}`).join(", ")})`
  }

  getClass(): Il2CppClass {
    return __IL2CPP.il2cpp_method_get_class(this.getPointer()).asPointer().of(Il2CppClass);
  }

  getDeclaringType(): Il2CppClass {
    return __IL2CPP.il2cpp_method_get_declaring_type(this.getPointer()).asPointer().of(Il2CppClass);
  }

  getObject(refclass: Il2CppClass = this.getClass()): Il2CppObject {
    return __IL2CPP.il2cpp_method_get_object(this.getPointer(), refclass.getPointer()).asHandle().to(Il2CppObject);
  }

  hasAttribute(attribute: Il2CppClass): boolean {
    return __IL2CPP.il2cpp_method_has_attribute(this.getPointer(), attribute.getPointer());
  }

  getFlags(): number {
    return __IL2CPP.il2cpp_method_get_flags(this.getPointer());
  }

  getName(): string {
    return __IL2CPP.il2cpp_method_get_name(this.getPointer());
  }

  isGeneric(): boolean {
    return __IL2CPP.il2cpp_method_is_generic(this.getPointer());
  }

  isInflated(): boolean {
    return __IL2CPP.il2cpp_method_is_inflated(this.getPointer());
  }

  isInstance(): boolean {
    return __IL2CPP.il2cpp_method_is_instance(this.getPointer());
  }

  getToken(): number {
    return __IL2CPP.il2cpp_method_get_token(this.getPointer())
  }

  getReturnType(): Il2CppType {
    return __IL2CPP.il2cpp_method_get_return_type(this.getPointer()).asPointer().of(Il2CppType);
  }

  getParameterCount(): number {
    return __IL2CPP.il2cpp_method_get_param_count(this.getPointer());
  }

  getParameterType(index: number): Il2CppType {
    return __IL2CPP.il2cpp_method_get_param(this.getPointer(), index).asPointer().of(Il2CppType);
  }

  getParameterName(index: number): string {
    return __IL2CPP.il2cpp_method_get_param_name(this.getPointer(), index);
  }

  getAllParameters(): { name: string, type: Il2CppType }[] {
    const count = this.getParameterCount();
    const params: { name: string, type: Il2CppType }[] = new Array(count);

    for (let i = 0; i < count; i++) {
      params[i] = {
        name: this.getParameterName(i),
        type: this.getParameterType(i),
      }
    }

    return params;
  }

  staticInvokeConvertArgs(...params: Il2CppObject[]): Il2CppObject {
    let exceptionPtr = MemoryView.alloc(4);

    exceptionPtr.writeU32(0, 0);

    let result = __IL2CPP.il2cpp_runtime_invoke_convert_args(this.getPointer(), 0, params.map(p => p.getPointer()), exceptionPtr.getHead());

    if (exceptionPtr.readU32(0) !== 0) {
      throw exceptionPtr.readU32(0).asPointer().of(Il2CppException)
    }

    return result.asPointer().of(Il2CppObject)
  }

  invokeConvertArgs(bindThis: Il2CppObject, ...params: Il2CppObject[]): Il2CppObject {
    let exceptionPtr = MemoryView.alloc(4);

    exceptionPtr.writeU32(0, 0);

    let result = __IL2CPP.il2cpp_runtime_invoke_convert_args(this.getPointer(), bindThis.getPointer(), params.map(p => p.getPointer()), exceptionPtr.getHead());

    if (exceptionPtr.readU32(0) !== 0) {
      throw exceptionPtr.readU32(0).asPointer().of(Il2CppException)
    }

    return result.asPointer().of(Il2CppObject);
  }

  staticInvoke(...params: IntPtr<any>[]): Il2CppObject {
    let exceptionPtr = MemoryView.alloc(4);

    exceptionPtr.writeU32(0, 0);

    let result = __IL2CPP.il2cpp_runtime_invoke(this.getPointer(), 0, params, exceptionPtr.getHead());

    if (exceptionPtr.readU32(0) !== 0) {
      throw exceptionPtr.readU32(0).asPointer().of(Il2CppException)
    }

    return result.asPointer().of(Il2CppObject);
  }

  invoke(bindThis: Il2CppObject, ...params: IntPtr<any>[]): Il2CppObject {
    let exceptionPtr = MemoryView.alloc(4);

    exceptionPtr.writeU32(0, 0);

    let result = __IL2CPP.il2cpp_runtime_invoke(this.getPointer(), bindThis.getPointer(), params, exceptionPtr.getHead());

    if (exceptionPtr.readU32(0) !== 0) {
      throw exceptionPtr.readU32(0).asPointer().of(Il2CppException)
    }

    return result.asPointer().of(Il2CppObject);
  }
}

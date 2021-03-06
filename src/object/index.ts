import { Il2CppClass } from "../class";
// import { Il2CppMethodInfo } from "../method";
import util from "util";
import { Il2CppHandle } from "../handle";

export class Il2CppObject<T = "Il2CppObject"> extends Il2CppHandle<T> {
  static new(klass: Il2CppClass): Il2CppObject {
    return __IL2CPP.il2cpp_object_new(klass.getPointer()).asHandle().to(Il2CppObject);
  }

  static box(klass: Il2CppClass, value: any): Il2CppObject {
    return __IL2CPP.il2cpp_value_box(klass.getPointer(), value).asHandle().to(Il2CppObject);
  }

  static getHeaderSize(): number {
    return __IL2CPP.il2cpp_object_header_size()
  }

  [util.inspect.custom](): string {
    return `[Il2CppObject (${this.getPointer().toString(16).padStart(8, "0")})] { \n  size: "${this.getSize()}"\n  class: ${this.getClass()[util.inspect.custom]().split("\n").join("\n  ")}\n}`
  }

  getClass(): Il2CppClass {
    return __IL2CPP.il2cpp_object_get_class(this.getPointer()).asPointer().of(Il2CppClass);
  }

  getSize(): number {
    return __IL2CPP.il2cpp_object_get_size(this.getPointer());
  }

  // getVirtualMethod(method: Il2CppMethodInfo): Il2CppMethodInfo {
  //   return __IL2CPP.il2cpp_object_get_virtual_method(this.getPointer(), method.getPointer()).asPointer().of(Il2CppMethodInfo);
  // }

  unbox(): IntPtr<unknown> {
    return __IL2CPP.il2cpp_object_unbox(this.getPointer());
  }
}

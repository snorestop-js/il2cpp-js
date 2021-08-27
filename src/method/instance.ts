import { inspect } from "util";
import { Il2CppObject } from "../object";

export class Il2CppInstanceMethod {
  private static cache: Map<IntPtr<"MethodInfo">, Map<IntPtr<"Il2CppObject"> | undefined, Il2CppInstanceMethod>> = new Map();

  private constructor(
    private ptr: IntPtr<"MethodInfo">,
    private parent?: Il2CppObject,
  ) {
    if (ptr === 0) throw new Error("Constructed MethodInfo with NullPtr");

    if (Il2CppInstanceMethod.cache.has(ptr)) {
      Il2CppInstanceMethod.cache.get(ptr)!.set(parent?.getPointer(), this)
    } else {
      Il2CppInstanceMethod.cache.set(ptr, new Map().set(parent?.getPointer(), this));
    }
  }

  static fromPointer(pointer: IntPtr<"MethodInfo">, parent?: Il2CppObject): Il2CppInstanceMethod {
    if (this.cache.has(pointer) && this.cache.get(pointer)!.has(parent?.getPointer())) {
      return this.cache.get(pointer)!.get(parent?.getPointer())!;
    }

    return new Il2CppInstanceMethod(pointer, parent);
  }

  getPointer(): IntPtr<"MethodInfo"> {
    return this.ptr;
  }

  [inspect.custom](): string {
    return `[IL2CPP Method {${this.getName()}} (0x${this.ptr.toString(16).padStart(8, "0")})]`
  }

  getName(): string {
    return __IL2CPP.il2cpp_method_get_name(this.ptr);
  }

  invoke(...args: any[]): any {
    if (this.parent === undefined) throw new Error("Cannot call dangling InstanceMethod");

    // TODO: build an error from the exception which would be returned
    return __IL2CPP.il2cpp_runtime_invoke_convert_args(this.ptr, this.parent.getPointer(), args, 0 as IntPtr<any>);
  }
}

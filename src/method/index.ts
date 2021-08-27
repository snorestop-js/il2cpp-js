import { inspect } from "util";

export class Il2CppStaticMethod {
  private static cache: Map<IntPtr<"MethodInfo">, Il2CppStaticMethod> = new Map();

  private constructor(
    private ptr: IntPtr<"MethodInfo">,
  ) {
    if (ptr === 0) throw new Error("Constructed Il2CppStaticMethod with NullPtr");

    Il2CppStaticMethod.cache.set(ptr, this);
  }

  static fromPointer(pointer: IntPtr<"MethodInfo">): Il2CppStaticMethod {
    if (this.cache.has(pointer)) this.cache.get(pointer)!;

    return new Il2CppStaticMethod(pointer);
  }

  [inspect.custom](): string {
    return `[IL2CPP Static Method {${this.getName()}} (0x${this.ptr.toString(16).padStart(8, "0")})]`
  }

  getName(): string {
    return __IL2CPP.il2cpp_method_get_name(this.ptr);
  }

  invoke(...args: any[]): any {
    // TODO: Find out why this crashes pre-startup, what is missing that the bepinex chain does?
    return __IL2CPP.il2cpp_runtime_invoke_convert_args(this.ptr, 0 as IntPtr<any>, args, 0 as IntPtr<any>);
  }
}

import { Il2CppClass } from "../class";
import { Il2CppMethodInfo } from "../method";
import { Il2CppReference } from "../reference";
import util from "util";

export class Il2CppObject<T = "Il2CppObject"> extends Il2CppReference<T> {
  private readonly handle: number;
  private readonly jsGcHandle: unknown;

  constructor(pointer: IntPtr<T>) {
    // we don't want to access this object directly, so throw errors if it gets used
    super(-1);

    //TODO: Proper pinned object support
    this.handle = __IL2CPP.il2cpp_gchandle_new(pointer, false);
    const handle = new Number(this.handle);
    this.jsGcHandle = create_js_gc_handle(() => {
      __IL2CPP.il2cpp_gchandle_free(handle.valueOf());
    });
  }

  getPointer(): IntPtr<T> {
    const handleTarget: IntPtr<T> = __IL2CPP.il2cpp_gchandle_get_target(this.handle);

    if (handleTarget === 0) {
      throw new Error("Object garbage collected in il2cpp space");
    }

    return handleTarget;
  }

  static new(klass: Il2CppClass): Il2CppObject {
    return __IL2CPP.il2cpp_object_new(klass.getPointer()).asPointer().of(Il2CppObject);
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

  getVirtualMethod(method: Il2CppMethodInfo): Il2CppMethodInfo {
    return __IL2CPP.il2cpp_object_get_virtual_method(this.getPointer(), method.getPointer()).asPointer().of(Il2CppMethodInfo);
  }

  unbox(): IntPtr<unknown> {
    return __IL2CPP.il2cpp_object_unbox(this.getPointer());
  }
}

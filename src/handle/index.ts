import { Il2CppReference } from "../reference";

export class Il2CppHandle<T> {
  private readonly jsGcHandle: unknown;

  constructor(private readonly handle: number) {
    this.jsGcHandle = create_js_gc_handle(() => {
      __IL2CPP.il2cpp_gchandle_free(handle);
    });
  }

  to<T2 extends { new(handle: number): any }>(Class: T2): InstanceType<T2> {
    return new Class(this.handle);
  }

  getPointer(): IntPtr<T> {
    const handleTarget: IntPtr<T> = __IL2CPP.il2cpp_gchandle_get_target(this.handle);

    if (handleTarget === 0) {
      throw new Error("Object garbage collected in il2cpp space");
    }

    return handleTarget;
  }
}

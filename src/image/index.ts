import { inspect } from "util";
import { Il2CppAssembly } from "../assembly";
import { Il2CppClass } from "../class";

export class Il2CppImage {
  private static cache: Map<IntPtr<"Il2CppImage">, Il2CppImage> = new Map();

  private constructor(
    private ptr: IntPtr<"Il2CppImage">,
  ) {
    if (ptr === 0) throw new Error("Constructed Il2CppImage with NullPtr");

    Il2CppImage.cache.set(ptr, this);
  }

  static fromPointer(pointer: IntPtr<"Il2CppImage">) {
    if (this.cache.has(pointer)) return this.cache.get(pointer)!;

    return new Il2CppImage(pointer);
  }

  [inspect.custom](): string {
    return `[IL2CPP Image (0x${this.ptr.toString(16).padStart(8, "0")})]`
  }

  getPointer(): IntPtr<"Il2CppImage"> {
    return this.ptr;
  }

  getClasses(): Il2CppClass[] {
    const classes: Il2CppClass[] = new Array(__IL2CPP.il2cpp_image_get_class_count(this.ptr));

    for (let i = 0; i < classes.length; i++) {
      classes[i] = Il2CppClass.fromPointer(
        __IL2CPP.il2cpp_image_get_class(this.ptr, i)
      );
    }

    return classes;
  }

  findClassByName(namespace: string, name: string): Il2CppClass | undefined {
    return Il2CppClass.fromName(this, namespace, name);
  }

  getName(): string {
    return __IL2CPP.il2cpp_image_get_name(this.ptr);
  }

  getFilename(): string {
    return __IL2CPP.il2cpp_image_get_filename(this.ptr);
  }

  getAssembly(): Il2CppAssembly {
    return Il2CppAssembly.fromPointer(
      __IL2CPP.il2cpp_image_get_assembly(this.ptr),
    );
  }
}

import { Assembly } from "../assembly";
import { Class } from "../class";

export class Image {
  private static cache: Map<IntPtr<"Il2CppImage">, Image> = new Map();

  private constructor(
    private ptr: IntPtr<"Il2CppImage">,
  ) {
    if (ptr === 0) throw new Error("Constructed Il2CppImage with NullPtr");

    Image.cache.set(ptr, this);
  }

  static fromPointer(pointer: IntPtr<"Il2CppImage">) {
    if (this.cache.has(pointer)) return this.cache.get(pointer)!;

    return new Image(pointer);
  }

  getPointer(): IntPtr<"Il2CppImage"> {
    return this.ptr;
  }

  getClasses(): Class[] {
    const classes: Class[] = new Array(__IL2CPP.il2cpp_image_get_class_count(this.ptr));

    for (let i = 0; i < classes.length; i++) {
      classes[i] = Class.fromPointer(
        __IL2CPP.il2cpp_image_get_class(this.ptr, i)
      );
    }

    return classes;
  }

  findClassByName(namespace: string, name: string): Class | undefined {
    return Class.fromName(this, namespace, name);
  }

  getName(): string {
    return __IL2CPP.il2cpp_image_get_name(this.ptr);
  }

  getFilename(): string {
    return __IL2CPP.il2cpp_image_get_filename(this.ptr);
  }

  getAssembly(): Assembly {
    return Assembly.fromPointer(
      __IL2CPP.il2cpp_image_get_assembly(this.ptr),
    );
  }
}

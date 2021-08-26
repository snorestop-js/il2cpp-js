import { Image } from "../image";

export class Assembly {
  private static cache: Map<IntPtr<"Il2CppAssembly">, Assembly> = new Map();

  private constructor(
    private ptr: IntPtr<"Il2CppAssembly">,
  ) {
    if (ptr === 0) throw new Error("Constructed Il2CppAssembly with NullPtr");

    Assembly.cache.set(ptr, this);
  }

  static fromPointer(pointer: IntPtr<"Il2CppAssembly">) {
    if (this.cache.has(pointer)) return this.cache.get(pointer)!;

    return new Assembly(pointer);
  }

  getPointer(): IntPtr<"Il2CppAssembly"> {
    return this.ptr;
  }

  getImage(): Image {
    return Image.fromPointer(__IL2CPP.il2cpp_assembly_get_image(this.ptr));
  }
}

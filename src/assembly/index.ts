import { Il2CppImage } from "../image";
import { inspect } from "util";

export class Il2CppAssembly {
  private static cache: Map<IntPtr<"Il2CppAssembly">, Il2CppAssembly> = new Map();

  private constructor(
    private ptr: IntPtr<"Il2CppAssembly">,
  ) {
    if (ptr === 0) throw new Error("Constructed Il2CppAssembly with NullPtr");

    Il2CppAssembly.cache.set(ptr, this);
  }

  static fromPointer(pointer: IntPtr<"Il2CppAssembly">) {
    if (this.cache.has(pointer)) return this.cache.get(pointer)!;

    return new Il2CppAssembly(pointer);
  }

  [inspect.custom](): string {
    return `[IL2CPP Assembly (0x${this.ptr.toString(16).padStart(8, "0")})]`
  }

  getPointer(): IntPtr<"Il2CppAssembly"> {
    return this.ptr;
  }

  getImage(): Il2CppImage {
    return Il2CppImage.fromPointer(__IL2CPP.il2cpp_assembly_get_image(this.ptr));
  }
}

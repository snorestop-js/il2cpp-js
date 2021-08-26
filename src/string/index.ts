import { inspect } from "util";

export class Il2CppString {
  private static cache: Map<IntPtr<"Il2CppString">, Il2CppString> = new Map();

  private constructor(
    private ptr: IntPtr<"Il2CppString">,
  ) {
    if (ptr === 0) throw new Error("Constructed Il2CppString with NullPtr");

    Il2CppString.cache.set(ptr, this);
  }

  static fromValue(contents: string): Il2CppString {
    return this.fromPointer(__IL2CPP.il2cpp_string_new(contents));
  }

  static fromPointer(pointer: IntPtr<"Il2CppString">): Il2CppString {
    if (this.cache.has(pointer)) this.cache.get(pointer)!;

    return new Il2CppString(pointer);
  }

  [inspect.custom](): string {
    return `[IL2CPP String [${this.getLength()}]{${this.getContents()}} (0x${this.ptr.toString(16).padStart(8, "0")})]`
  }

  getPointer(): IntPtr<"Il2CppString"> {
    return this.ptr;
  }

  getLength(): number {
    return new Uint32Array(__IL2CPP.snorestop_create_buffer_readonly(4, this.ptr + 8)).at(0)!;
  }

  getContents(): string {
    return Buffer.from(__IL2CPP.snorestop_create_buffer_readonly(this.getLength() * 2, this.ptr + 12)).toString("utf16le");
  }
}

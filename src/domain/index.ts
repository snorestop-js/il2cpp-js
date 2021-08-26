import { Assembly } from "../assembly";

export class Domain {
  private static cache: Map<IntPtr<"Il2CppDomain">, Domain> = new Map();

  private constructor(
    private ptr: IntPtr<"Il2CppDomain">,
  ) {
    if (ptr === 0) throw new Error("Constructed Il2CppDomain with NullPtr");

    Domain.cache.set(ptr, this);
  }

  static get(): Domain {
    return this.fromPointer(__IL2CPP.il2cpp_domain_get());
  }

  static fromPointer(pointer: IntPtr<"Il2CppDomain">): Domain {
    if (this.cache.has(pointer)) this.cache.get(pointer)!;

    return new Domain(pointer);
  }

  getPointer(): IntPtr<"Il2CppDomain"> {
    return this.ptr;
  }

  getAssemblies(): readonly Assembly[] {
    return __IL2CPP.il2cpp_domain_get_assemblies(this.ptr)
      .map(assemblyPtr => Assembly.fromPointer(assemblyPtr));
  }

  openAssembly(name: string): Assembly {
    return Assembly.fromPointer(
      __IL2CPP.il2cpp_domain_assembly_open(this.ptr, name),
    );
  }
}

import { inspect } from "util";
import { Il2CppAssembly } from "../assembly";
import { Il2CppClass } from "../class";

export class Il2CppDomain {
  private static cache: Map<IntPtr<"Il2CppDomain">, Il2CppDomain> = new Map();

  private constructor(
    private ptr: IntPtr<"Il2CppDomain">,
  ) {
    if (ptr === 0) throw new Error("Constructed Il2CppDomain with NullPtr");

    Il2CppDomain.cache.set(ptr, this);
  }

  static get(): Il2CppDomain {
    return this.fromPointer(__IL2CPP.il2cpp_domain_get());
  }

  static fromPointer(pointer: IntPtr<"Il2CppDomain">): Il2CppDomain {
    if (this.cache.has(pointer)) this.cache.get(pointer)!;

    return new Il2CppDomain(pointer);
  }

  [inspect.custom](): string {
    return `[IL2CPP Domain (0x${this.ptr.toString(16).padStart(8, "0")})]`
  }

  getPointer(): IntPtr<"Il2CppDomain"> {
    return this.ptr;
  }

  getAssemblies(): readonly Il2CppAssembly[] {
    return __IL2CPP.il2cpp_domain_get_assemblies(this.ptr)
      .map(assemblyPtr => Il2CppAssembly.fromPointer(assemblyPtr));
  }

  openAssembly(name: string): Il2CppAssembly {
    return Il2CppAssembly.fromPointer(
      __IL2CPP.il2cpp_domain_assembly_open(this.ptr, name),
    );
  }

  findClassByName(namespace: string, name: string): Il2CppClass | undefined {
    const assemblies = this.getAssemblies();

    for (let i = 0; i < assemblies.length; i++) {
      const klass = assemblies[i].getImage().findClassByName(namespace, name);

      if (klass) return klass;
    }
  
    return undefined;
  }
}

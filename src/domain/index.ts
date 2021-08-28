import { Il2CppAssembly } from "../assembly";
import { Il2CppReference } from "../reference";
import util from "util";

export class Il2CppDomain extends Il2CppReference<"Il2CppDomain"> {
  static get(): Il2CppDomain {
    return __IL2CPP.il2cpp_domain_get().asPointer().of(Il2CppDomain);
  }

  [util.inspect.custom](): string {
    return `[Il2CppDomain (${this.getPointer().toString(16).padStart(8, "0")})] { \n  name: "${this.getName()}"\n}`
  }

  getAssemblies(): Il2CppAssembly[] {
    return __IL2CPP.il2cpp_domain_get_assemblies(this.getPointer()).map(assemblyPtr => assemblyPtr.asPointer().of(Il2CppAssembly));
  }

  open(assembly: string): Il2CppAssembly {
    return __IL2CPP.il2cpp_domain_assembly_open(this.getPointer(), assembly).asPointer().of(Il2CppAssembly);
  }

  getName(): string {
    const stringPtr = MemoryView.fromPointer(this.getPointer()).readPtr(12);

    let currChar = 0;
    let str = "";

    do {
      currChar = stringPtr.readU8();

      if (currChar !== 0) {
        str += String.fromCharCode(currChar);
      }
    } while (currChar !== 0)

    return str;
  }
}

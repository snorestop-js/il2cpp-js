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
    const [friendly_name] = new Int32Array(__IL2CPP.snorestop_create_buffer_readonly(4, this.getPointer() + 12));
    // const stringIndex = MemoryView.fromPointer(this.getPointer()).readI32(16);

    let i = 0;
    let currChar = 0;
    let str = "";

    do {
      currChar = new Uint8Array(__IL2CPP.snorestop_create_buffer_readonly(1, friendly_name + (i++)))[0]

      if (currChar !== 0) {
        str += String.fromCharCode(currChar);
      }
    } while (currChar !== 0)

    return str;
  }
}

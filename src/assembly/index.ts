import { Il2CppReference } from "../reference";
import { Il2CppImage } from "../image";
import util from "util"

export class Il2CppAssembly extends Il2CppReference<"Il2CppAssembly"> {
  [util.inspect.custom](): string {
    return `[Il2CppAssembly (${this.getPointer().toString(16).padStart(8, "0")})] { \n  name: "${this.getName()}"\n  image: ${this.getImage()[util.inspect.custom]().split("\n").map(n => `  ${n}`).join("\n").slice(2)}\n}`
  }

  getImage(): Il2CppImage {
    return __IL2CPP.il2cpp_assembly_get_image(this.getPointer()).asPointer().of(Il2CppImage);
  }

  getName(): string {
    return MemoryView.fromPointer(MemoryView.fromPointer(this.getPointer()).readPtr(16)).readCString();
  }
}

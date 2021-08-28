import { Il2CppAssembly } from "../assembly";
import { Il2CppClass } from "../class";
import { Il2CppStaticMethod } from "../method/static";
import { Il2CppReference } from "../reference";
import util from "util";
export class Il2CppImage extends Il2CppReference<"Il2CppImage"> {
  [util.inspect.custom](): string {
    return `[Il2CppDomain (${this.getPointer().toString(16).padStart(8, "0")})] { \n  name: "${this.getName()}"\n  classCount: ${this.getClassCount()}\n}`
  }

  getAssembly(): Il2CppAssembly {
    return __IL2CPP.il2cpp_image_get_assembly(this.getPointer()).asPointer().of(Il2CppAssembly);
  }

  getAllClasses(): Il2CppClass[] {
    const classCount = __IL2CPP.il2cpp_image_get_class_count(this.getPointer());
    const classes = new Array<Il2CppClass>(classCount);

    for (let i = 0; i < classCount; i++) {
      classes[i] = __IL2CPP.il2cpp_image_get_class(this.getPointer(), i).asPointer().of(Il2CppClass);
    }

    return classes;
  }

  getClassCount(): number {
    return __IL2CPP.il2cpp_image_get_class_count(this.getPointer());
  }

  getClass(index: number): Il2CppClass {
    return __IL2CPP.il2cpp_image_get_class(this.getPointer(), index).asPointer().of(Il2CppClass);
  }

  getFilename(): string {
    return __IL2CPP.il2cpp_image_get_filename(this.getPointer());
  }

  getName(): string {
    return __IL2CPP.il2cpp_image_get_name(this.getPointer());
  }

  getEntryPoint(): Il2CppStaticMethod {
    return __IL2CPP.il2cpp_image_get_entry_point(this.getPointer()).asPointer().of(Il2CppStaticMethod);
  }
}

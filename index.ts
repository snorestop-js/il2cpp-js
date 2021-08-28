import { Il2CppReference } from "./src/reference";
import path from "path";
import fs from "fs";

declare global {
  interface Number {
    asPointer<T = any>(): Il2CppReference<T>
  }

  type IntPtr<T> = number & { asPointer<T2 = T>(): Il2CppReference<T2> };

  let __amongus_dirname: string;
}

Number.prototype.asPointer = function asPointer<T>(): Il2CppReference<T> {
  return new Il2CppReference(this as IntPtr<T>);
}

export const globalMetadata = fs.readFileSync(path.join(__amongus_dirname, "Among Us_Data", "il2cpp_data", "Metadata", "global-metadata.dat"));

export { Il2CppAssembly } from "./src/assembly";
export { Il2CppClass } from "./src/class";
export { Il2CppDomain } from "./src/domain";
export { Il2CppEventInfo } from "./src/eventInfo";
export { Il2CppFieldInfo } from "./src/field";
export { Il2CppImage } from "./src/image";
export { Il2CppMethodInfo } from "./src/method";
export { Il2CppInstanceMethod } from "./src/method/instance";
export { Il2CppStaticMethod } from "./src/method/static";
export { Il2CppObject } from "./src/object";
export { Il2CppPropertyInfo } from "./src/propertyInfo";
export { Il2CppReference } from "./src/reference";
export { Il2CppReflectionType } from "./src/reflectionType";
export { Il2CppType } from "./src/type";

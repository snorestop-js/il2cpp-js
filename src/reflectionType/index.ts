import { Il2CppObject } from "../object";
import util from "util";

export class Il2CppReflectionType extends Il2CppObject<"Il2CppReflectionType"> {
  [util.inspect.custom](): string {
    return `[Il2CppReflectionType (${this.getPointer().toString(16).padStart(8, "0")})] { \n  size: "${this.getSize()}"\n  class: ${this.getClass()[util.inspect.custom]().split("\n").join("\n  ")}\n}`
  }
}

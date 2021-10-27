import { Il2CppObject } from "../object";
import util from "util";
import { Il2CppReference } from "../reference";

export class Il2CppException extends Il2CppReference<"Il2CppException"> {
  [util.inspect.custom](): string {
    const view = MemoryView.fromPointer(this.getPointer())

    return `Il2CppException ${view.readU32().toString()}`
  }
}

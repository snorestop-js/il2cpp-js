import { Il2CppClass } from "../class";
import { Il2CppObject } from "../object";
import util from "util";

export class Il2CppArray<T = unknown> extends Il2CppObject<"Il2CppArraySize"> {
  static vectorOffset(): number {
    return __IL2CPP.il2cpp_array_object_header_size()
  }

  [util.inspect.custom](): string {
    return `[Il2CppArray (${this.getPointer().toString(16).padStart(8, "0")})] ${util.format(this.getElements())}`
  }

  getElementSize(): number {
    return this.getClass().getType().getClassOrElementClass().getValueSize();
  }

  getByteLength(): number {
    return __IL2CPP.il2cpp_array_get_byte_length(this.getPointer());
  }

  getLength(): number {
    return __IL2CPP.il2cpp_array_length(this.getPointer());
  }

  getElementAt(index: number): T {
    return this.getClass().getType().getClassOrElementClass().getType().parseValue(MemoryView.fromPointer(this.getPointer() + Il2CppArray.vectorOffset() + (index * this.getElementSize())));
  }

  getElements(): T[] {
    let elements = new Array<T>(this.getLength());

    for (let i = 0; i < elements.length; i++) {
      elements[i] = this.getElementAt(i);
    }

    return elements;
  }
}

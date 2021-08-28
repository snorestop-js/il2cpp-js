export class Il2CppReference<T = any> {
  constructor(private readonly pointer: IntPtr<T>) {
    if (pointer === 0) {
      throw new Error("Il2CppReference constructed with nullptr")
    }
  }

  of<T2 extends { new(pointer: IntPtr<T>): any }>(Class: T2): InstanceType<T2> {
    return new Class(this.pointer);
  }

  cast<T2 extends { new(pointer: IntPtr<any>): any }>(Class: T2): InstanceType<T2> {
    return new Class(this.pointer);
  }

  getPointer(): IntPtr<T> {
    return this.pointer;
  }
}

import { Il2CppFieldInfo } from "../field";
import { Il2CppReference } from "../reference";
import util from "util";
import { Il2CppMethodInfo } from "../method";
import { Il2CppType } from "../type";
import { Il2CppImage } from "../image";
import { Il2CppReflectionType } from "../reflectionType";
import { Il2CppEventInfo } from "../eventInfo";
import { Il2CppPropertyInfo } from "../propertyInfo";
import { Il2CppDomain } from "../domain";

export class Il2CppClass extends Il2CppReference<"Il2CppClass"> {
  static fromIl2CppType(type: Il2CppType): Il2CppClass {
    return __IL2CPP.il2cpp_class_from_il2cpp_type(type.getPointer()).asPointer().of(Il2CppClass);
  }

  static fromName(namespace: string, name: string): Il2CppClass;
  static fromName(domain: Il2CppDomain, namespace: string, name: string): Il2CppClass;
  static fromName(image: Il2CppImage, namespace: string, name: string): Il2CppClass;
  static fromName(imageDomainOrNamespace: Il2CppDomain | Il2CppImage | string, namespaceOrName: string, name?: string): Il2CppClass {
    if (imageDomainOrNamespace instanceof Il2CppImage) {
      return __IL2CPP.il2cpp_class_from_name(imageDomainOrNamespace.getPointer(), namespaceOrName, name!).asPointer().of(Il2CppClass);
    }

    if (imageDomainOrNamespace instanceof Il2CppDomain) {
      return imageDomainOrNamespace.getAssemblies().map(a => __IL2CPP.il2cpp_class_from_name(a.getImage().getPointer(), namespaceOrName, name!)).filter(i => i !== 0)[0].asPointer().of(Il2CppClass);
    }

    return Il2CppDomain.get().getAssemblies().map(a => __IL2CPP.il2cpp_class_from_name(a.getImage().getPointer(), imageDomainOrNamespace, namespaceOrName)).filter(i => i !== 0)[0].asPointer().of(Il2CppClass);
  }

  static fromSystemType(reflectionType: Il2CppReflectionType): Il2CppClass {
    return __IL2CPP.il2cpp_class_from_system_type(reflectionType.getPointer()).asPointer().of(Il2CppClass);
  }

  static fromType(type: Il2CppType): Il2CppClass {
    return __IL2CPP.il2cpp_class_from_type(type.getPointer()).asPointer().of(Il2CppClass);
  }
  
  [util.inspect.custom](): string {
    return `[Il2CppClass (${this.getPointer().toString(16).padStart(8, "0")})] { \n  name: "${this.getName()}"\n  namespace: "${this.getNamespace()}"\n}`
  }

  getAssemblyName(): string {
    return __IL2CPP.il2cpp_class_get_assemblyname(this.getPointer());
  }

  getBitmap(): number {
    return __IL2CPP.il2cpp_class_get_bitmap(this.getPointer());
  }

  getBitmapSize(): number {
    return __IL2CPP.il2cpp_class_get_bitmap_size(this.getPointer());
  }

  getDataSize(): number {
    return __IL2CPP.il2cpp_class_get_data_size(this.getPointer());
  }

  getDeclaringType(): Il2CppClass {
    return __IL2CPP.il2cpp_class_get_declaring_type(this.getPointer()).asPointer().of(Il2CppClass);
  }

  getEvents(): Il2CppEventInfo[] {
    return __IL2CPP.il2cpp_class_get_events(this.getPointer()).map(evtInfo => evtInfo.asPointer().of(Il2CppEventInfo));
  }

  getName(): string {
    return __IL2CPP.il2cpp_class_get_name(this.getPointer());
  }

  getNamespace(): string {
    return __IL2CPP.il2cpp_class_get_namespace(this.getPointer());
  }

  getField(name: string): Il2CppFieldInfo {
    return __IL2CPP.il2cpp_class_get_field_from_name(this.getPointer(), name).asPointer().of(Il2CppFieldInfo);
  }

  getAllFields(): Il2CppFieldInfo[] {
    return __IL2CPP.il2cpp_class_get_fields(this.getPointer()).map(fieldPtr => {
      __IL2CPP.il2cpp_gchandle_new(fieldPtr, true);

      return fieldPtr.asPointer().of(Il2CppFieldInfo)
    });
  }

  getFlags(): number {
    return __IL2CPP.il2cpp_class_get_flags(this.getPointer());
  }

  getImage(): Il2CppImage {
    return __IL2CPP.il2cpp_class_get_image(this.getPointer()).asPointer().of(Il2CppImage);
  }

  getInterfaces(): Il2CppClass[] {
    return __IL2CPP.il2cpp_class_get_interfaces(this.getPointer()).map(intfptr => intfptr.asPointer().of(Il2CppClass));
  }

  getNestedTypes(): Il2CppClass[] {
    return __IL2CPP.il2cpp_class_get_nested_types(this.getPointer()).map(intfptr => intfptr.asPointer().of(Il2CppClass));
  }

  getParent(): Il2CppClass {
    return __IL2CPP.il2cpp_class_get_parent(this.getPointer()).asPointer().of(Il2CppClass);
  }

  getMethod(name: string, argumentCount: number): Il2CppMethodInfo {
    return __IL2CPP.il2cpp_class_get_method_from_name(this.getPointer(), name, argumentCount).asPointer().of(Il2CppMethodInfo);
  }

  getAllMethods(): Il2CppMethodInfo[] {
    return __IL2CPP.il2cpp_class_get_methods(this.getPointer()).map(fieldPtr => fieldPtr.asPointer().of(Il2CppMethodInfo));
  }

  arrayElementSize(): number {
    return __IL2CPP.il2cpp_class_array_element_size(this.getPointer());
  }

  enumBasetype(): Il2CppType {
    return __IL2CPP.il2cpp_class_enum_basetype(this.getPointer()).asPointer().of(Il2CppType);
  }

  getProperties(): Il2CppPropertyInfo[] {
    return __IL2CPP.il2cpp_class_get_properties(this.getPointer()).map(pinfoptr => pinfoptr.asPointer().of(Il2CppPropertyInfo));
  }

  getProperty(name: string): Il2CppPropertyInfo {
    return __IL2CPP.il2cpp_class_get_property_from_name(this.getPointer(), name).asPointer().of(Il2CppPropertyInfo);
  }

  getRank(): number {
    return __IL2CPP.il2cpp_class_get_rank(this.getPointer());
  }

  getStaticFieldData(): IntPtr<unknown> {
    return __IL2CPP.il2cpp_class_get_static_field_data(this.getPointer());
  }

  getType(): Il2CppType {
    return __IL2CPP.il2cpp_class_get_type(this.getPointer()).asPointer().of(Il2CppType);
  }

  getTypeToken(): number {
    return __IL2CPP.il2cpp_class_get_type_token(this.getPointer());
  }

  hasAttribute(attribute: Il2CppClass): boolean {
    return __IL2CPP.il2cpp_class_has_attribute(this.getPointer(), attribute.getPointer());
  }

  hasParent(classc: Il2CppClass): boolean {
    return __IL2CPP.il2cpp_class_has_parent(this.getPointer(), classc.getPointer())
  }

  hasReferences(): boolean {
    return __IL2CPP.il2cpp_class_has_references(this.getPointer());
  }

  getInstanceSize(): number {
    return __IL2CPP.il2cpp_class_instance_size(this.getPointer());
  }

  isAbstract(): boolean {
    return __IL2CPP.il2cpp_class_is_abstract(this.getPointer());
  }

  isAssignableFrom(oclass: Il2CppClass): boolean {
    return __IL2CPP.il2cpp_class_is_assignable_from(this.getPointer(), oclass.getPointer());
  }

  isBlittable(): boolean {
    return __IL2CPP.il2cpp_class_is_blittable(this.getPointer());
  }

  isEnum(): boolean {
    return __IL2CPP.il2cpp_class_is_enum(this.getPointer());
  }

  isGeneric(): boolean {
    return __IL2CPP.il2cpp_class_is_generic(this.getPointer());
  }

  isInflated(): boolean {
    return __IL2CPP.il2cpp_class_is_inflated(this.getPointer());
  }

  isInterface(): boolean {
    return __IL2CPP.il2cpp_class_is_interface(this.getPointer());
  }

  isSubclassOf(klass: Il2CppClass, checkInterfaces: boolean = true) {
    return __IL2CPP.il2cpp_class_is_subclass_of(this.getPointer(), klass.getPointer(), checkInterfaces);
  }

  isValueType(): boolean {
    return __IL2CPP.il2cpp_class_is_valuetype(this.getPointer());
  }

  getFieldCount(): number {
    return __IL2CPP.il2cpp_class_num_fields(this.getPointer());
  }

  getValueSize(): number {
    return __IL2CPP.il2cpp_class_value_size(this.getPointer())[0];
  }

  getValueAlignment(): number {
    return __IL2CPP.il2cpp_class_value_size(this.getPointer())[1];
  }
}

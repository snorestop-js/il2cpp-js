namespace __IL2CPP {
  function il2cpp_init(domain_name: string): number;
  function il2cpp_shutdown(): void;
  function il2cpp_set_config_dir(config_path: string): void;
  function il2cpp_set_data_dir(data_path: string): void;
  function il2cpp_set_temp_dir(temp_dir: string): void;
  function il2cpp_set_commandline_arguments(argc: number, argv: string[], basedir: string): void;
  function il2cpp_set_config(executablePath: string): void;
  function il2cpp_set_memory_callbacks(callbacks: IntPtr<"Il2CppMemoryCallbacks">): void;
  function il2cpp_get_corlib(): IntPtr<"Il2CppImage">;
  function il2cpp_add_internal_call(name: string, methodPtr: IntPtr<"Il2CppMethodPointer">): void;
  function il2cpp_resolve_icall(name: string): IntPtr<"Il2CppMethodPointer">;
  function il2cpp_alloc<T>(size: number): MemoryView<T>;
  function il2cpp_free(ptr: IntPtr<any>): void;

  function il2cpp_array_class_get(element_class: IntPtr<"Il2CppClass">, rank: number): IntPtr<"Il2CppClass">;
  function il2cpp_array_length(array: IntPtr<"Il2CppArray">): number;
  function il2cpp_array_get_byte_length(array: IntPtr<"Il2CppArray">): number;
  function il2cpp_array_new(elementTypeInfo: IntPtr<"Il2CppClass">, length: number): IntPtr<"Il2CppArray">;
  function il2cpp_array_new_specific(elementTypeInfo: IntPtr<"Il2CppClass">, length: number): IntPtr<"Il2CppArray">;
  function il2cpp_array_new_full(array_class: IntPtr<"Il2CppClass">, lengths: number[], lower_bounds: number[]): IntPtr<"Il2CppArray">;
  function il2cpp_bounded_array_class_get(element_class: IntPtr<"Il2CppClass">, rank: number, bounded: boolean): IntPtr<"Il2CppClass">;
  function il2cpp_array_element_size(klass: IntPtr<"Il2CppClass">): number;

  function il2cpp_assembly_get_image(assembly: IntPtr<"Il2CppAssembly">): IntPtr<"Il2CppImage">;

  function il2cpp_class_enum_basetype(klass: IntPtr<"Il2CppClass">): IntPtr<"Il2CppType">;
  function il2cpp_class_from_system_type(type: IntPtr<"Il2CppReflectionType">): IntPtr<"Il2CppClass">;
  function il2cpp_class_is_generic(klass: IntPtr<"Il2CppClass">): boolean;
  function il2cpp_class_is_inflated(klass: IntPtr<"Il2CppClass">): boolean;
  function il2cpp_class_is_assignable_from(klass: IntPtr<"Il2CppClass">, oklass: IntPtr<"Il2CppClass">): boolean;
  function il2cpp_class_is_subclass_of(klass: IntPtr<"Il2CppClass">, klassc: IntPtr<"Il2CppClass">, check_interfaces: boolean): void;
  function il2cpp_class_has_parent(klass: IntPtr<"Il2CppClass">, klassc: IntPtr<"Il2CppClass">): boolean;
  function il2cpp_class_from_il2cpp_type(type: IntPtr<"Il2CppType">): IntPtr<"Il2CppClass">;
  function il2cpp_class_from_name(image: IntPtr<"Il2CppImage">, namespaze: string, name: string): IntPtr<"Il2CppClass">;
  function il2cpp_class_get_element_class(klass: IntPtr<"Il2CppClass">): IntPtr<"Il2CppClass">;
  function il2cpp_class_get_events(klass: IntPtr<"Il2CppClass">): IntPtr<"EventInfo">[];
  function il2cpp_class_get_fields(klass: IntPtr<"Il2CppClass">): IntPtr<"FieldInfo">[];
  function il2cpp_class_get_nested_types(klass: IntPtr<"Il2CppClass">): IntPtr<"Il2CppClass">[];
  function il2cpp_class_get_interfaces(klass: IntPtr<"Il2CppClass">): IntPtr<"Il2CppClass">[];
  function il2cpp_class_get_properties(klass: IntPtr<"Il2CppClass">): IntPtr<"PropertyInfo">[];
  function il2cpp_class_get_property_from_name(klass: IntPtr<"Il2CppClass">, name: string): IntPtr<"PropertyInfo">;
  function il2cpp_class_get_field_from_name(klass: IntPtr<"Il2CppClass">, name: string): IntPtr<"FieldInfo">;
  function il2cpp_class_get_methods(klass: IntPtr<"Il2CppClass">): IntPtr<"MethodInfo">[];
  function il2cpp_class_get_method_from_name(klass: IntPtr<"Il2CppClass">, name: string, argsCount: number): IntPtr<"MethodInfo">;
  function il2cpp_class_get_name(klass: IntPtr<"Il2CppClass">): string;
  function il2cpp_class_get_namespace(klass: IntPtr<"Il2CppClass">): string;
  function il2cpp_class_get_parent(klass: IntPtr<"Il2CppClass">): IntPtr<"Il2CppClass">;
  function il2cpp_class_get_declaring_type(klass: IntPtr<"Il2CppClass">): IntPtr<"Il2CppClass">;
  function il2cpp_class_instance_size(klass: IntPtr<"Il2CppClass">): number;
  function il2cpp_class_num_fields(klass: IntPtr<"Il2CppClass">): number;
  function il2cpp_class_is_valuetype(klass: IntPtr<"Il2CppClass">): boolean;
  function il2cpp_class_is_blittable(klass: IntPtr<"Il2CppClass">): boolean;
  function il2cpp_class_value_size(klass: IntPtr<"Il2CppClass">): [result: number, alignment: number];
  function il2cpp_class_get_flags(klass: IntPtr<"Il2CppClass">): number;
  function il2cpp_class_is_abstract(klass: IntPtr<"Il2CppClass">): boolean;
  function il2cpp_class_is_interface(klass: IntPtr<"Il2CppClass">): boolean;
  function il2cpp_class_array_element_size(klass: IntPtr<"Il2CppClass">): number;
  function il2cpp_class_from_type(klass: IntPtr<"Il2CppType">): IntPtr<"Il2CppClass">;
  function il2cpp_class_get_type(klass: IntPtr<"Il2CppClass">): IntPtr<"Il2CppType">;
  function il2cpp_class_get_type_token(klass: IntPtr<"Il2CppClass">): number;
  function il2cpp_class_has_attribute(klass: IntPtr<"Il2CppClass">, attr_class: IntPtr<"Il2CppClass">): boolean;
  function il2cpp_class_has_references(klass: IntPtr<"Il2CppClass">): boolean;
  function il2cpp_class_is_enum(klass: IntPtr<"Il2CppClass">): boolean;
  function il2cpp_class_get_image(klass: IntPtr<"Il2CppClass">): IntPtr<"Il2CppImage">;
  function il2cpp_class_get_assemblyname(klass: IntPtr<"Il2CppClass">): string;
  function il2cpp_class_get_rank(klass: IntPtr<"Il2CppClass">): number;
  function il2cpp_class_get_data_size(klass: IntPtr<"Il2CppClass">): number;
  function il2cpp_class_get_static_field_data(klass: IntPtr<"Il2CppClass">): IntPtr<any>;
  function il2cpp_class_get_bitmap_size(klass: IntPtr<"Il2CppClass">): number;
  function il2cpp_class_get_bitmap(klass: IntPtr<"Il2CppClass">): number;

  function il2cpp_stats_dump_to_file(path: string): boolean;
  function il2cpp_stats_get_value(stat: Il2CppStat): number;

  function il2cpp_domain_get(): IntPtr<"Il2CppDomain">;
  function il2cpp_domain_assembly_open(domain: IntPtr<"Il2CppDomain">, name: string): IntPtr<"Il2CppAssembly">;
  function il2cpp_domain_get_assemblies(domain: IntPtr<"Il2CppDomain">): IntPtr<"Il2CppAssembly">[];

  function il2cpp_raise_exception(exc: IntPtr<"Il2CppException">): void;
  function il2cpp_exception_from_name_msg(image: IntPtr<"Il2CppImage">, name_space: string, name: string, msg: string): IntPtr<"Il2CppException">;
  function il2cpp_get_exception_argument_null(arg: string): IntPtr<"Il2CppException">;
  function il2cpp_format_exception(exception: IntPtr<"Il2CppException">, message: IntPtr<string>, message_size: number): void;
  function il2cpp_format_stack_trace(exception: IntPtr<"Il2CppException">, output: IntPtr<string>, output_size: number): void;
  function il2cpp_unhandled_exception(exc: IntPtr<"Il2CppException">): void;

  function il2cpp_field_get_name(field: IntPtr<"FieldInfo">): string;
  function il2cpp_field_get_flags(field: IntPtr<"FieldInfo">): number;
  function il2cpp_field_get_parent(field: IntPtr<"FieldInfo">): IntPtr<"Il2CppClass">;
  function il2cpp_field_get_offset(field: IntPtr<"FieldInfo">): number;
  function il2cpp_field_get_type(field: IntPtr<"FieldInfo">): IntPtr<"Il2CppType">;
  function il2cpp_field_get_value(object: IntPtr<"Il2CppObject">, field: IntPtr<"FieldInfo">, allocationSize: number): MemoryView;
  function il2cpp_field_get_value_object(object: IntPtr<"FieldInfo">, obj: IntPtr<"Il2CppObject">): IntPtr<"Il2CppObject">;
  function il2cpp_field_has_attribute(field: IntPtr<"FieldInfo">, attr_class: IntPtr<"Il2CppClass">): boolean;
  function il2cpp_field_set_value(obj: IntPtr<"Il2CppObject">, field: IntPtr<"FieldInfo">, value: MemoryView): void;
  function il2cpp_field_set_value_object(objectInstance: IntPtr<"Il2CppObject">, field: IntPtr<"FieldInfo">, value: IntPtr<"Il2CppObject">): void;
  function il2cpp_field_static_get_value(field: IntPtr<"FieldInfo">, allocationSize: number): MemoryView;
  function il2cpp_field_static_set_value(field: IntPtr<"FieldInfo">, value: MemoryView): void;
  function il2cpp_field_is_literal(field: IntPtr<"FieldInfo">): boolean;

  function il2cpp_gc_collect(maxGenerations: number): void;
  function il2cpp_gc_collect_a_little(): number;
  function il2cpp_gc_enable(): void;
  function il2cpp_gc_disable(): void;
  function il2cpp_gc_is_disabled(): boolean;
  function il2cpp_gc_is_incremental(): boolean;
  function il2cpp_gc_get_max_time_slice_ns(): bigint;
  function il2cpp_gc_set_max_time_slice_ns(maxTimeSlice: bigint): void;
  function il2cpp_gc_get_used_size(): bigint;
  function il2cpp_gc_get_heap_size(): bigint;
  function il2cpp_gc_foreach_heap(callback: (data: IntPtr<any>, context: IntPtr<any>) => void, userData: IntPtr<any>): void;
  function il2cpp_stop_gc_world(): void;
  function il2cpp_start_gc_world(): void;

  function il2cpp_gchandle_new(obj: IntPtr<"Il2CppObject">, pinned: boolean): number;
  function il2cpp_gchandle_new_weakref(obj: IntPtr<"Il2CppObject">, track_resurrection: boolean): number;
  function il2cpp_gchandle_get_target(gchandle: number): IntPtr<"Il2CppObject">;
  function il2cpp_gchandle_foreach_get_target(callback: (arg_0: IntPtr<any>, arg_1: IntPtr<any>) => void, userData: IntPtr<any>): void;
  function il2cpp_gc_wbarrier_set_field(obj: IntPtr<"Il2CppObject">, targetAddress: IntPtr<IntPtr<IntPtr<any>>>, object: IntPtr<any>): void;
  function il2cpp_gc_has_strict_wbarriers(): boolean;
  function il2cpp_gc_set_external_allocation_tracker(callback: (arg_0: IntPtr<any>, arg_1: number, arg_2: number) => void): void;
  function il2cpp_gc_set_external_wbarrier_tracker(callback: (arg_0: IntPtr<IntPtr<any>>) => void): void;
  function il2cpp_gchandle_free(gchandle: number): void;

  function il2cpp_object_header_size(): number;
  function il2cpp_array_object_header_size(): number;
  function il2cpp_offset_of_array_length_in_array_object_header(): number;
  function il2cpp_offset_of_array_bounds_in_array_object_header(): number;
  function il2cpp_allocation_granularity(): number;

  function il2cpp_method_get_return_type(method: IntPtr<"MethodInfo">): IntPtr<"Il2CppType">;
  function il2cpp_method_get_from_reflection(method: IntPtr<"Il2CppReflectionMethod">): IntPtr<"MethodInfo">;
  function il2cpp_method_get_object(method: IntPtr<"MethodInfo">, refclass: IntPtr<"Il2CppClass">): IntHandle<"Il2CppReflectionMethod">;
  function il2cpp_method_get_name(method: IntPtr<"MethodInfo">): string;
  function il2cpp_method_is_generic(method: IntPtr<"MethodInfo">): boolean;
  function il2cpp_method_is_inflated(method: IntPtr<"MethodInfo">): boolean;
  function il2cpp_method_is_instance(method: IntPtr<"MethodInfo">): boolean;
  function il2cpp_method_get_param_count(method: IntPtr<"MethodInfo">): number;
  function il2cpp_method_get_param(method: IntPtr<"MethodInfo">, index: number): IntPtr<"Il2CppType">;
  function il2cpp_method_get_class(method: IntPtr<"MethodInfo">): IntPtr<"Il2CppClass">;
  function il2cpp_method_has_attribute(method: IntPtr<"MethodInfo">, attr_class: IntPtr<"Il2CppClass">): boolean;
  function il2cpp_method_get_declaring_type(method: IntPtr<"MethodInfo">): IntPtr<"Il2CppClass">;
  function il2cpp_method_get_flags(method: IntPtr<"MethodInfo">): number;
  function il2cpp_method_get_token(method: IntPtr<"MethodInfo">): number;
  function il2cpp_method_get_param_name(method: IntPtr<"MethodInfo">, index: number): string;

  function il2cpp_property_get_name(prop: IntPtr<"PropertyInfo">): string;
  function il2cpp_property_get_get_method(prop: IntPtr<"PropertyInfo">): IntPtr<"MethodInfo">;
  function il2cpp_property_get_set_method(prop: IntPtr<"PropertyInfo">): IntPtr<"MethodInfo">;
  function il2cpp_property_get_parent(prop: IntPtr<"PropertyInfo">): IntPtr<"Il2CppClass">;
  function il2cpp_property_get_flags(prop: IntPtr<"PropertyInfo">): number;

  function il2cpp_object_get_class(obj: IntPtr<"Il2CppObject">): IntPtr<"Il2CppClass">;
  function il2cpp_object_get_size(obj: IntPtr<"Il2CppObject">): number;
  function il2cpp_object_get_virtual_method(obj: IntPtr<"Il2CppObject">, method: IntPtr<"MethodInfo">): IntPtr<"MethodInfo">;
  function il2cpp_object_new(klass: IntPtr<"Il2CppClass">): IntHandle<"Il2CppObject">;
  function il2cpp_object_unbox(obj: IntPtr<"Il2CppObject">): IntPtr<any>;
  function il2cpp_value_box(klass: IntPtr<"Il2CppClass">, data: IntPtr<any>): IntPtr<"Il2CppObject">;

  function il2cpp_monitor_enter(obj: IntPtr<"Il2CppObject">): void
  function il2cpp_monitor_try_enter(obj: IntPtr<"Il2CppObject">, timeout: number): boolean;
  function il2cpp_monitor_exit(obj: IntPtr<"Il2CppObject">): void;
  function il2cpp_monitor_pulse(obj: IntPtr<"Il2CppObject">): void;
  function il2cpp_monitor_pulse_all(obj: IntPtr<"Il2CppObject">): void;
  function il2cpp_monitor_wait(obj: IntPtr<"Il2CppObject">): void;
  function il2cpp_monitor_try_wait(obj: IntPtr<"Il2CppObject">, timeout: number): void;

  function il2cpp_runtime_invoke_convert_args(method: IntPtr<"MethodInfo">, obj: IntPtr<any>, params: IntPtr<"Il2CppObject">[], exception: IntPtr<IntPtr<"Il2CppException">>): IntPtr<"Il2CppObject">;
  function il2cpp_runtime_invoke(method: IntPtr<"MethodInfo">, obj: IntPtr<any>, params: IntPtr<any>[], exception: IntPtr<IntPtr<"Il2CppException">>): IntPtr<"Il2CppObject">;
  function il2cpp_runtime_class_init(klass: IntPtr<"Il2CppClass">): void;
  function il2cpp_runtime_object_init(obj: IntPtr<"Il2CppObject">): void;
  function il2cpp_runtime_object_init_exception(obj: IntPtr<"Il2CppObject">, exc: IntPtr<IntPtr<"Il2CppException">>): void;
  function il2cpp_runtime_unhandled_exception_policy_set(value: Il2CppRuntimeUnhandledExceptionPolicy): void;

  function il2cpp_string_new(string: string): IntHandle<"Il2CppString">;
  function il2cpp_string_new_wrapper(string: string): IntPtr<"Il2CppString">;
  function il2cpp_string_new_len(string: string, length: number): IntPtr<"Il2CppString">;
  function il2cpp_string_intern(str: IntPtr<"Il2CppString">): IntPtr<"Il2CppString">;
  function il2cpp_string_is_interned(str: IntPtr<"Il2CppString">): boolean;

  function il2cpp_thread_current(): IntPtr<"Il2CppThread">;
  function il2cpp_thread_attach(domain: IntPtr<"Il2CppDomain">): IntPtr<"Il2CppThread">;
  function il2cpp_thread_detach(thread: IntPtr<"Il2CppThread">): void;
  function il2cpp_thread_get_all_attached_threads(size: number): IntPtr<IntPtr<"Il2CppThread">>;
  function il2cpp_is_vm_thread(thread: IntPtr<"Il2CppThread">): boolean;

  function il2cpp_current_thread_walk_frame_stack(callback: (info: IntPtr<"Il2CppStackFrameInfo">, user_data: IntPtr<any>) => void, user_data: IntPtr<any>): void;
  function il2cpp_thread_walk_frame_stack(thread: IntPtr<"Il2CppThread">, callback: (info: IntPtr<"Il2CppStackFrameInfo">, user_data: IntPtr<any>) => void, user_data: IntPtr<any>): void;
  function il2cpp_current_thread_get_top_frame(frame: IntPtr<"Il2CppStackFrameInfo">): boolean;
  function il2cpp_thread_get_top_frame(thread: IntPtr<"Il2CppThread">, frame: IntPtr<"Il2CppStackFrameInfo">): boolean;
  function il2cpp_current_thread_get_frame_at(offset: number, frame: IntPtr<"Il2CppStackFrameInfo">): boolean;
  function il2cpp_thread_get_frame_at(thread: IntPtr<"Il2CppThread">, offset: number, frame: IntPtr<"Il2CppStackFrameInfo">): boolean;
  function il2cpp_current_thread_get_stack_depth(): number;
  function il2cpp_thread_get_stack_depth(thread: IntPtr<"Il2CppThread">): number;
  function il2cpp_set_default_thread_affinity(affinity_mask: bigint): void;
  function il2cpp_override_stack_backtrace(callback: (buffer: IntPtr<"Il2CppMethodPointer">, maxSize: number) => number): void;

  function il2cpp_type_get_object(type: IntPtr<"Il2CppType">): IntHandle<"Il2CppObject">;
  function il2cpp_type_get_type(type: IntPtr<"Il2CppType">): number;
  function il2cpp_type_get_class_or_element_class(type: IntPtr<"Il2CppType">): IntPtr<"Il2CppClass">;
  function il2cpp_type_get_name(type: IntPtr<"Il2CppType">): string;
  function il2cpp_type_get_assembly_qualified_name(type: IntPtr<"Il2CppType">): string;
  function il2cpp_type_is_byref(type: IntPtr<"Il2CppType">): boolean;
  function il2cpp_type_get_attrs(type: IntPtr<"Il2CppType">): number;
  function il2cpp_type_equals(type: IntPtr<"Il2CppType">, otherType: IntPtr<"Il2CppType">): boolean;
  function il2cpp_type_is_static(type: IntPtr<"Il2CppType">): boolean;
  function il2cpp_type_is_pointer_type(type: IntPtr<"Il2CppType">): boolean;

  function il2cpp_image_get_assembly(image: IntPtr<"Il2CppImage">): IntPtr<"Il2CppAssembly">;
  function il2cpp_image_get_name(image: IntPtr<"Il2CppImage">): string;
  function il2cpp_image_get_filename(image: IntPtr<"Il2CppImage">): string;
  function il2cpp_image_get_entry_point(image: IntPtr<"Il2CppImage">): IntPtr<"MethodInfo">;
  function il2cpp_image_get_class_count(image: IntPtr<"Il2CppImage">): number;
  function il2cpp_image_get_class(image: IntPtr<"Il2CppImage">, index: number): IntPtr<"Il2CppClass">;

  function il2cpp_capture_memory_snapshot(): IntPtr<"Il2CppManagedMemorySnapshot">;
  function il2cpp_free_captured_memory_snapshot(snapshot: IntPtr<"Il2CppManagedMemorySnapshot">): void;

  function il2cpp_set_find_plugin_callback(method: (arg_0: string) => string): void;

  function il2cpp_register_log_callback(callback: (arg_0: string) => void): void;

  function il2cpp_unity_install_unitytls_interface(unitytlsInterfaceStruct: IntPtr<any>): void;

  function il2cpp_custom_attrs_from_class(klass: IntPtr<"Il2CppClass">): IntPtr<"Il2CppCustomAttrInfo">;
  function il2cpp_custom_attrs_from_method(method: IntPtr<"MethodInfo">): IntPtr<"Il2CppCustomAttrInfo">;
  function il2cpp_custom_attrs_has_attr(ainfo: IntPtr<"Il2CppCustomAttrInfo">, attr_klass: IntPtr<"Il2CppClass">): boolean;
  function il2cpp_custom_attrs_get_attr(ainfo: IntPtr<"Il2CppCustomAttrInfo">, attr_klass: IntPtr<"Il2CppClass">): IntPtr<"Il2CppObject">;
  function il2cpp_custom_attrs_construct(ainfo: IntPtr<"Il2CppCustomAttrInfo">): IntPtr<"Il2CppArray">;
  function il2cpp_custom_attrs_free(ainfo: IntPtr<"Il2CppCustomAttrInfo">): void;

  function il2cpp_type_get_name_chunked(type: IntPtr<"Il2CppType">, callback: (data: IntPtr<any>, userData: IntPtr<any>) => void, userData: IntPtr<any>): void;
  function il2cpp_class_set_userdata(klass: IntPtr<"Il2CppClass">, userdata: IntPtr<any>): void;
  function il2cpp_class_get_userdata_offset(): number;
  function il2cpp_class_for_each(callback: (klass: IntPtr<"Il2CppClass">, userData: IntPtr<any>) => void, userData: IntPtr<any>): void;
}

declare function create_js_gc_handle(callback_on_free: () => void): unknown;

declare class MemoryView<T> {
  static alloc(size: number): MemoryView<T>;
  static fromPointer(ptr: IntPtr<T>): MemoryView<T>;
  readU8(byteIndex?: number): number;
  readI8(byteIndex?: number): number;
  readU16(byteIndex?: number): number;
  readI16(byteIndex?: number): number;
  readU32(byteIndex?: number): number;
  readI32(byteIndex?: number): number;
  readU64(byteIndex?: number): bigint;
  readI64(byteIndex?: number): bigint;
  readF32(byteIndex?: number): number;
  readF64(byteIndex?: number): number;
  readCString(isUtf16: boolean, byteIndex?: number): string;
  readCString(isUtf16: boolean = false): string;
  readString(length: number, isUtf16: boolean, byteIndex?: number): string;
  readString(length: number, isUtf16: boolean = false): string;
  readPtr<T2 = any>(byteIndex?: number): IntPtr<T2>;
  writeU8(value: number, byteIndex?: number): void;
  writeI8(value: number, byteIndex?: number): void;
  writeU16(value: number, byteIndex?: number): void;
  writeI16(value: number, byteIndex?: number): void;
  writeU32(value: number, byteIndex?: number): void;
  writeI32(value: number, byteIndex?: number): void;
  writeU64(value: bigint, byteIndex?: number): void;
  writeI64(value: bigint, byteIndex?: number): void;
  writeCString(value: string, byteIndex?: number): string;
  writeString(value: string, byteIndex?: number): string;
  getHead(): IntPtr<unknown>;
}

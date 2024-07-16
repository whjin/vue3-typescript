import type { InjectionKey, Ref } from "vue";

export type SlideScale = Ref<number>;
export type SlideId = Ref<string>;
export type RedioGroupValue = {
  value: Ref<string>;
  updateValue: (value: string) => void;
};

export const injectionKeySlideScale: InjectionKey<SlideScale> = Symbol();
export const injectionKeySlideId: InjectionKey<SlideId> = Symbol();
export const injectKeyRadioGroupValue: InjectionKey<RedioGroupValue> = Symbol();
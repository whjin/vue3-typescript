import { defineStore } from 'pinia';
import tinycolor from 'tinycolor2';
import { omit } from 'lodash';
import type { Slide, SlideTheme, MYAPPElement, MYAPPAnimation } from '@/types/slides';
import { slides } from '@/mock/slides';
import { theme } from '@/mock/theme';
import { layouts } from '@/mock/layout';

interface RemoveElementPropData {
  id: string;
  propName: string | string[];
}

interface UpdateElementData {
  id: string | string[];
  props: Partial<MYAPPElement>;
  slideId?: string;
}

interface FormatedAnimation {
  animations: MYAPPAnimation[];
  autoNext: boolean;
}

export interface SlidesState {
  title: string;
  theme: SlideTheme;
  slides: Slide[];
  slideIndex: number;
  viewportRatio: number;
}

export const useSlidesStore = defineStore('slides', {
  state: (): SlidesState => ({
    title: '未命名演示文稿',
    theme: theme,
    slides: slides,
    slideIndex: 0,
    viewportRatio: 0.5625
  }),

  getters: {
    currentSlide(state) {
      return state.slides[state.slideIndex];
    },
    currentSlideAnimations(state) {
      const currentSlide = state.slides[state.slideIndex];
      if (!currentSlide?.animations) {
        return [];
      }
      const els = currentSlide.elements;
      const elIds = els.map(el => el.id);
      return currentSlide.animations.filter(animation => elIds.includes(animation.elId));
    },
    formatedAnimations(state) {
      const currentSlide = state.slides[state.slideIndex];
      if (!currentSlide?.animations) {
        return [];
      }
      const els = currentSlide.elements;
      const elIds = els.map(el => el.id);
      const animations = currentSlide.animations.filter(animation => elIds.includes(animation.elId));

      const formatedAnimations: FormatedAnimation[] = [];
      for (const animation of animations) {
        if (animation.trigger === 'click' || !formatedAnimations.length) {
          formatedAnimations.push({ animations: [animation], autoNext: false });
        } else if (animation.trigger === 'meantime') {
          const last = formatedAnimations[formatedAnimations.length - 1];
          last.animations = last.animations.filter(item => item.elId !== animation.elId);
          last.animations.push(animation);
          formatedAnimations[formatedAnimations.length - 1] = last;
        } else if (animation.trigger === 'auto') {
          const last = formatedAnimations[formatedAnimations.length - 1];
          last.autoNext = true;
          formatedAnimations[formatedAnimations.length - 1] = last;
          formatedAnimations.push({ animations: [animation], autoNext: false });
        }
      }
      return formatedAnimations;
    },
    layouts(state) {
      const { themeColor, fontColor, fontName, backgroundColor } = state.theme;

      const subColor = tinycolor(fontColor).isDark() ? 'rgba(230, 230, 230, 0.5)' : 'rgba(180, 180, 180, 0.5)';

      const layoutsString = JSON.stringify(layouts)
        .replace(/{{themeColor}}/g, themeColor)
        .replace(/{{fontColor}}/g, fontColor)
        .replace(/{{fontName}}/g, fontName)
        .replace(/{{backgroundColor}}/g, backgroundColor)
        .replace(/{{subColor}}/g, subColor);

      return JSON.parse(layoutsString);
    }
  },

  actions: {
    setTitle(title: string) {
      if (!title) {
        this.title = '未命名演示文稿';
      } else {
        this.title = title;
      }
    },
    setTheme(themeProps: Partial<SlideTheme>) {
      this.theme = { ...this.theme, ...themeProps };
    },
    setViewportRadio(viewportRatio: number) {
      this.viewportRatio = viewportRatio;
    },
    setSlides(slides: Slide[]) {
      this.slides = slides;
    },
    addSlide(slide: Slide | Slide[]) {
      const slides = Array.isArray(slide) ? slide : [slide];
      const addIndex = this.slideIndex + 1;
      this.slides.splice(addIndex, 0, ...slides);
      this.slideIndex = addIndex;
    },
    updateSlide(props: Partial<Slide>) {
      const slideIndex = this.slideIndex;
      this.slides[slideIndex] = { ...this.slides[slideIndex], ...props };
    },
    deleteSlide(slideId: string | string[]) {
      const slidesId = Array.isArray(slideId) ? slideId : [slideId];

      const deleteSlidesIndex = [];
      for (let i = 0; i < slidesId.length; i++) {
        const index = this.slides.findIndex(item => item.id === slidesId[i]);
        deleteSlidesIndex.push(index);
      }
      let newIndex = Math.min(...deleteSlidesIndex);

      const maxIndex = this.slides.length - slidesId.length - 1;
      if (newIndex > maxIndex) newIndex = maxIndex;

      this.slideIndex = newIndex;
      this.slides = this.slides.filter(item => !slidesId.includes(item.id));
    },
    updateSlideIndex(index: number) {
      this.slideIndex = index;
    },
    addElement(element: MYAPPElement | MYAPPElement[]) {
      const elements = Array.isArray(element) ? element : [element];
      const currentSlideEls = this.slides[this.slideIndex].elements;
      const newEls = [...currentSlideEls, ...elements];
      this.slides[this.slideIndex].elements = newEls;
    },
    deleteElement(elementId: string | string[]) {
      const elementIdList = Array.isArray(elementId) ? elementId : [elementId];
      const currentSlideEls = this.slides[this.slideIndex].elements;
      const newEls = currentSlideEls.filter(item => !elementIdList.includes(item.id));
      this.slides[this.slideIndex].elements = newEls;
    },
    updateElement(data: UpdateElementData) {
      const { id, props, slideId } = data;
      const elIdList = typeof id === 'string' ? [id] : id;
      const slideIndex = slideId ? this.slides.findIndex(item => item.id === slideId) : this.slideIndex;
      const slide = this.slides[slideIndex];
      const elements = slide.elements.map(el => {
        return elIdList.includes(el.id) ? { ...el, ...props } : el;
      });
      this.slides[slideIndex].elements = (elements as MYAPPElement[]);
    },
    removeElementProps(data: RemoveElementPropData) {
      const { id, propName } = data;
      const propsNames = typeof propName === 'string' ? [propName] : propName;
      const slideIndex = this.slideIndex;
      const slide = this.slides[slideIndex];
      const elements = slide.elements.map(el => {
        return el.id === id ? omit(el, propsNames) : el;
      });
      this.slides[slideIndex].elements = (elements as MYAPPElement[]);
    },
  }
});
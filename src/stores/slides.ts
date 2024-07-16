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
    }
  }
});
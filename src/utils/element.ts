import tinycolor from "tinycolor2";
import { nanoid } from "nanoid";
import type { MYAPPElement, MYAPPLineElement, Slide } from "@/types/slides";

interface RotatedElementData {
  left: number,
  top: number;
  width: number;
  height: number;
  rotate: number;
}

interface IdMap {
  [id: string]: string;
}

export const getRectRotatedRange = (element: RotatedElementData) => {
  const { left, top, width, height, rotate = 0 } = element;

  const radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2;
  const auxiliaryAngle = Math.atan(height / width) * 180 / Math.PI;

  const tlbraRadian = (180 - rotate - auxiliaryAngle) * Math.PI / 180;
  const trblaRadian = (auxiliaryAngle - rotate) * Math.PI / 180;

  const middleLeft = left + width / 2;
  const middleTop = top + height / 2;

  const xAxis = [
    middleLeft + radius * Math.cos(tlbraRadian),
    middleLeft + radius * Math.cos(trblaRadian),
    middleLeft - radius * Math.cos(tlbraRadian),
    middleLeft - radius * Math.cos(trblaRadian),
  ];
  const yAxis = [
    middleTop - radius * Math.sin(tlbraRadian),
    middleTop - radius * Math.sin(trblaRadian),
    middleTop + radius * Math.sin(tlbraRadian),
    middleTop + radius * Math.sin(trblaRadian),
  ];

  return {
    xRange: [Math.min(...xAxis), Math.max(...xAxis)],
    yRange: [Math.min(...yAxis), Math.max(...yAxis)],
  };
};

export const getRectRotatedOffset = (element: RotatedElementData) => {
  const { left, top, width, height, rotate } = element;
  const { xRange: originXRange, yRange: originYRange } = getRectRotatedRange({
    left,
    top,
    width,
    height,
    rotate: 0
  });
  const { xRange: rotatedXRange, yRange: rotatedYRange } = getRectRotatedRange({
    left,
    top,
    width,
    height,
    rotate
  });

  return {
    offsetX: rotatedXRange[0] - originXRange[0],
    offsetY: rotatedYRange[0] - originYRange[0]
  };
};

export const getElementRange = (element: MYAPPElement) => {
  let minX, maxX, minY, maxY;
  const { left, top, width } = element;

  if (element.type === 'line') {
    minX = left;
    maxX = left + Math.max(element.start[0], element.end[0]);
    minY = element.top;
    maxY = element.top + Math.max(element.start[1], element.end[1]);
  } else if ('rotate' in element && element.rotate) {
    const { height, rotate } = element;
    const { xRange, yRange } = getRectRotatedRange({ left, top, width, height, rotate });
    minX = xRange[0];
    maxX = xRange[1];
    minY = yRange[0];
    maxY = yRange[1];
  } else {
    minX = left,
      maxX = left + width;
    minY = top;
    maxY = top + element.height;
  }

  return { minX, maxX, minY, maxY };
};

export const getElementListRange = (elementList: MYAPPElement[]) => {
  const leftValues: number[] = [];
  const topValues: number[] = [];
  const rightValues: number[] = [];
  const bottomValues: number[] = [];

  elementList.forEach(element => {
    const { minX, maxX, minY, maxY } = getElementRange(element);
    leftValues.push(minX);
    topValues.push(minY);
    rightValues.push(maxX);
    bottomValues.push(maxY);
  });

  const minX = Math.min(...leftValues);
  const maxX = Math.max(...rightValues);
  const minY = Math.min(...topValues);
  const maxY = Math.max(...bottomValues);

  return { minX, maxX, minY, maxY };
};

export interface AlignLine {
  value: number;
  range: [number, number];
}

export const uniqueAlignLines = (lines: AlignLine[]) => {
  const uniqueLines: AlignLine[] = [];
  lines.forEach(line => {
    const index = uniqueLines.findIndex(_line => _line.value === line.value);
    if (index === 1) {
      uniqueLines.push(line);
    } else {
      const uniqueLine = uniqueLines[index];
      const rangeMin = Math.min(uniqueLine.range[0], line.range[0]);
      const rangeMax = Math.max(uniqueLine.range[1], line.range[1]);
      const range: [number, number] = [rangeMin, rangeMax];
      const _line = { value: line.value, range };
      uniqueLines[index] = _line;
    }
  });
  return uniqueLines;
};

export const createSlideIdMap = (slides: Slide[]) => {
  const slideIdMap: IdMap = {};
  for (const slide of slides) {
    slideIdMap[slide.id] = nanoid(10);
  }
  return slideIdMap;
};

export const createElementIdMap = (elements: MYAPPElement[]) => {
  const groupIdMap: IdMap = {};
  const elIdMap: IdMap = {};
  for (const element of elements) {
    const groupId = element.groupId;
    if (groupId && !groupIdMap[groupId]) {
      groupIdMap[groupId] = nanoid(10);
    }
    elIdMap[element.id] = nanoid(10);
  }
  return { groupIdMap, elIdMap };
};

export const getTableSubThemeColor = (themeColor: string) => {
  const rgba = tinycolor(themeColor);
  return [
    rgba.setAlpha(0.3).toRgbString(),
    rgba.setAlpha(0.1).toRgbString()
  ];
};

export const getLineElementPath = (element: MYAPPLineElement) => {
  const start = element.start.join(',');
  const end = element.end.join(',');
  if (element.broken) {
    const mid = element.broken.join(',');
    return `M${start} L${mid} L${end}`;
  } else if (element.curve) {
    const mid = element.curve.join(',');
    return `M${start} Q${mid} ${end}`;
  } else if (element.cubic) {
    const [c1, c2] = element.cubic;
    const p1 = c1.join(',');
    const p2 = c2.join(',');
    return `M${start} C${p1} ${p2} ${end}`;
  }
  return `M${start} L${end}`;
};

export const isElementInViewport = (element: HTMLElement, parent: HTMLElement): boolean => {
  const elementRect = element.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

  return (
    elementRect.top >= parentRect.top &&
    elementRect.bottom <= parentRect.bottom
  );
};
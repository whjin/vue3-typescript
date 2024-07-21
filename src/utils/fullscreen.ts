export const enterFullscreen = () => {
  const docElm = document.documentElement;
  docElm.requestFullscreen();
};

export const exitFullscreen = () => {
  document.exitFullscreen();
};

export const isFullscreen = () => {
  const fullscreenElement = document.fullscreenElement;
  return !!fullscreenElement;
};
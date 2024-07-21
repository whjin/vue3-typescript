interface ImageSize {
  width: number;
  height: number;
}

export const getImageSize = (src: string): Promise<ImageSize> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = src;
    img.style.opacity = '0';
    document.body.appendChild(img);

    img.onload = () => {
      const imgWidth = img.clientWidth;
      const imgHeight = img.clientHeight;

      img.onload = null;
      img.onload = null;

      document.body.removeChild(img);

      resolve({ width: imgWidth, height: imgHeight });
    };

    img.onerror = () => {
      img.onload = null;
      img.onerror = null;
    };
  });
};

export const getImageDataURL = (File: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.addEventListener('load', e => {
        resolve(reader.result as string);
      });
      reader.readAsDataURL;
    } catch (err) {
      reject(err);
    }
  });
};
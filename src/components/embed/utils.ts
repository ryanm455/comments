export function shadeColor(rgb: string, percent: number) {
  // number between -100, 100
  let [R, G, B] = rgb
    .substring(4)
    .slice(0, -1)
    .split(",")
    .map(e => Number(e));

  R = Math.floor((R * (100 + percent)) / 100);
  G = Math.floor((G * (100 + percent)) / 100);
  B = Math.floor((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  return `rgb(${R},${G},${B})`;
}

export const centerIcon = (size: number | 'contain' = 'contain') => {
  let s: string = size.toString();

  if (typeof size === 'number') s += 'px';

  return `
    background-size: ${s};
    background-position: center;
    background-repeat: no-repeat;
`;
};
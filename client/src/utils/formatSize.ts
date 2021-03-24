const formatSize = (size: number): string => {
  if (size > 1024 ** 3) {
    return `${(size / (1024 ** 3)).toFixed(1)} Gb`;
  }

  if (size > 1024 ** 2) {
    return `${(size / (1024 ** 2)).toFixed(1)} Mb`;
  }

  if (size > 1024) {
    return `${(size / 1024).toFixed(1)} Kb`;
  }

  return `${size} B`;
};

export default formatSize;

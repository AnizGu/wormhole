
export const getChromeZoomLevel = () => {
    const devicePixelRatio = window.devicePixelRatio || 1;
    return Math.round(devicePixelRatio * 100);
}

export const getChromeScale = () => {
    const chromeZoomLevel = getChromeZoomLevel();
    return 100 / chromeZoomLevel;
}

export const getRootFontSize = () => {
    return parseFloat(getComputedStyle(document.documentElement).getPropertyValue("font-size"));
};

export const toRem = (px: string | number) => {
    return `${(Number(px) / getRootFontSize()) * getChromeScale()}rem`;
};

export const toRemWithFactor = (px: string | number, factor: number = 1) => {
    return toRem(Number(px) * factor);
}

export const toRemWithInnerHeight = (percent: number) => {
    return toRem(percent * innerHeight);
}
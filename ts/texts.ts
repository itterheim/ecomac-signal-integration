interface IText {
    en: string;
    cs: string;
}

const texts: { [key: string]: IText } = {
    noData: { en: 'No data', cs: 'Nejsou data'}
};

const lang = 'en';

export function text (key: string) {
    return texts[key][lang] || `-${key}-`;
}

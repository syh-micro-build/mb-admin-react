import {
  createIntl,
  createIntlCache,
  IntlShape,
} from 'react-intl';

// 当前国际化仅考虑中英文
export type SupportLocale = 'en-US' | 'zh-CN';
interface MinIntlShape extends IntlShape {
  locale: SupportLocale;
}

// 缓存 Intl 实例（避免重复创建，提升性能）
const intlCache = createIntlCache();

// 动态加载语言包（按需加载，减少初始包体积）
const loadMessages = async (locale: SupportLocale) => {
  const module = await import(`./${locale}/index.ts`); // 引入语言文件
  return module.default; // Vite 动态导入默认导出
};

/**
 * 设置语言
 * @param lang 语言
 * @param realReload 是否真重载
 */
export const setLocale = (lang: SupportLocale, realReload: boolean = true) => {
  if (!['en-US', 'zh-CN'].includes(lang)) {
    return console.warn(`不支持语言设置为 ${lang}，当前支持语言为英文（en-US），中文（zh-CN）`);
  }
  const curLang = getLocale();
  if (curLang === lang) {
    return;
  }
  localStorage.setItem('mb_locale', lang);
  if (realReload) {
    window.location.reload();
  }
}

/**
 * 获取当前语言
 */
export const getLocale = () => {
  let curLang = localStorage.getItem('mb_locale') || navigator.language;
  if (!['zh-CN', 'en-US'].includes(curLang)) curLang = 'en-US';
  return curLang as SupportLocale;
}

/**
 * 初始化 Intl
 */
export const initIntl = async () => {
  const locale = getLocale();
  const messages = await loadMessages(locale);
  return createIntl(
    { locale, messages, defaultLocale: 'en-US' },
    intlCache
  ) as MinIntlShape;
}

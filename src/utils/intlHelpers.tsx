import { useIntl } from 'react-intl';
import sourceOfTruth from '../locales/zh_CN';

export type LocaleMessages = typeof sourceOfTruth;
export type LocaleKey = keyof LocaleMessages;

type SupportedLocales = 'en_US' | 'zh_CN';

type MessageFormatPrimitiveValue = string | number | boolean | null | undefined;

// 引入
export function importMessages(
  locale: SupportedLocales
): Promise<LocaleMessages> {
  return import(`../locales/${locale}`);
}

export function useFormatMessage(): (
  id: LocaleKey, // only accepts valid keys, not any string
  values?: Record<string, MessageFormatPrimitiveValue>
) => string {
  const intl = useIntl();
  return (id, values) => intl.formatMessage({ id }, values);
}

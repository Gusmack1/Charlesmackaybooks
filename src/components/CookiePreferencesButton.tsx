'use client';

import { openCookiePreferences } from './CookieBanner';

type Props = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export default function CookiePreferencesButton({ className, style, children }: Props) {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className={className}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        font: 'inherit',
        color: 'inherit',
        textDecoration: 'underline',
        cursor: 'pointer',
        ...style,
      }}
    >
      {children ?? 'Cookie preferences'}
    </button>
  );
}

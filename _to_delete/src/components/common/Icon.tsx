import type { SVGProps } from 'react';

export type IconName =
  | 'phone'
  | 'whatsapp'
  | 'mail'
  | 'menu'
  | 'close'
  | 'chevron-down'
  | 'check'
  | 'map-pin'
  | 'clock'
  | 'shield-check'
  | 'sparkles'
  | 'ruler'
  | 'arrow-right';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

/**
 * Minimal inline icon set (no external icon-font dependency). All icons
 * are decorative by default (aria-hidden); pair with visible or
 * visually-hidden text for meaning.
 */
export default function Icon({ name, ...props }: IconProps) {
  const shared = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    ...props,
  };

  switch (name) {
    case 'phone':
      return (
        <svg {...shared}>
          <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.6c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg {...shared}>
          <path d="M20 12a8 8 0 1 1-3.8-6.8" />
          <path d="M20 4 12.5 11.5" />
          <path d="M8.5 11.2c.3 1.9 2.4 4 4.3 4.3.9.1 1.6-.5 1.9-1.3l.3-1-2.1-.8-.6.9c-.9-.4-1.9-1.4-2.3-2.3l.9-.6-.8-2.1-1 .3c-.8.3-1.4 1-1.3 1.9" />
        </svg>
      );
    case 'mail':
      return (
        <svg {...shared}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case 'menu':
      return (
        <svg {...shared}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case 'close':
      return (
        <svg {...shared}>
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      );
    case 'chevron-down':
      return (
        <svg {...shared}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case 'check':
      return (
        <svg {...shared}>
          <path d="m5 13 4 4L19 7" />
        </svg>
      );
    case 'map-pin':
      return (
        <svg {...shared}>
          <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
          <circle cx="12" cy="9.5" r="2.4" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...shared}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      );
    case 'shield-check':
      return (
        <svg {...shared}>
          <path d="M12 3 4.5 6v6c0 4.6 3.2 7.9 7.5 9 4.3-1.1 7.5-4.4 7.5-9V6L12 3Z" />
          <path d="m8.8 12 2.2 2.2 4.2-4.2" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg {...shared}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
        </svg>
      );
    case 'ruler':
      return (
        <svg {...shared}>
          <rect x="3" y="9" width="18" height="6" rx="1.5" />
          <path d="M7 9v3M11 9v3M15 9v3" />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg {...shared}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    default:
      return null;
  }
}

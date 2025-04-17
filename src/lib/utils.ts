import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type DateUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';

const DATE_UNITS: Record<DateUnit, number> = {
    year: 31536000,
    month: 2629800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
}

export function formatDate(
    timestamp: Date | string | number, 
    languageCode: string = 'en-US'
): string {
    try {
        const rtf = new Intl.RelativeTimeFormat(
            languageCode,
            { numeric: 'auto' }
        )

        const from = new Date(timestamp).getTime();
        const now = new Date().getTime();

        const elapsed = (from - now) / 1000;

        for (const unit of Object.keys(DATE_UNITS) as DateUnit[]) {
            const absoluteElapsed = Math.abs(elapsed);

            if (absoluteElapsed > DATE_UNITS[unit] || unit === 'second') {
                return rtf.format(
                    Math.floor(elapsed / DATE_UNITS[unit]),
                    unit
                );
            }
        }

        return rtf.format(0, 'second');
    } catch (e) {
        console.error('Error calculating relative time:', e);
        return '';
    }
}
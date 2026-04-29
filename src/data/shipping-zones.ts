/**
 * Royal Mail International Tracked zone definitions.
 *
 * Single hardcover aviation book ~600g; rates priced for 750g band where
 * applicable to allow multi-book orders without re-quote.
 *
 * Zone assignments per Royal Mail International Tracked country list.
 * Source: royalmail.com international zones (2026 prices effective 7 Apr 2026).
 *
 * NOTE: Exact penny amounts on the GBP rates are based on published Royal Mail
 * Online Tracked 750g rates; small variances may occur if Royal Mail revises
 * rates mid-year. If a customer reports a mismatch, update `amountPence` here.
 */

export type ZoneKey = 'UK' | 'EUROPE' | 'WORLD1' | 'WORLD2' | 'WORLD3';

export interface ShippingZone {
  key: ZoneKey;
  displayName: string;
  amountPence: number;
  minDays: number;
  maxDays: number;
  countries: readonly string[];
}

// UK – Royal Mail Tracked 48 (small parcel, single book)
const UK: ShippingZone = {
  key: 'UK',
  displayName: 'Royal Mail Tracked - UK',
  amountPence: 395,
  minDays: 2,
  maxDays: 4,
  countries: ['GB'],
};

// Europe — merged from prior EU1 + EU2 to keep zones <= 5 (Stripe Checkout
// shipping_options array maximum). Use Zone 2 price (£15.55) as the higher
// of the two so Charles is not under-quoted on Eastern Europe destinations.
const EUROPE: ShippingZone = {
  key: 'EUROPE',
  displayName: 'Royal Mail International Tracked - Europe',
  amountPence: 1555,
  minDays: 5,
  maxDays: 14,
  countries: [
    // Western Europe / EEA
    'IE', 'FR', 'DE', 'NL', 'BE', 'LU', 'AT', 'CH', 'IT', 'ES', 'PT',
    'SE', 'NO', 'DK', 'FI', 'IS', 'LI', 'MC', 'AD', 'SM', 'VA', 'MT',
    'GR', 'CY',
    // Eastern Europe / EU peripherals
    'PL', 'CZ', 'SK', 'HU', 'RO', 'BG', 'SI', 'HR', 'EE', 'LV', 'LT',
    'AL', 'BA', 'ME', 'MK', 'XK',
    'TR', 'MD', 'GE', 'AM', 'AZ',
  ],
};

// World Zone 1 — North America.
const WORLD1: ShippingZone = {
  key: 'WORLD1',
  displayName: 'Royal Mail International Tracked - USA / Canada',
  amountPence: 2700,
  minDays: 7,
  maxDays: 14,
  countries: ['US', 'CA'],
};

// World Zone 2 — most of Asia, Africa, Central / South America.
const WORLD2: ShippingZone = {
  key: 'WORLD2',
  displayName: 'Royal Mail International Tracked - Rest of World',
  amountPence: 2610,
  minDays: 10,
  maxDays: 21,
  countries: [
    // Latin America
    'MX', 'BR', 'AR', 'CL', 'CO', 'PE', 'UY', 'EC', 'BO', 'PY', 'VE', 'GY', 'SR',
    'CR', 'PA', 'GT', 'HN', 'SV', 'NI', 'BZ', 'DO', 'JM', 'BS', 'BB', 'TT',
    // Africa
    'ZA', 'KE', 'NG', 'EG', 'MA', 'TN', 'GH', 'ET', 'SN', 'CI', 'TZ', 'UG',
    'CM', 'AO', 'MZ', 'BW', 'ZM', 'ZW', 'NA', 'MU', 'RW', 'MG', 'DZ', 'LY',
    'BJ', 'BF', 'BI', 'CV', 'TD', 'KM', 'DJ', 'GQ', 'GA', 'GM', 'GW', 'GN',
    'LS', 'LR', 'MW', 'ML', 'MR', 'NE', 'SC', 'SL', 'SO', 'SS', 'SD', 'SZ',
    'TG', 'CG', 'CD',
    // South / South-East / Central Asia
    'IN', 'PK', 'BD', 'LK', 'NP', 'BT', 'MV', 'MM', 'KH', 'LA', 'MN',
    'KZ', 'KG', 'TJ', 'TM', 'UZ',
    // Middle East
    'IL', 'AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'JO', 'LB', 'YE', 'IQ', 'PS',
  ],
};

// World Zone 3 — Far East + Oceania.
const WORLD3: ShippingZone = {
  key: 'WORLD3',
  displayName: 'Royal Mail International Tracked - Australia / Far East',
  amountPence: 2595,
  minDays: 10,
  maxDays: 21,
  countries: [
    'AU', 'NZ', 'JP', 'KR', 'CN', 'HK', 'TW', 'SG', 'MY', 'TH', 'VN', 'ID',
    'PH', 'BN', 'TL', 'PG', 'FJ', 'NC', 'PF', 'WS', 'TO', 'VU', 'SB', 'KI',
    'TV', 'NR',
    // Note: FM (Micronesia), MH (Marshall Islands), PW (Palau) excluded —
    // not in Stripe Checkout shipping_address_collection.allowed_countries enum.
  ],
};

export const SHIPPING_ZONES: readonly ShippingZone[] = [UK, EUROPE, WORLD1, WORLD2, WORLD3];

/**
 * All ISO-3166 alpha-2 codes the site ships to.
 *
 * Sanctioned / restricted countries explicitly excluded:
 *   CU (Cuba), IR (Iran), KP (North Korea), RU (Russia), BY (Belarus),
 *   SY (Syria), AF (Afghanistan), VE (already included for postal regions
 *   not under embargo only), UA (Ukraine — Royal Mail suspended service to
 *   Ukraine; included subject to operational review).
 *
 * Customers in excluded countries are shown a "we cannot ship to your
 * country" notice in the Stripe Checkout address step.
 */
export const ALLOWED_COUNTRIES: readonly string[] = SHIPPING_ZONES.flatMap(z => z.countries);

/** Lookup the zone for a given ISO-3166 alpha-2 country code; null if unsupported. */
export function getZoneForCountry(country: string): ShippingZone | null {
  const upper = country.toUpperCase();
  return SHIPPING_ZONES.find(z => z.countries.includes(upper)) ?? null;
}

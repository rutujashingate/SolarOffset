export const APP_DASHBOARD_PAGE = '/';

export const COUNTRIES_LISTING_PAGE = '/countries';
export const USER_FUNDING_LISTING = '/funding/listing';
export const FUNDING_PAGE = (zoneKey) => `/funding/${zoneKey || ':zoneKey'}`;

// ------- PAYMENT ROUTES -------
export const PAYMENT_CHECKOUT_PAGE = '/payment/checkout';
export const PAYMENT_SUCCESS_PAGE = '/payment/success';

// ------- ADMIN ROUTES -------
export const ADMIN_DASHBOARD_PAGE = '/admin';
export const ADMIN_DETAIL_PAGE = '/admin/detail';

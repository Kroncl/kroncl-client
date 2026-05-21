export const ENV = process.env.NEXT_PUBLIC_ENV || process.env.ENV || 'development';
export const IS_PRODUCTION = ENV === 'production';
export const IS_DEVELOPMENT = ENV === 'development';
export const IS_TEST = ENV === 'test';
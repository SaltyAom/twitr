export const isProduction = process.env.NODE_ENV === 'production'
export const isServer = typeof window === 'undefined'
export const isSafari =
    !isServer && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

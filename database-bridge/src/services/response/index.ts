export const invalidForm = () => ({
    success: false,
    info: 'Invalid form',
    data: null
})

export const error = (info: string) => ({
    success: false,
    info,
    data: null
})

export const success = <T extends Object>(data: T) => ({
    success: true,
    info: null,
    data
})
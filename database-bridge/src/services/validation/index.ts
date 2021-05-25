type ValidationParams<T extends string | number | symbol> = Record<
    T,
    'string' | 'number' | 'array'
>

export const validate = <T extends Record<string | number | symbol, any>>(
    requested: T | null = null,
    model: ValidationParams<keyof T>
) => {
    if (!requested) return false

    let requestedKey = Object.keys(requested)
    let modelKeys = Object.keys(model)

    return (
        requestedKey.length === modelKeys.length &&
        requestedKey.every((requestedKey) => {
            let requestedField = requested[requestedKey]
            let modelType = model[requestedKey]

            if (!modelKeys.includes(requestedKey)) return false

            if (modelType === 'array') return Array.isArray(requestedField)

            return typeof requestedField === modelType
        })
    )
}

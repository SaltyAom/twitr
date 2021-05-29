import moduleAlias from 'module-alias'

const composePath = (path: string) => `${__dirname}/${path}`
const composeObjectPath = (object: Record<string, string>) => {
    const paths: Record<string, string> = {}

    Object.getOwnPropertyNames(object).forEach((key) => {
        paths[key] = composePath(object[key])
    })

    return paths
}

moduleAlias.addAliases(
    composeObjectPath({
        '@modules': 'modules',
        '@services': 'services',
        '@database': 'services/database'
    })
)

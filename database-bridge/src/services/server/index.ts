import { isMaster, fork } from 'cluster'
import { cpus } from 'os'

const run = (start: Function) => {
    if (process.env.NODE_ENV !== 'production') return start()

    if (isMaster) for (let i = 0; i < cpus().length; i++) fork()
    else start()
}

export default run

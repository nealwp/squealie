const quoted = (str: string) => `'${str}'`

export const bindObjectToSql = (obj: Object, sql: string) => {
    const entries = Object.entries(obj)

    let output = sql;

    for (const e of entries) {
        const key = e[0]
        const value = e[1]
        
        if (typeof value === "string") {
            output = output.replaceAll(`:${key}`, quoted(value))
        }

        if(typeof value === "number") {
            output = output.replaceAll(`:${key}`, value.toString())
        }
    }


    const re = /:\w+/g
    const errors = output.match(re)

    if(errors) {
        throw new Error(`missing object binding! ${errors.join(", ")}`)
    }

    return output
}

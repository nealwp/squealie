import { bindObjectToSql, bindArrayToSql } from './squealie'

describe('squealie', () => {

    describe('bindObjectToSql',  () => {

        it('should bind values in INSERT string', () => {
            const rawInsertSql = "INSERT INTO users (name) VALUES (:name)"
            const inputObject = {name: "Tommy Shaw"}
            const expectedOutput = `INSERT INTO users (name) VALUES ('Tommy Shaw')`

            const result = bindObjectToSql(inputObject, rawInsertSql)

            expect(result).toEqual(expectedOutput)
        })

        it('should handle strings and numbers', () => {
            const rawInsertSql = "INSERT INTO users (name, follower_count) VALUES (:name, :followerCount)"
            const inputObject = {followerCount: 27, name: "Tommy Shaw"}
            const expectedOutput = `INSERT INTO users (name, follower_count) VALUES ('Tommy Shaw', 27)`

            const result = bindObjectToSql(inputObject, rawInsertSql)

            expect(result).toEqual(expectedOutput)
        })

        it('should throw error if not all bindings are provided', () => {
            const rawInsertSql = "INSERT INTO users (name, follower_count) VALUES (:name, :followerCount)"
            const inputObject = {name: "Tommy Shaw"}
            const expectedError = `missing object binding! :followerCount`

            expect(() => {
                bindObjectToSql(inputObject, rawInsertSql)
            }).toThrow(expectedError)
        })

        it('should handle multiple missing bindings', () => {
            const rawInsertSql = "INSERT INTO users (name, follower_count) VALUES (:name, :followerCount)"
            const inputObject = {}
            const expectedError = `missing object binding! :name, :followerCount`

            expect(() => {
                bindObjectToSql(inputObject, rawInsertSql)
            }).toThrow(expectedError)

        })
    })
    describe('bindArrayToSql', () => {
        it('should bind each array element to INSERT statement', () => {
            const rawInsertSql = "INSERT INTO users (name) VALUES (:name)"
            const inputObject = [{name: "Tommy Shaw"}, {name: "Bob Seger"}]
            const expectedOutput = `INSERT INTO users (name) VALUES ('Tommy Shaw'), ('Bob Seger')`

            const result = bindArrayToSql(inputObject, rawInsertSql)

            expect(result).toEqual(expectedOutput)

        })
    })
})

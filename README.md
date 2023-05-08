# squealie

bind a JS object to a SQL string

```typescript
const user = {name: "nealwp", followerCount: 4}
const sql = "INSERT INTO users (name, follower_count) VALUES (:name, :followerCount)"

const boundSql = bindObjectToSql(user, sql)

console.log(boundSql)
// result: "INSERT INTO users (name, follower_count) VALUES ('nealwp', 4)"
```

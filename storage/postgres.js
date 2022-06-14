const {v4} = require('uuid')

storage = { 
    pgstorage: (psql) => {
        return todoStorage = {
            // Insert Data To DB
            insert: async (newTodo) => {
                let query = `
                    INSERT INTO 
                        todos 
                            (
                                todo_id,
                                title,
                                note,
                                priority
                            ) 
                    VALUES
                        ($1, $2, $3, $4)
                    RETURNING
                        todo_id`
                
                try {
                    const id = await psql.query(
                        query,
                        [
                            v4(), 
                            newTodo.title,
                            newTodo.note,
                            newTodo.priority
                        ]
                    )

                    return await storage.pgstorage(psql).select(id.rows[0].todo_id)
                } catch (error) {
                    console.log('error while insert data from db', error)  
                    return error
                }
            },
            
            // Select All Data From Db
            selectAll: async () => {
                let query = `
                    SELECT
                        todo_id,
                        title,
                        note,
                        priority,
                        created_at,
                        updated_at,
                        deleted_at
                    FROM
                        todos
                    WHERE 
                        deleted_at IS NULL
                    ORDER BY
                        priority`
                try {
                    
                    return  (await psql.query(query)).rows
                } catch (error) {
                    console.log('error while select all data from db')  
                    return
                }
            },
            
            // Select Data By Id From Db By Id
            select: async (id) => {
                let query = `
                    SELECT
                        todo_id,
                        title,
                        note,
                        priority,
                        created_at,
                        updated_at
                    FROM
                        todos
                    WHERE 
                        todo_id=$1 AND 
                        deleted_at IS NULL`
                try {
                    return (await psql.query(query, [id])).rows[0]
                } catch (error) {
                    console.log('error while select data from db', error)  
                    return error
                }
            },
            
            // Update Data 
            update: async (data) => {
                let query = `
                UPDATE 
                    todos
                SET
                    title=CASE
                            WHEN $2=''
                            THEN title
                            ELSE COALESCE($2, title)
                            END,
                    note=CASE
                            WHEN $3=''
                            THEN note
                            ELSE COALESCE($3, note)
                            END,
                    priority=CASE
                            WHEN $4=''
                            THEN priority
                            ELSE COALESCE($4, priority)
                            END,
                    updated_at=NOW()
                WHERE
                    todo_id=$1
                RETURNING
                    todo_id`
                
                try {
                    const id = await psql.query(
                        query,
                        [
                            data.id,
                            data.newData.title,
                            data.newData.note,
                            data.newData.priority
                        
                        ]
                    )
                    return await storage.pgstorage(psql).select(id.rows[0].todo_id)
                } catch (error) {
                    console.log('error while update data from db', error)  
                    return error
                }
            },

            // Delete Data
            delete: (id) => {
                let query = `
                UPDATE 
                    todos
                SET
                    deleted_at=NOW()
                WHERE
                    todo_id=$1`
                try {
                    psql.query(query, [id])
                    return {'msg': 'deleted'}
                } catch (error) {
                    console.log('error while deleting data from db', error)  
                    return error
                }
            }
        }
    }
}

module.exports = storage

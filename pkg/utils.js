function getBodyData(req){
    return new Promise((reslove, reject) => {
        try {
            let body = ''
            
            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                reslove(body)
            })
        }catch (err){
            reject(err)
        }
    })
}

module.exports = getBodyData
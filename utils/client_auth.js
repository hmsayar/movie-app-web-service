const authed_header = (token) => ({
    headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + token
    }
})

module.exports = {authed_header}
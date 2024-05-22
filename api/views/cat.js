'use strict'
module.exports = [
    {
        method: 'GET',
        url: '/cat',
        handler: (req, res) => {
            res.send('Meow World! 😼')
        }
    }
]
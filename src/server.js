const express = require('express')
const hbs = require('hbs')
const path = require('path')

const app = express()

// Setup Handlebars
app.set('view engine', 'hbs')
hbs.registerPartials(path.resolve(__dirname, '..', 'views', 'partials'))

// Setup static directory
app.use(express.static(path.resolve(__dirname, '..', 'public')))

app.use(require('./routes/routes'))



const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`))

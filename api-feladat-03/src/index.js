const express = require('express')
const app = express()

const port = 3000

// swagger docs
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./docs/swagger.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// normal routes
app.use(express.json())
app.use('/person', require('./routes'))

// hibakezelő middleware, kell mind a négy paraméter, első az err!!!
app.use((err, req, res, next) => {
  if (typeof (err) === 'string') {
    err = { status: 500, message: err }
  }
  console.error(`ERR ${err.status}: ${err.message}`)
  // res.status(err.status)
  res.json({
    hasError: true,
    message: 'Valami hiba történt!'
  })
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))

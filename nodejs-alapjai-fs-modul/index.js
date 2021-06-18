const { access, mkdir, open } = require('fs').promises

access('controllers')
  .catch(() => mkdir('controllers'))
  .then(() => open('./controllers/site.controller.js', 'a'))
  .then((fd) => fd.close())

access('routers')
  .catch(() => mkdir('routers'))
  .then(() => open('./routers/site.router.js', 'a'))
  .then((fd) => fd.close())

access('views')
  .catch(() => mkdir('views'))
  .then(() => open('./views/index.html', 'a'))
  .then((fd) => fd.close())

open('./app.js', 'a')
  .then((fd) => fd.close())

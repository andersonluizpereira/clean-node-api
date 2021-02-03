const { adapt } = require('../adapters/express-router-adapter')
const AddUserRouterComposer = require('../composers/add-user-router-composer')

module.exports = router => {
  router.post('/adduser', adapt(AddUserRouterComposer.compose()))
}

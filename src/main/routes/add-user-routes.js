const { adapt } = require('../adapters/express-router-adapter')
const AddUserRouterComposer = require('../composers/add-user-router-composer')

module.exports = router => {
  router.post('/signup', adapt(AddUserRouterComposer.compose()))
}

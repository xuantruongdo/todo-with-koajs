const Router = require('koa-router');
const todoHandlers = require('../handlers/todos/todoHandlers');
const todoInputMiddleware = require('../middleware/todoMiddleware');

const router = new Router({
  prefix: '/api'
});

// Routes will go here
router.get('/todos', todoHandlers.getTodos);
router.post('/todos', todoInputMiddleware, todoHandlers.save);
router.get('/todo/:id', todoHandlers.getTodo);
router.put('/todo/:id', todoHandlers.updateTodo);
router.delete('/todo/:id', todoHandlers.removeTodo);
router.put('/todos/update-multiple', todoHandlers.updateMultipleTodo);
router.delete('/todos/delete-multiple', todoHandlers.removeMultipleTodo);
module.exports = router;

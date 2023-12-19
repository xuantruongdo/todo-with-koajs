const {
  getAll: getAllTodos,
  getOne: getOneTodo,
  add: addTodo,
  update,
  remove,
} = require("../../database/todoRepository");
const { v4: uuidv4 } = require("uuid");

async function getTodos(ctx) {
  try {
    const todos = getAllTodos(ctx.query);

    ctx.body = {
      data: todos,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}

async function getTodo(ctx) {
  try {
    const { id } = ctx.params;
    const fields = ctx.query.fields;
    const currentTodo = getOneTodo(id, fields);
    if (currentTodo) {
      return (ctx.body = {
        data: currentTodo,
      });
    }
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function save(ctx) {
  try {
    let postData = ctx.request.body;
    postData.id = uuidv4();
    postData.isCompleted = false;
    addTodo(postData);

    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function updateTodo(ctx) {
  try {
    const { id } = ctx.params;
    const updateData = ctx.request.body;
    const currentTodo = getOneTodo(id);
    if (currentTodo) {
      update(id, updateData.isCompleted);

      ctx.status = 200;
      return (ctx.body = {
        success: true,
      });
    } else {
      throw new Error("Todo Not Found with that id!");
    }
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function removeTodo(ctx) {
  try {
    const { id } = ctx.params;
    const currentTodo = getOneTodo(id);
    if (currentTodo) {
      remove(id);
    } else {
      throw new Error("Todo Not Found with that id!");
    }
    
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function removeMultipleTodo(ctx) {
  try {
    let { ids } = ctx.request.body;
    remove(ids);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function updateMultipleTodo(ctx) {
  try {
    let { ids } = ctx.request.body;
    update(ids);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

module.exports = {
  getTodos,
  getTodo,
  save,
  updateTodo,
  removeTodo,
  removeMultipleTodo,
  updateMultipleTodo,
};

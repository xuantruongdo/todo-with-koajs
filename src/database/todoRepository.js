const fs = require("fs");
const { data: todos } = require("./todos.json");
const { dataFilePath } = require("../constants/constants");
const { sortByProperty } = require("../helpers/sort");

function getAll({ limit = 10, sort = "asc" } = {}) {
  let sortedTodos = sortByProperty(todos, "createdAt", sort);
  const paginatedTodos = sortedTodos.slice(0, limit);
  return paginatedTodos;
}

/**
 *
 * @param {*} id
 * @param {*} fields
 * @returns
 */
function getOne(id) {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    return todo;
  } else {
    throw new Error("Product Not Found with that id!");
  }
}

/**
 *
 * @param {*} data
 * @returns
 */
function add(data) {
  const updatedTodos = [data, ...todos];
  fs.writeFileSync(
    dataFilePath,
    JSON.stringify({
      data: updatedTodos,
    })
  );
}

/**
 *
 * @param {*} id
 */
function update(ids, isCompleted) {
  if (Array.isArray(ids)) {
    ids.forEach((singleId) => {
      const index = todos.findIndex((todo) => todo.id === singleId);
      if (index !== -1) {
        todos[index].isCompleted = true;
      }
    });
  } else {
    const index = todos.findIndex((todo) => todo.id === ids);
    if (index !== -1) {
      todos[index].isCompleted = isCompleted;
    }
  }

  fs.writeFileSync(dataFilePath, JSON.stringify({ data: todos }));
}

/**
 *
 * @param {*} id
 */
function remove(ids) {
  if (Array.isArray(ids)) {
    let newTodos = todos.filter((todo) => !ids.includes(todo.id));
    fs.writeFileSync(dataFilePath, JSON.stringify({ data: newTodos }));
  } else {
    let newTodos = todos.filter((todo) => todo.id !== ids);
    fs.writeFileSync(dataFilePath, JSON.stringify({ data: newTodos }));
  }
}

module.exports = {
  getOne,
  getAll,
  add,
  update,
  remove,
};

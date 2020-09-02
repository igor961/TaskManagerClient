const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

export default class Projects {
  constructor (arr, notify) {
    this._projects = convertArrayToObject(arr, 'id')
    this._notifyCb = notify
  }

  getAll () {
    return Object.values(this._projects)
  }

  get (id) {
    return this._projects[id]
  }

  create (project) {
    if (!this._projects[project.id]) 
      this._projects[project.id] = project
    this._notifyCb()
  }

  createTask (id, task) {
    return this.updateTask(id, task)
  }

  update (project) {
    if (this._projects[project.id]) 
      this._projects[project.id] = project
    this._notifyCb()
  }

  updateTask (id, task) {
    if (!this._projects[id].tasks) this._projects[id].tasks = {}
    this._projects[id].tasks[String(task.id)] = task
    this._notifyCb()
  }

  delete (id) {
    delete this._projects[id]
    this._notifyCb()
  }

  deleteTask (pId, tId) {
    delete this._projects[pId].tasks[String(tId)]
    this._notifyCb()
  }
}

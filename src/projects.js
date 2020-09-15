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
    const tId = task.auxId
    if (!this._projects[id].tasks) this._projects[id].tasks = {}
    this._projects[id].tasks[tId] = task
    this._notifyCb()
  }

  delete (id) {
    delete this._projects[id]
    this._notifyCb()
  }

  deleteTask (pId, task) {
    const tId = task.auxId
    delete this._projects[pId].tasks[tId]
    this._notifyCb()
  }

  _replaceAuxIds(task1, task2) {
    const idLength = task1.auxId.length
    task1.auxId = task1.auxId.replace(task1.priority, task2.priority)
    task2.auxId = task2.auxId.replace(task2.priority, task1.priority)

    for (const t of [task1, task2]) {
      const diff = t.auxId.length - idLength
      if (diff > 0) 
        t.auxId = t.auxId.substring(0, idLength)
      else if (diff < 0)
        t.auxId += Math.random() * Math.pow(10, Math.abs(diff))
    } 
  }

  _swapPriorities (task1, task2) {
    task1.priority += task2.priority
    task2.priority = task1.priority - task2.priority
    task1.priority -= task2.priority
  }
  
  _updatePrevNextId (tasks, oldId1, newId) {
    // Slow search
    //const res = Object.values(tasks).find(t => t.nextId === oldId1)
    //if (res) res.nextId = newId

    //Binary search
    console.log("Binary search, searching id=" + oldId1 + " and replacing it with " + newId)
    for (let arr = Object.values(tasks), r = arr.length, l = 0, m = parseInt(r / 2); r >= l; m = parseInt((r - l) / 2)) {
      if (arr[m].nextId > oldId1)
        r -= m + 1;
      else if (arr[m].nextId < oldId1)
        l += m + 1;
      else if (arr[m].nextId === oldId1) {
        arr[m].nextId = newId
        return;
      }
    }
  }

  changePriority (task) {
    const [pId, tId, nextId] = [task.projectId, task.auxId, task.nextId]
    console.log(task, nextId)
    if (!nextId) return;
    const tasks = this._projects[pId].tasks
    const task1 = tasks[tId]
    const task2 = tasks[nextId]

    // Save old task1 id to change it in previous task
    const oldId1 = task1.auxId

    // renew auxIds
    this._replaceAuxIds(task1, task2)

    // swap priorities
    this._swapPriorities(task1, task2)

    // delete old tasks
    delete tasks[tId]
    delete tasks[nextId]

    //create new tasks
    tasks[task1.auxId] = task1
    tasks[task2.auxId] = task2

    // swap nextIds
    task1.nextId = task2.nextId
    task2.nextId = task1.auxId //!!!

    // Update previous task's nextId
    this._updatePrevNextId(tasks, oldId1, task2.auxId) 

    this._notifyCb()
  }
}

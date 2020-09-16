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
    const project = this._projects[id]

    if (!project.tasks) 
      project.tasks = {}  
    else if (project.tasks.length)
      task.auxId = this._generateNewAuxId(task, project.tasks[0].auxId)
    project.tasks[task.auxId] = task

    let tasks = Object.values(project.tasks)

    if (tasks.length > 0) {
      const res = this._binarySearch(tasks, 'auxId', task.auxId) 
      if (!res) return;
      const nextTask = tasks[res[1]+1]
      const prevTask = tasks[res[1]-1]
      task.nextId = (nextTask) ? nextTask.auxId : null
      if (prevTask) prevTask.nextId = task.auxId
    }
    this._notifyCb()
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

  _replaceAuxIds (task1, task2) {
    task1.auxId = task1.auxId.replace(task1.priority, task2.priority)
    task2.auxId = task2.auxId.replace(task2.priority, task1.priority)

    for (const t of [task1, task2]) {
      t.auxId = this._generateNewAuxId(t)
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
    const key = 'nextId'
    const res = this._binarySearch(Object.values(tasks), key, oldId1)
    if (res) res[0][key] = newId
  }

  _binarySearch (arr, key, val) {
    for (let r = arr.length, l = 0, m = parseInt(r / 2); r >= l; m = l + parseInt((r - l) / 2)) {
      if (arr[m][key] > val)
        r -= m + 1;
      else if (arr[m][key] < val)
        l += m + 1;
      else if (arr[m][key] === val) {
        return [arr[m], m]
      }
    }
  }

  changePriority (task) {
    let [pId, tId, nextId] = [task.projectId, task.auxId, task.nextId]
    console.log(task, nextId)
    if (!nextId) return;
    const tasks = this._projects[pId].tasks
    let task1 = tasks[tId]
    let task2 = tasks[nextId]

    if (!task1 || !task2) return;

    // Save old task1 id to change it in previous task
    const oldId1 = task1.auxId

    const spRes = this._fixSamePriorities(tasks)
    if (spRes) {
      tId = this._renewAuxIds(tasks, task)
      task1 = tasks[tId]
      nextId = task1.nextId
      task2 = tasks[nextId]
    }
    
    if (!task1 || !task2) return;
    
    // swap priorities
    this._swapPriorities(task1, task2)
    
    // renew auxIds
    this._replaceAuxIds(task1, task2)


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

  _fixSamePriorities (tasks) {
    const tasksArr = Object.values(tasks)
    let mut = false
    for (let i = 1; i < tasksArr.length; ++i) {
      if (tasksArr[i].priority != tasksArr[i-1].priority + 1) 
        mut = true
      tasksArr[i].priority = tasksArr[i-1].priority + 1
    }
    return mut
  }

  _renewAuxIds (tasks, task) {
    const tasksArr = Object.values(tasks)
    let returnId = task.auxId
    for (let k = 1; k < tasksArr.length; ++k) {
      const nextTask = tasksArr[k]
      const oldId = nextTask.auxId
      let newId = this._generateNewAuxId(nextTask)
      if (oldId == newId) continue
      nextTask.auxId = newId
      nextTask.nextId = null
      tasksArr[k-1].nextId = newId
      delete tasks[oldId]
      tasks[newId] = nextTask
      if (oldId == returnId) returnId = newId
    }
    return returnId
  }

  _generateNewAuxId (task, originId) {
    let newId = String(task.priority)
    const len = String(originId || task.auxId).length - newId.length - String(task.id).length
    for (let i = 0; i < (len ? len : 1); ++i) newId += '0'
    newId += task.id
    return newId
  }
}

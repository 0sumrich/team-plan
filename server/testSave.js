const saveData = require('./saveData')
const input = {
  "updatedTasks": [
    {
      "id": 21,
      "task": "Stock knowledge shizzzz",
      "team": "Pillar 4",
      "objective": "Staff skills are enhanced",
      "complete": "FALSE"
    }
  ],
  "newTasks": [],
  "deletedTasks": [],
  "updatedObjectives": [],
  "newObjectives": [],
  "deletedObjectives": []
}
saveData(input)
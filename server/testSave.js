const saveData = require('./saveData')
const input = {
  "updatedTasks": [],
  "newTasks": [ {
      "id": 76,
      "task": "edit me",
      "team": "Pillar 4",
      "objective": "Staff skills are enhanced",
      "complete": "FALSE"
    }],
  "deletedTasks": [],
  "updatedObjectives": [],
  "newObjectives": [],
  "deletedObjectives": []
}
saveData(input)
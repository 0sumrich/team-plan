export default function backupCsv(body, model, res) {
  for (let i = 0; i < body.length; i++) {
    const obj = body[i];
    model.deleteMany({});
    let newBackup = new model();
    newBackup.text = obj.text;
    newBackup.team = obj.team;
    newBackup.objective = obj.objective;
    newBackup.complete = obj.complete;
    newBackup.save();
  };
  res.sendStatus(200);
}

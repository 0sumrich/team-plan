module.exports = function postCsv(body, model, res){
  for (let i = 0; i < body.length; i++) {
    const obj = body[i];
    model.findById(obj._id, (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        doc.text = obj.text;
        doc.team = obj.team;
        doc.objective = obj.objective;
        doc.complete = obj.complete;
        doc.save();
      }
    });
  }
  res.sendStatus(200);
}
module.exports= function deleteCsv(body, model, res) {
  for (let i = 0; i < body.length; i++) {
    const id = body[i]._id;
    model.findByIdAndDelete(id, (err, doc) => {
        if(err) throw err;
    });
  }
  res.sendStatus(200);
}
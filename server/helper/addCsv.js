module.exports = function addCsv(body, model, res) {
    let newCsv = new model();
    newCsv.text = body.text;
    newCsv.team = body.team;
    newCsv.objective = body.objective;
    newCsv.complete = body.complete;
    newCsv.save((err, csv) => {
        err ? res.send({ error: true }) : res.send(csv);
    });
}

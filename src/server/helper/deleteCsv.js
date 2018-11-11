export default function deleteCsv(body, model) {
  for (let i = 0; i < body.length; i++) {
    const id = body[i]._id;
    model.findByIdAndDelete(id);
  }
}
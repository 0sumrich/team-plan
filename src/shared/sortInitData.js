export default function sortFunction(arr) {
  const correctOrder = [
    "",
    "Pillar 0",
    "Pillar 1",
    "Pillar 2",
    "Pillar 3",
    "Pillar 4",
    "Pillar 5",
    "Pillar 6",
    "Operations",
    "Service Development Team",
    "Management Team"
  ];
  const res = correctOrder.map(x => []);
  for (let i = 0; i < arr.length; i++) {
    const o = arr[i];
    //const index =
    const index = correctOrder.indexOf(o.team);
    const test = res[index];
    res[index].push(o);
  }
  return res.reduce((a, b) => a.concat(b));
}

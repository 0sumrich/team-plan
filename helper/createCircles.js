export default function createCircles(valuesArray, r) {
  const values = valuesArray.map(v => v.value);
  const ids = valuesArray.map(v => v.id);
  let nodes = [{ id: ids.shift(), x: r, y: r, value: values.shift() }],
    width = r * 2,
    height = r * 2,
    angle,
    x,
    y,
    i;
  for (i = 0; i < values.length; i++) {
    angle = (i / (values.length / 2)) * Math.PI; // Calculate the angle at which the element will be placed.
    // For a semicircle, we would use (i / numNodes) * Math.PI.
    x = r * Math.cos(angle) + width / 2; // Calculate the x position of the element.
    y = r * Math.sin(angle) + width / 2; // Calculate the y position of the element.
    nodes.push({ id: ids[i], x: x, y: y, value: values[i] });
  }
  return nodes;
}

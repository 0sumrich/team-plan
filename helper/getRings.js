export default function getRings(data){
  return data.map(o => o.team).filter((v, i, a) => a.indexOf(v) === i);
}
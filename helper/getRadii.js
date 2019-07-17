export default function getRadii(rings, radius, innerMost) {
  //typeof rings == number  
  const width = (radius-innerMost)/(rings+1);
  let res = [{inner: innerMost, outer: innerMost+width}];
  for (let i=1; i<rings; i++){
    let inner=res[i-1].outer+1;
    res.push({inner: inner, outer: inner+width});
  }
  return res;
}
export default function getTeams(d) {
  return d.map(ring => {
    const team = ring[0].data.team;
    return team.length == 0 ? 'Strategic Objectives' : team;
  })
}
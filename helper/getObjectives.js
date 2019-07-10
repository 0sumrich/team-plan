export default function getObjectives(data) {
	return data.filter(o => o.team.length<1)
}
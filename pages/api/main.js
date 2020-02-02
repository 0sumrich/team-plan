import getInitData from '../../server/getInitData'

export default async (req, res) => {
	const data = await getInitData()
	res.status(200).json({data: data })
}
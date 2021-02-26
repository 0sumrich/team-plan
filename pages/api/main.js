import getInitData from "../../server/getInitData";
import Cors from 'cors'

function initMiddleware(middleware) {
	return (req, res) =>
		new Promise((resolve, reject) => {
			middleware(req, res, (result) => {
				if (result instanceof Error) {
					return reject(result)
				}
				return resolve(result)
			})
		})
}

// Initialize the cors middleware
const cors = initMiddleware(
	// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
	Cors({
		// Only allow requests with GET, POST and OPTIONS
		methods: ['GET', 'POST', 'OPTIONS'],
	})
)

export default async (req, res) => {
	await cors(req, res)
	const data = await getInitData();
	res.status(200).json(data);
};

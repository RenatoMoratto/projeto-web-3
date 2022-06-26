import { isEmpty } from "../utils/documentoUtils.js";
import Quote from "../models/Quote.js";

export const postQuote = async (req, res) => {
	const { author, en } = req.body;

	if (isEmpty(author)) {
		return res.status(422).send({ message: "Author is required!" });
	}
	if (isEmpty(en)) {
		return res.status(422).send({ message: "Quote is required!" });
	}

	try {
		await Quote.create({ author, en });
		res.status(201).json({ message: "Quote register with success!" });
	} catch (error) {
		const errorMessage = isEmpty(error) ? "Internal server error." : error;
		res.status(500).json({ message: errorMessage });
	}
};

export const findAllQuotes = async (req, res) => {
	const { count } = req.query;

	try {
		const quotes = await Quote.find();

		if (!quotes) {
			res.state(422).json({ message: "Quotes not found!" });
			return;
		}

		if (count) {
			const countQuotes = [];
			for (let i = 0; i < count; i++) {
				countQuotes.push(quotes[i]);
			}
			return res.status(200).json(countQuotes);
		}

		res.status(200).json(quotes);
	} catch (error) {
		const errorMessage = isEmpty(error) ? "Internal server error." : error;
		res.status(500).json({ message: errorMessage });
	}
};

export const findRandomQuote = async (req, res) => {
	try {
		const quotes = await Quote.find();

		const randomIndex = Math.floor(Math.random() * quotes.length);
		const randomQuote = quotes[randomIndex];

		if (!quotes) {
			res.state(422).json({ message: "Quotes not found!" });
			return;
		}

		res.status(200).json([randomQuote]);
	} catch (error) {
		const errorMessage = isEmpty(error) ? "Internal server error." : error;
		res.status(500).json({ message: errorMessage });
	}
};

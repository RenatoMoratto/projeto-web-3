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
	try {
		const quotes = await Quote.find();
		res.status(201).json(quotes);
	} catch (error) {
		const errorMessage = isEmpty(error) ? "Internal server error." : error;
		res.status(500).json({ message: errorMessage });
	}
};

export const findQuoteById = async (req, res) => {
	const id = req.params.id;

	try {
		const quote = await Quote.findOne({ _id: id });

		if (!quote) {
			res.state(422).json({ message: "Quote not found!" });
			return;
		}

		res.status(200).json(quote);
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

		res.status(200).json(randomQuote);
	} catch (error) {
		const errorMessage = isEmpty(error) ? "Internal server error." : error;
		res.status(500).json({ message: errorMessage });
	}
};

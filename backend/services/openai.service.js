const {OpenAI} = require('openai')
require('dotenv').config()

const openai = new OpenAI({apiKey:process.env.OPEN_AI_API});

exports.generateVectorEmbeddings = async(text) => {
	try {
		const embedding = await openai.embeddings.create({
			model: "text-embedding-ada-002",
			input: text,
			encoding_format: "float",
		});
		return embedding;
	} catch (error) {
		return error;
	}
}

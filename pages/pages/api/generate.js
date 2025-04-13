import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { prompt } = req.body;

  const completion = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a professional product listing expert. You generate SEO-optimized listings for Depop and eBay using Gen Z language and formatting.' },
      { role: 'user', content: `Create a title, description, tags, and bundle message for the following product:\n\n${prompt}` },
    ],
    temperature: 0.7,
  });

  const listing = completion.data.choices[0].message.content;
  res.status(200).json({ listing });
}

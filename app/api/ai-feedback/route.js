import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL,
    "X-Title": "Interview Questions Generator",
  },
});

const FEEDBACK_PROMPT = `{{conversation}}

Depends on this Interview Conversation between assistant and user, 

Give me feedback for user interview. Give me rating out of 10 for technical Skills, 

Communication, Problem Solving, Experience. Also give me a summary in 3 lines 

about the interview and one line to let me know whether the candidate is recommended 

for hire or not with a message. Ensure that the recommendation is either "Yes" or "No". 

Give me the response in JSON format:

{
    feedback: {
        rating: {
            technicalSkills: 5,
            communication: 6,
            problemSolving: 4,
            experience: 7
        },
        summary: "<in 3 lines>",
        recommendation: "Yes",
        recommendationMsg: "The candidate is highly recommended for the role."
    }
}`;

export async function POST(req) {
  try {
    const { conversation } = await req.json();
    if (!conversation) {
      throw new Error("Conversation data is missing");
    }

    const prompt = FEEDBACK_PROMPT.replace("{{conversation}}", JSON.stringify(conversation));

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-4-scout:free",
      messages: [{ role: "user", content: prompt }],
    });

    let feedback = completion.choices?.[0]?.message?.content?.trim();
    if (!feedback) throw new Error("No feedback received");

    // ✅ Extract valid JSON from Markdown or extra formatting
    const jsonMatch = feedback.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (jsonMatch) {
      feedback = jsonMatch[1]; // Only keep JSON inside the code block
    }

    let parsedFeedback;
    try {
      parsedFeedback = JSON.parse(feedback);
    } catch (err) {
      parsedFeedback = { rawFeedback: feedback };
    }

    return new Response(JSON.stringify({ feedback: parsedFeedback }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to process the request", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

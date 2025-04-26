const PROMPT = `You are an expert technical interviewer. Your task is to generate interview questions based on the following inputs:

Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

IMPORTANT: Return ONLY a JSON object in the following format, with no additional text or explanations:

{
  "interviewQuestions": [
    {
      "question": "Your question here",
      "type": "Technical/Behavioral/Experience/Problem Solving/Leadership"
    }
  ]
}

Guidelines for generating questions:
1. Analyze the job description to identify key responsibilities, required skills, and expected experience
2. Generate questions based on the interview duration (shorter duration = fewer questions)
3. Ensure questions match the tone and structure of a {{type}} interview
4. Include a mix of question types based on the interview type
5. Focus on the most important aspects of the role

Remember: Return ONLY the JSON object, no other text or explanations. Also, remember to not add "json" as prefix`

import OpenAI from "openai"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL,
    "X-Title": "Interview Questions Generator"
  },
})

export async function POST(request) {
  try {
    const { job_position, job_description, interview_duration, interview_types } = await request.json()

    if (!job_position || !job_description || !interview_duration || !interview_types?.length) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields",
          received: { job_position, job_description, interview_duration, interview_types }
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }

    if (!process.env.OPENROUTER_API_KEY) {
      console.error("OPENROUTER_API_KEY is not set");
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }

    const prompt = PROMPT
      .replace("{{jobTitle}}", job_position)
      .replace("{{jobDescription}}", job_description)
      .replace("{{duration}}", interview_duration)
      .replace("{{type}}", interview_types[0]) // Using the first interview type

    console.log("Sending prompt to OpenAI:", prompt);

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-4-scout:free",
      messages: [
        { role: "user", content: prompt }
      ],
    })

    console.log("OpenAI Response:", completion);

    const response = completion.choices[0].message.content

    // Try to find the first complete JSON object in the response
    const jsonMatch = response.match(/\{[\s\S]*?"interviewQuestions"[\s\S]*?\}/);
    if (!jsonMatch) {
      console.error("Failed to parse response:", response);
      return new Response(
        JSON.stringify({ 
          error: "Failed to parse response",
          rawResponse: response
        }),
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }

    try {
      // Clean up the JSON string before parsing
      const jsonStr = response.replace('```', '').replace('```','');

      console.log("Cleaned JSON string:", jsonStr);

      const parsedResponse = JSON.parse(jsonStr);
      const questionsList = parsedResponse.interviewQuestions;

      if (!Array.isArray(questionsList)) {
        throw new Error("Questions list is not an array");
      }

      return new Response(
        JSON.stringify({ questions: questionsList }),
        { 
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return new Response(
        JSON.stringify({ 
          error: "Failed to parse JSON response",
          rawResponse: response,
          parseError: parseError.message
        }),
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }

  } catch (error) {
    console.error("Error in API route:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to generate questions",
        details: error.message
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}

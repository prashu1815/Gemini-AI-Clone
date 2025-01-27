


import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Ensure you have your API key correctly set in your .env file
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize GoogleGenerativeAI with the API key
const genAI = new GoogleGenerativeAI(apiKey);

// Get the generative model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp", // Ensure this model name is correct
});

// Generation configuration (adjust as needed)
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain", // Adjust if you want different mime type
};

// Function to send prompt and get a response
async function run(prompt) {
  try {
    // Start a chat session
    const chatSession = model.startChat({
      generationConfig,
      history: [], // Can store previous messages here if needed
    });

    // Send the prompt message and get the response
    const result = await chatSession.sendMessage(prompt);

    // The response is a Promise, so we need to await it
    const responseText = await result.response.text(); // Await the text() method
    console.log(responseText); // Log the response text

    // You can return the response or process it further
    return responseText;
  } catch (error) {
    console.error("Error during the API request:", error);
  }
}

// Export the function for external use
export default run;

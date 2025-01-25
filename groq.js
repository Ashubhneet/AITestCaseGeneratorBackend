// const Groq = require("groq-sdk");

// const groq = new Groq({
//   apiKey: "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",
// });

// // export async function main() {
// //   const chatCompletion = await getGroqChatCompletion();
// //   // Print the completion returned by the LLM.
// //   console.log(chatCompletion.choices[0]?.message?.content || "");
// // }

// export async function getGroqChatCompletion(message) {
//   return groq.chat.completions.create({
//     messages: [
//       {
//         role: "user",
//         content: message,
//       },
//     ],
//     model: "llama-3.3-70b-versatile",
//   });
// }

// // content: "Explain the importance of fast language models",
require("dotenv").config();

const Groq = require("groq-sdk");
// console.log(process.env.API_KEYS);
const groq = new Groq({
  apiKey: process.env.API_KEYS,
});

async function getGroqChatCompletion(message) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}

module.exports = { getGroqChatCompletion };

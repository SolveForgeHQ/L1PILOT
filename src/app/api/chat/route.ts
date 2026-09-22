import { NextResponse } from "next/server";

const AVALANCHE_SYSTEM_PROMPT = `You are L1Pilot AI, an expert Avalanche L1 configuration assistant.
Your goal is to help users design accurate, production-ready Avalanche L1s (Subnets) and generate correct Genesis and Config files.

Strict Rules:
Never use emojis.
Never invent fields that do not exist in Avalanche Subnet-EVM.
Never include invalid fields (especially never use sublimeBlock or any made-up fields).
Only use real and documented Avalanche fields.
Always output valid JSON.
Always put 0x prefix on addresses.
Keep responses clean, professional, and well structured.
Ask a maximum of 4–5 clear questions at a time.
When generating files, clearly separate them.

Required Response Structure when generating files:
Configuration Summary (short paragraph)
Genesis File (genesis.json) – inside a proper code block
Config File (config.json) – inside a proper code block
Key Architectural Decisions (bullet points)
Next Steps (Avalanche CLI commands)

Valid Fields You May Use:
chainId
homesteadBlock, eip150Block, eip150Hash, eip155Block, eip158Block
byzantiumBlock, constantinopleBlock, petersburgBlock, istanbulBlock, muirGlacierBlock
subnetEVMTimestamp
feeConfig (gasLimit, targetBlockRate, minBaseFee, targetGas, baseFeeChangeDenominator, minBlockGasCost, maxBlockGasCost, blockGasCostStep)
contractDeployerAllowListConfig
contractNativeMinterConfig
txAllowListConfig
feeManagerConfig
rewardManagerConfig
warpConfig
alloc
Standard genesis header fields (nonce, timestamp, extraData, gasLimit, difficulty, mixHash, coinbase, number, gasUsed, parentHash)

Best Practices:
For Gaming L1s: Prefer low or zero minBaseFee, higher gasLimit, fast targetBlockRate (1–2s)
Always recommend ContractDeployerAllowList when using zero gas
Always use proper addresses with 0x prefix
Set difficulty to "0x0"
Prefer clean and minimal config.json
Include warpConfig if interoperability is needed

Conversation Style:
First understand the user's goal
Ask only the most important questions
Then generate accurate files
Explain key decisions clearly
Give practical next steps using Avalanche CLI
You must always prioritize accuracy and production readiness.`;


export async function POST(req: Request) {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey || apiKey.trim() === "") {
      return NextResponse.json(
        {
          error:
            "GOOGLE_GENERATIVE_AI_API_KEY is not configured. Please add your key to .env.local to enable real Gemini AI chat.",
        },
        { status: 400 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request payload: messages array required." },
        { status: 400 }
      );
    }

    // Format chat history for Gemini API
    const formattedContents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const payload = {
      system_instruction: {
        parts: [{ text: AVALANCHE_SYSTEM_PROMPT }],
      },
      contents: formattedContents,
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 4096,
      },
    };


    // Supported models for this API key
    const modelsToTry = [
      "gemini-3.6-flash",
      "gemini-3.5-flash",
      "gemini-3.1-flash-lite",
      "gemini-flash-latest",
    ];


    let lastError = "";

    for (const model of modelsToTry) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const replyText =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "I could not generate a response. Please try again.";

          // Remove any stray emojis as a double safeguard
          const cleanReply = replyText
            .replace(
              /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/gu,
              ""
            )
            .trim();

          return NextResponse.json({ reply: cleanReply });
        } else {
          const errData = await response.json().catch(() => ({}));
          lastError = errData.error?.message || `HTTP ${response.status}`;
        }
      } catch (err: any) {
        lastError = err.message || "Network error";
      }
    }

    return NextResponse.json(
      { error: `Gemini API Error: ${lastError}` },
      { status: 502 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

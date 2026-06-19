import { NextResponse } from "next/server";

// This route runs on the server only. The webhook URL and token are read from
// environment variables and are NEVER sent to the client.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SuggestBody = {
  suggestion?: unknown;
  name?: unknown;
  email?: unknown;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  const webhookUrl = process.env.AUTO_SUGGESTION_WEBHOOK_URL;
  const webhookToken = process.env.AUTO_SUGGESTION_WEBHOOK_TOKEN;

  // Surface misconfiguration loudly so it is obvious during setup. The actual
  // values are never included in the response.
  if (!webhookUrl || !webhookToken) {
    const missing = [
      !webhookUrl && "AUTO_SUGGESTION_WEBHOOK_URL",
      !webhookToken && "AUTO_SUGGESTION_WEBHOOK_TOKEN",
    ]
      .filter(Boolean)
      .join(", ");
    return NextResponse.json(
      {
        error: `Server is misconfigured: missing ${missing}. Set the suggestion webhook environment variables.`,
      },
      { status: 500 },
    );
  }

  let body: SuggestBody;
  try {
    body = (await request.json()) as SuggestBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const suggestion = asString(body.suggestion).trim();
  const name = asString(body.name).trim();
  const email = asString(body.email).trim();

  if (!suggestion) {
    return NextResponse.json(
      { error: "A non-empty suggestion is required." },
      { status: 400 },
    );
  }

  let webhookResponse: Response;
  try {
    webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${webhookToken}`,
      },
      body: JSON.stringify({ suggestion, name, email }),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to reach the suggestion webhook." },
      { status: 502 },
    );
  }

  if (!webhookResponse.ok) {
    return NextResponse.json(
      {
        error: `The suggestion webhook rejected the request (status ${webhookResponse.status}).`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

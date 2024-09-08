import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER, // e.g. us1
});

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
    });
  }

  try {
    const res = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID!,
      { email_address: email, status: "subscribed" }
    );

    return new Response(JSON.stringify({ res }), { status: 200 });
  } catch (error: unknown) {
    if (isMailchimpError(error)) {
      const parsedError = JSON.parse(error.response.text);
      return new Response(JSON.stringify({ error: parsedError }), {
        status: 500,
      });
    }

    // Default fallback for unexpected errors
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500 }
    );
  }
}

// Custom type guard to check if it's a Mailchimp error
function isMailchimpError(
  error: unknown
): error is { response: { text: string } } {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: { text?: string } }).response?.text ===
      "string"
  );
}

import Airtable from "airtable";

export async function logLogin(): Promise<void> {
  // Skip if Airtable credentials are not configured
  if (
    !process.env.AIRTABLE_API_KEY ||
    !process.env.AIRTABLE_BASE_ID ||
    !process.env.AIRTABLE_TABLE_NAME
  ) {
    console.log("Airtable logging skipped: credentials not configured");
    return;
  }

  try {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
      process.env.AIRTABLE_BASE_ID
    );

    await base(process.env.AIRTABLE_TABLE_NAME).create([
      {
        fields: {
          Timestamp: new Date().toISOString(),
          Status: "Success",
        },
      },
    ]);

    console.log("Login logged to Airtable successfully");
  } catch (error) {
    console.error("Failed to log to Airtable:", error);
    throw error;
  }
}

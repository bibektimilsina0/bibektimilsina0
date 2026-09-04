// src/emails/_shared.tsx
// Shared bits for the contact emails. Values are deliberately expressed in
// px/hex rather than Tailwind's rem-based scale: Gmail and Outlook drop `rem`
// lengths, which collapses the card to full width.

/**
 * Absolute base URL for images. Email clients fetch these from their own
 * servers, so a localhost URL renders as a broken image — fall back to the
 * production domain rather than localhost.
 */
export const emailBaseUrl = (() => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  if (!url || url.includes("localhost") || url.includes("127.0.0.1")) {
    return "https://www.bibektimilsina.com.np";
  }
  return url.replace(/\/$/, "");
})();

export const colors = {
  pageBg: "#f1f5f9",
  cardBg: "#ffffff",
  border: "#e2e8f0",
  heading: "#0f172a",
  body: "#334155",
  muted: "#64748b",
  panelBg: "#f8fafc",
  accent: "#2563eb",
};

export const main = {
  backgroundColor: colors.pageBg,
  margin: 0,
  padding: "24px 12px",
  fontFamily:
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif",
};

export const card = {
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: colors.cardBg,
  borderRadius: "12px",
  border: `1px solid ${colors.border}`,
  padding: "32px 28px",
};

export const logo = {
  display: "block",
  margin: "0 auto",
  borderRadius: "50%",
};

export const brandName = {
  margin: "12px 0 0",
  fontSize: "20px",
  lineHeight: "28px",
  fontWeight: 700,
  color: colors.heading,
  textAlign: "center" as const,
};

export const brandTagline = {
  margin: "4px 0 0",
  fontSize: "11px",
  lineHeight: "16px",
  letterSpacing: "1.5px",
  textTransform: "uppercase" as const,
  color: colors.muted,
  textAlign: "center" as const,
};

export const badge = {
  margin: "24px 0 0",
  padding: "10px 16px",
  borderRadius: "8px",
  backgroundColor: colors.panelBg,
  border: `1px solid ${colors.border}`,
  fontSize: "13px",
  lineHeight: "18px",
  fontWeight: 600,
  color: colors.body,
  textAlign: "center" as const,
};

export const h1 = {
  margin: "28px 0 8px",
  fontSize: "22px",
  lineHeight: "30px",
  fontWeight: 700,
  color: colors.heading,
};

export const paragraph = {
  margin: "0 0 4px",
  fontSize: "15px",
  lineHeight: "24px",
  color: colors.body,
};

export const divider = {
  margin: "28px 0",
  borderColor: colors.border,
  borderWidth: "1px 0 0",
  borderStyle: "solid",
};

export const label = {
  margin: "0 0 8px",
  fontSize: "11px",
  lineHeight: "16px",
  letterSpacing: "1px",
  textTransform: "uppercase" as const,
  fontWeight: 600,
  color: colors.muted,
};

export const metaRow = {
  margin: "0 0 6px",
  fontSize: "14px",
  lineHeight: "20px",
  color: colors.body,
};

export const quote = {
  margin: "8px 0 0",
  padding: "16px",
  borderRadius: "8px",
  backgroundColor: colors.panelBg,
  border: `1px solid ${colors.border}`,
  fontSize: "15px",
  lineHeight: "24px",
  color: colors.body,
  whiteSpace: "pre-wrap" as const,
};

export const footerText = {
  margin: "0 0 4px",
  fontSize: "12px",
  lineHeight: "18px",
  color: colors.muted,
};

export const link = { color: colors.accent, textDecoration: "none" };

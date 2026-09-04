import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import {
  brandName,
  brandTagline,
  card,
  colors,
  divider,
  emailBaseUrl,
  footerText,
  h1,
  label,
  link,
  logo,
  main,
  metaRow,
  quote,
} from "./_shared";

interface ContactNotificationEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

const alertBadge = {
  margin: "24px 0 0",
  padding: "10px 16px",
  borderRadius: "8px",
  backgroundColor: "#eff6ff",
  border: "1px solid #bfdbfe",
  fontSize: "13px",
  lineHeight: "18px",
  fontWeight: 600,
  color: "#1e40af",
  textAlign: "center" as const,
};

const detailPanel = {
  margin: "20px 0 0",
  padding: "16px",
  borderRadius: "8px",
  backgroundColor: colors.panelBg,
  border: `1px solid ${colors.border}`,
};

export function ContactNotificationEmail({
  name,
  email,
  subject,
  message,
  submittedAt,
}: ContactNotificationEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>New contact form submission from {name}</Preview>
      <Body style={main}>
        <Container style={card}>
          <Section>
            <Img
              src={`${emailBaseUrl}/bibektimilsina_logo.jpg`}
              alt="Bibek Timilsina"
              width="64"
              height="64"
              style={logo}
            />
            <Text style={brandName}>Bibek Timilsina</Text>
            <Text style={brandTagline}>Portfolio notification</Text>
          </Section>

          <Text style={alertBadge}>New contact form submission</Text>

          <Heading as="h1" style={h1}>
            Message from {name}
          </Heading>

          <Section style={detailPanel}>
            <Text style={metaRow}>
              <strong>From:</strong> {name}
            </Text>
            <Text style={metaRow}>
              <strong>Email:</strong>{" "}
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
            </Text>
            <Text style={metaRow}>
              <strong>Subject:</strong> {subject}
            </Text>
            <Text style={{ ...metaRow, margin: 0 }}>
              <strong>Received:</strong> {submittedAt}
            </Text>
          </Section>

          <Hr style={divider} />

          <Text style={label}>Message</Text>
          {message ? (
            <Text style={quote}>{message}</Text>
          ) : (
            <Text style={{ ...metaRow, color: colors.muted }}>
              (no message provided)
            </Text>
          )}

          <Hr style={divider} />

          <Text style={footerText}>
            Reply directly to this email to respond to {name}.
          </Text>
          <Text style={footerText}>
            Sent from the contact form on{" "}
            <Link href={emailBaseUrl} style={link}>
              bibektimilsina.com.np
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

ContactNotificationEmail.PreviewProps = {
  name: "Jane Smith",
  email: "jane@example.com",
  subject: "Project collaboration",
  message: "Hi Bibek, I would like to discuss a project with you.",
  submittedAt: "February 2, 2026 at 10:30 AM",
} satisfies ContactNotificationEmailProps;

export default ContactNotificationEmail;

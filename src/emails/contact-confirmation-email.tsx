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
  badge,
  brandName,
  brandTagline,
  card,
  divider,
  emailBaseUrl,
  footerText,
  h1,
  label,
  link,
  logo,
  main,
  metaRow,
  paragraph,
  quote,
} from "./_shared";

interface ContactConfirmationEmailProps {
  name: string;
  subject: string;
  message: string;
}

export function ContactConfirmationEmail({
  name,
  subject,
  message,
}: ContactConfirmationEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Thanks for reaching out — I received your message</Preview>
      <Body style={main}>
        <Container style={card}>
          <Section>
            <Img
              src={`${emailBaseUrl}/bibektimilsina_logo.jpg`}
              alt="Bibek Timilsina"
              width="72"
              height="72"
              style={logo}
            />
            <Text style={brandName}>Bibek Timilsina</Text>
            <Text style={brandTagline}>Full Stack Developer</Text>
          </Section>

          <Text style={badge}>Message received</Text>

          <Heading as="h1" style={h1}>
            Thanks for reaching out, {name}!
          </Heading>
          <Text style={paragraph}>
            I have received your message and will get back to you as soon as
            possible — usually within a day or two.
          </Text>

          <Hr style={divider} />

          <Text style={label}>Your message</Text>
          <Text style={metaRow}>
            <strong>Subject:</strong> {subject}
          </Text>
          {message ? <Text style={quote}>{message}</Text> : null}

          <Hr style={divider} />

          <Text style={footerText}>
            This is an automated confirmation. You can reply to this email if
            you would like to add anything.
          </Text>
          <Text style={footerText}>
            <Link href={emailBaseUrl} style={link}>
              bibektimilsina.com.np
            </Link>{" "}
            · Kathmandu, Nepal
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

ContactConfirmationEmail.PreviewProps = {
  name: "Jane Smith",
  subject: "Project collaboration",
  message: "Hi Bibek, I would like to discuss a project with you.",
} satisfies ContactConfirmationEmailProps;

export default ContactConfirmationEmail;

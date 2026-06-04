import { getContact } from "@/lib/actions/contact";
import ContactContent from "./contact-content";

export default async function Contact() {
  const contact = await getContact();
  return <ContactContent contact={contact} />;
}

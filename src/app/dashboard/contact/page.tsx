import HeaderSection from "@/components/dashboard/HeaderSection";
import ContactForm from "@/components/dashboard/contact/ContactForm";
import { getContact } from "@/lib/actions/contact";

export const dynamic = "force-dynamic";

export default async function ContactManagementPage() {
  const contact = await getContact();

  return (
    <div className="min-h-[calc(100vh-8rem)] w-full bg-background px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <HeaderSection
          title="Manage Contact Info"
          description="Edit the contact section heading and your email, phone, and location details."
          variant="bold"
        />
        <ContactForm contact={contact} />
      </div>
    </div>
  );
}

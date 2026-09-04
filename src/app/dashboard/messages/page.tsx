import HeaderSection from "@/components/dashboard/HeaderSection";
import MessageListDashboard from "@/components/dashboard/messages/MessageListDashboard";
import { getContactMessages } from "@/lib/actions/contact-messages";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = await getContactMessages();
  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-[calc(100vh-8rem)] w-full bg-background px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <HeaderSection
          title="Messages"
          description={
            messages.length === 0
              ? "Messages sent through your contact form appear here."
              : `${messages.length} message${
                  messages.length === 1 ? "" : "s"
                } received · ${unread} unread`
          }
          variant="bold"
        />
        <MessageListDashboard initialMessages={messages} />
      </div>
    </div>
  );
}

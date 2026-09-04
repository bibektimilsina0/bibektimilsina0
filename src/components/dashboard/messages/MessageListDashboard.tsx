"use client";

import React, { useMemo, useState, useTransition } from "react";
import {
  Loader2,
  Mail,
  MailOpen,
  Search,
  Trash2,
  CornerUpLeft,
} from "lucide-react";
import { toast } from "sonner";

import { ContactMessage } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  deleteContactMessage,
  markMessageRead,
} from "@/lib/actions/contact-messages";

type Filter = "all" | "unread";

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function MessageListDashboard({
  initialMessages,
}: {
  initialMessages: ContactMessage[];
}) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  React.useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const unreadCount = messages.filter((m) => !m.read).length;
  // Derived from `messages` so the dialog reflects read-state changes live.
  const openMessage = messages.find((m) => m._id === openId) ?? null;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return messages
      .filter((m) => (filter === "unread" ? !m.read : true))
      .filter((m) =>
        q
          ? [m.name, m.email, m.subject, m.message]
              .join(" ")
              .toLowerCase()
              .includes(q)
          : true,
      );
  }, [messages, filter, query]);

  const applyRead = (id: string, read: boolean) => {
    setMessages((prev) =>
      prev.map((m) => (m._id === id ? { ...m, read } : m)),
    );
  };

  const toggleRead = (msg: ContactMessage, read: boolean) => {
    applyRead(msg._id, read); // optimistic
    startTransition(async () => {
      const res = await markMessageRead(msg._id, read);
      if (!res.success) {
        applyRead(msg._id, !read); // roll back
        toast.error(res.error || "Failed to update message");
      }
    });
  };

  /** Opening a message marks it read, mirroring an inbox. */
  const openAndMarkRead = (msg: ContactMessage) => {
    setOpenId(msg._id);
    if (!msg.read) toggleRead(msg, true);
  };

  const handleDelete = (msg: ContactMessage) => {
    if (
      !window.confirm(
        `Delete the message from ${msg.name}? This cannot be undone.`,
      )
    ) {
      return;
    }
    setPendingId(msg._id);
    startTransition(async () => {
      try {
        const res = await deleteContactMessage(msg._id);
        if (res.success) {
          toast.success("Message deleted");
          setMessages((prev) => prev.filter((m) => m._id !== msg._id));
          setOpenId((cur) => (cur === msg._id ? null : cur));
        } else {
          toast.error(res.error || "Failed to delete message");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred while deleting");
      } finally {
        setPendingId(null);
      }
    });
  };

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border/70 bg-card px-4 py-16 text-center">
        <div className="rounded-full border border-primary/10 bg-primary/5 p-4 text-primary">
          <Mail className="h-10 w-10 stroke-[1.5]" />
        </div>
        <div className="max-w-sm space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            No messages yet
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Submissions from the contact form on your site will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
            <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-[10px]">
              {messages.length}
            </Badge>
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("unread")}
          >
            Unread
            <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-[10px]">
              {unreadCount}
            </Badge>
          </Button>
        </div>
        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, subject..."
            className="pl-9"
          />
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/70 bg-card px-4 py-12 text-center text-sm text-muted-foreground">
          No messages match your filters.
        </div>
      ) : (
        <div className="space-y-3">
          {visible.map((msg) => (
            <Card
              key={msg._id}
              onClick={() => openAndMarkRead(msg)}
              className={`cursor-pointer border-border/50 transition-all duration-200 hover:border-primary/20 hover:shadow-md ${
                msg.read ? "bg-card" : "border-l-4 border-l-primary bg-primary/5"
              }`}
            >
              <CardContent className="flex items-start gap-4 py-4">
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`truncate text-sm ${
                        msg.read
                          ? "font-medium text-foreground"
                          : "font-bold text-foreground"
                      }`}
                    >
                      {msg.name}
                    </span>
                    {!msg.read && (
                      <Badge className="h-5 px-1.5 text-[10px]">New</Badge>
                    )}
                    <span className="truncate text-xs text-muted-foreground">
                      {msg.email}
                    </span>
                  </div>
                  <p className="truncate text-sm font-semibold text-primary">
                    {msg.subject}
                  </p>
                  <p className="line-clamp-1 text-sm text-muted-foreground">
                    {msg.message || "(no message provided)"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(msg.createdAt)}
                  </p>
                </div>

                <div
                  className="flex shrink-0 items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    title={msg.read ? "Mark as unread" : "Mark as read"}
                    onClick={() => toggleRead(msg, !msg.read)}
                  >
                    {msg.read ? (
                      <MailOpen className="h-4 w-4" />
                    ) : (
                      <Mail className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 border-destructive/20 text-destructive hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                    disabled={pendingId === msg._id}
                    title="Delete message"
                    onClick={() => handleDelete(msg)}
                  >
                    {pendingId === msg._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Detail view */}
      <Dialog
        open={!!openMessage}
        onOpenChange={(open) => !open && setOpenId(null)}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          {openMessage && (
            <>
              <DialogHeader>
                <DialogTitle className="pr-6">
                  {openMessage.subject}
                </DialogTitle>
                <DialogDescription asChild>
                  <div className="space-y-0.5 text-left">
                    <span className="block text-sm font-medium text-foreground">
                      {openMessage.name}
                    </span>
                    <a
                      href={`mailto:${openMessage.email}`}
                      className="block text-sm text-primary hover:underline"
                    >
                      {openMessage.email}
                    </a>
                    <span className="block text-xs text-muted-foreground">
                      {formatDate(openMessage.createdAt)}
                    </span>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="whitespace-pre-wrap rounded-lg border border-border/50 bg-muted/30 p-4 text-sm leading-relaxed text-foreground">
                {openMessage.message || "(no message provided)"}
              </div>

              <DialogFooter className="gap-2 sm:justify-between">
                <Button
                  variant="outline"
                  onClick={() => toggleRead(openMessage, !openMessage.read)}
                >
                  {openMessage.read ? (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Mark unread
                    </>
                  ) : (
                    <>
                      <MailOpen className="mr-2 h-4 w-4" />
                      Mark read
                    </>
                  )}
                </Button>
                <Button asChild>
                  <a
                    href={`mailto:${openMessage.email}?subject=${encodeURIComponent(
                      `Re: ${openMessage.subject}`,
                    )}`}
                  >
                    <CornerUpLeft className="mr-2 h-4 w-4" />
                    Reply by email
                  </a>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

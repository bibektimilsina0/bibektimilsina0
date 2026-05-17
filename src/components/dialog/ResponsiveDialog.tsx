// responsive dialog that uses a dialog on desktop and a drawer on mobile and if content is large to fit in viewport height change it to sheet
"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

interface DialogHeaderProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  iconContainerClassName?: string;
}

interface ResponsiveDialogProps {
  trigger?: React.ReactNode;
  header: DialogHeaderProps;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  footer?: React.ReactNode;
  contentClassName?: string;
  showSeparator?: boolean;
  useSheet?: boolean; // New prop to force using Sheet
  sheetSide?: "top" | "right" | "bottom" | "left"; // Sheet position
}

export function ResponsiveDialog({
  trigger,
  header,
  children,
  open: controlledOpen,
  onOpenChange,
  footer,
  contentClassName,
  showSeparator = true,
  useSheet = false,
  sheetSide = "bottom",
}: ResponsiveDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const dialogHeaderContent = (
    <div className="flex items-center gap-3">
      {header.icon && (
        <div
          className={cn(
            "p-3 rounded-full",
            header.iconContainerClassName || "bg-primary/10 text-primary",
          )}
        >
          {header.icon}
        </div>
      )}
      <div>
        <DialogTitle className="text-xl md:text-2xl font-semibold tracking-tight">
          {header.title}
        </DialogTitle>
        {header.description && (
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            {header.description}
          </DialogDescription>
        )}
      </div>
    </div>
  );

  const drawerHeaderContent = (
    <div className="flex items-center gap-3">
      {header.icon && (
        <div
          className={cn(
            "p-3 rounded-full",
            header.iconContainerClassName || "bg-primary/10 text-primary",
          )}
        >
          {header.icon}
        </div>
      )}
      <div>
        <DrawerTitle className="text-xl md:text-2xl font-semibold tracking-tight">
          {header.title}
        </DrawerTitle>
        {header.description && (
          <DrawerDescription className="text-sm text-muted-foreground mt-1">
            {header.description}
          </DrawerDescription>
        )}
      </div>
    </div>
  );

  const sheetHeaderContent = (
    <div className="flex items-center gap-3">
      {header.icon && (
        <div
          className={cn(
            "p-3 rounded-full",
            header.iconContainerClassName || "bg-primary/10 text-primary",
          )}
        >
          {header.icon}
        </div>
      )}
      <div>
        <SheetTitle className="text-xl md:text-2xl font-semibold tracking-tight">
          {header.title}
        </SheetTitle>
        {header.description && (
          <SheetDescription className="text-sm text-muted-foreground mt-1">
            {header.description}
          </SheetDescription>
        )}
      </div>
    </div>
  );

  // If useSheet is true, render Sheet
  if (useSheet) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
        <SheetContent
          side={sheetSide}
          className={cn("overflow-y-auto ", contentClassName)}
        >
          <SheetHeader className="pb-4">
            {sheetHeaderContent}
            {showSeparator && <Separator className="mt-4" />}
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 p-4">{children}</div>
          {footer && <SheetFooter className="pt-4">{footer}</SheetFooter>}
        </SheetContent>
      </Sheet>
    );
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent
          className={cn(
            "max-w-4xl max-h-[90vh] overflow-visible",
            contentClassName,
          )}
        >
          <div
            className="flex flex-col gap-2 overflow-y-auto max-h-[calc(90vh-200px)]"
            data-slot="dialog-content"
          >
            <DialogHeader className="pb-4">
              {dialogHeaderContent}
              {showSeparator && <Separator className="mt-4" />}
            </DialogHeader>
            {children}
          </div>
          {footer && (
            <div className="flex justify-end gap-2 pt-4">{footer}</div>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent>
        <DrawerHeader className="text-left">
          {drawerHeaderContent}
          {showSeparator && <Separator className="mt-4" />}
        </DrawerHeader>
        <div className="px-4 overflow-y-auto">{children}</div>
        {footer && <DrawerFooter className="pt-2">{footer}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
}

// Re-export close components for use in footer
export { DialogClose, DrawerClose, SheetClose };

// example usage:
// without sheet - uncontrolled (no open/onOpenChange needed)
export function ResponsiveDialogExample1() {
  return (
    <ResponsiveDialog
      trigger={
        <Button className=" bg-primary text-primary-foreground">
          <Plus className="mr-2 h-4 w-4" />
          add category
        </Button>
      }
      header={{
        icon: <Plus className="h-5 w-5" />,
        title: "Add New Category",
        description: "Create a new category",
      }}
      footer={
        <>
          <DialogClose asChild>
            <Button
              variant="outline"
              type="button"
              className=" border-border text-foreground"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-primary text-primary-foreground">
            Add Category
          </Button>
        </>
      }
      contentClassName="bg-card border-border"
    >
      <div className="bg-card rounded-lg p-6 border">
        <p>This is the content of the dialog/drawer.</p>
      </div>
    </ResponsiveDialog>
  );
}

// with sheet - uncontrolled
export function ResponsiveDialogExample2() {
  return (
    <ResponsiveDialog
      useSheet={true}
      sheetSide="bottom"
      trigger={
        <Button className=" bg-primary text-primary-foreground">
          <Plus className="mr-2 h-4 w-4" />
          add category
        </Button>
      }
      header={{
        icon: <Plus className="h-5 w-5" />,
        title: "Add New Category",
        description: "Create a new category",
      }}
      footer={
        <>
          <SheetClose asChild>
            <Button
              variant="outline"
              type="button"
              className=" border-border text-foreground"
            >
              Cancel
            </Button>
          </SheetClose>
          <Button type="submit" className="bg-primary text-primary-foreground">
            Add Category
          </Button>
        </>
      }
      contentClassName="bg-card border-border"
    >
      <div className="bg-card rounded-lg p-6 border">
        <p>This is the content of the sheet.</p>
      </div>
    </ResponsiveDialog>
  );
}

// controlled example (when you need to programmatically control open state)
export function ResponsiveDialogExample3() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    // do something
    setIsOpen(false); // close programmatically after action
  };

  return (
    <ResponsiveDialog
      trigger={
        <Button className=" bg-primary text-primary-foreground">
          <Plus className="mr-2 h-4 w-4" />
          add category
        </Button>
      }
      header={{
        icon: <Plus className="h-5 w-5" />,
        title: "Add New Category",
        description: "Create a new category",
      }}
      footer={
        <>
          <DialogClose asChild>
            <Button
              variant="outline"
              type="button"
              className=" border-border text-foreground"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-primary text-primary-foreground"
          >
            Add Category
          </Button>
        </>
      }
      open={isOpen}
      onOpenChange={setIsOpen}
      contentClassName="bg-card border-border"
    >
      <div className="bg-card rounded-lg p-6 border">
        <p>This is the content of the dialog.</p>
      </div>
    </ResponsiveDialog>
  );
}

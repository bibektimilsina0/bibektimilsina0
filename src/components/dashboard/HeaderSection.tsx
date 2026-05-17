import {
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../ui/button";
import { HoverPrefetchLink } from "../hover-prefetch";

export default function HeaderSection({
  title,
  description,
  variant = "default",
  action = false,
  actiontitle,
  dialogAction,
  link,
}: {
  title: string;
  description: string;
  variant?: "default" | "cardheader" | "bold";
  action?: boolean;
  link?: string;
  actiontitle?: string;
    dialogAction?: React.ReactNode;
}) {
  const renderTitle = () => {
    switch (variant) {
      case "cardheader":
        return (
          <CardHeader>
            <CardTitle className="font-semibold text-xl text-foreground md:text-2xl">
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
            {action && link && (
              <CardAction>
                <HoverPrefetchLink href={link}>
                  <Button variant="link">{actiontitle}</Button>
                </HoverPrefetchLink>
              </CardAction>
            )}
          </CardHeader>
        );
      case "bold":
        return (
          <div className="space-y-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                      {title}
                    </h1>
                  </div>
                </div>
                <p className="text-sm md:text-base text-muted-foreground">
                  {description}
                </p>
              </div>
              <div className="shrink-0"> {dialogAction}</div>
            </div>
          </div>
        );
      case "default":
      default:
        return (
          <div className="mb-8 text-center">
            <h1 className=" font-semibold text-xl text-foreground md:text-2xl">
              {title}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              {description}
            </p>
          </div>
        );
    }
  };
  return <div>{renderTitle()}</div>;
}

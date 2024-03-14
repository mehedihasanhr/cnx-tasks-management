"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

function WidgetCustomization({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div role="presentation" onMouseDown={(e) => e.stopPropagation()}>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-medium">
              Dashboard Customization?
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[400px]">
            <DialogDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
              minima repellat itaque ratione nisi repudiandae architecto,
              eligendi tempore placeat excepturi, fuga possimus molestiae
              repellendus veritatis error. Unde ab vitae quis?
            </DialogDescription>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default WidgetCustomization;

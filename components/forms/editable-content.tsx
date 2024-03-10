import { cn } from "@/lib/utils";
import * as React from "react";

interface PropTypes {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  autoFocus?: boolean;
  onBlurChange: (value: string) => void;
}

export function EditableContent({
  placeholder,
  defaultValue = "",
  onBlurChange,
  autoFocus = false,
  className,
  ...props
}: PropTypes) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref && ref.current && autoFocus) {
      ref.current.focus();
    }
  }, [autoFocus, ref]);

  // on blur
  const onContentBlur = async (evt: {
    currentTarget: { innerText: React.SetStateAction<string> };
  }) => {
    const value = evt.currentTarget.innerText.toString();
    onBlurChange(value);
  };

  // on blur
  const handleKeyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      if (ref && ref.current) {
        ref.current.blur();
      }
    }
  };

  return (
    <div
      role="textbox"
      tabIndex={0}
      ref={ref}
      onBlur={onContentBlur}
      onKeyDown={handleKeyDown}
      contentEditable="plaintext-only"
      suppressContentEditableWarning
      data-placeholder={placeholder}
      className={cn(
        "w-fit whitespace-nowrap border border-transparent bg-transparent px-3 py-1 pr-4 outline-none empty:before:text-base-300 empty:before:content-[attr(data-placeholder)] hover:cursor-text hover:border-white/10 hover:bg-base-300/5 focus:border-white/5 focus:bg-base-300/5 focus:ring-0 focus-visible:ring-0",
        className
      )}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: defaultValue }}
      {...props}
    />
  );
}

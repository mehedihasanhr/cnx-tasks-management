import React from "react";

interface PropTypes extends React.ComponentProps<"div"> {
  dataKey: string;
}

const WidgetItem: React.FC<PropTypes> = React.forwardRef(function WidgetItem(
  { className, style, dataKey, onMouseDown, children, ...props },
  ref
) {
  return (
    <div
      key={dataKey}
      style={{ ...style }}
      className={className}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

export default WidgetItem;

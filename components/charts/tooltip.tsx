import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any): React.ReactNode {
  if (active && payload && payload.length) {
    return (
      <div className="w-32 rounded-lg bg-base-0/5 px-3.5 py-2.5 text-sm backdrop-blur-sm">
        <p className="mb-2 border-b border-base-0/20 pb-2">{label}</p>

        <div className="">
          {_.map(payload, (p, index) => (
            <p key={index} className="mb-1">
              {p.name}: {p.payload[p.name]}
            </p>
          ))}
        </div>
      </div>
    );
  }
}

export default CustomTooltip;

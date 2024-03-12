import Spinner from "@/components/spinner";

export default function LoadingPrivateLayout() {
  return (
    <div className="grid h-full flex-1 place-items-center">
      <div className="flex items-center gap-2">
        <Spinner />
        <span>Loading...</span>
      </div>
    </div>
  );
}

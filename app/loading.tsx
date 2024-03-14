import Spinner from "@/components/spinner";

function MainLoader() {
  return (
    <div className="grid h-screen w-screen place-items-center overflow-hidden">
      <div className="flex items-center gap-2">
        <Spinner />
        <span>Loading...</span>
      </div>
    </div>
  );
}

export default MainLoader;

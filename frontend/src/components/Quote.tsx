export const Quote = () => {
  return (
    <div className=" h-screen flex justify-center flex-col p-5">
      <div className="flex justify-center">
        <div className="max-w-lg">
          <div className="text-3xl font-bold">
            Some quote on AI will hit this page. Does this look good?
          </div>
          <div className="max-w-md text-xl font-semibold text-left mt-4">
            Author Name
          </div>
          <div className="max-w-md text-md font-light text-slate-600">
            Location
          </div>
        </div>
      </div>
    </div>
  );
};

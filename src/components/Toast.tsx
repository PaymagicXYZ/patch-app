export const Toast = () => {
  return (
    <div className="flex flex-col text-start">
      <div className="text-base text-gray-300">Token balances are updating</div>
      <div className="text-sm text-gray-500">
        Please wait 10 seconds for updates.
      </div>
    </div>
  );
};

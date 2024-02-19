function AlphaBanner() {
  return (
    <div className="absolute left-0 top-0 flex w-full flex-row items-center justify-between bg-orange-100">
      <p className="m-auto p-2 text-center text-xs font-medium leading-4 text-gray-950 md:text-sm">
        Patch Wallets are experimental new account abstraction wallets. Please
        use this app at your own risk.
      </p>
    </div>
  );
}

export default AlphaBanner;

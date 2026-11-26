
const Loading = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-32 w-full items-center justify-center gap-3 py-8 text-haven-green"
    >
      <span
        aria-hidden="true"
        className="h-8 w-8 animate-spin rounded-full border-[3px] border-haven-border border-t-haven-primary motion-reduce:animate-none"
      />
      <span className="font-display text-xl font-semibold">Loading</span>
      <span aria-hidden="true" className="animate-pulse font-display text-2xl font-bold text-haven-primary">
        ...
      </span>
    </div>
  );
};

export default Loading;

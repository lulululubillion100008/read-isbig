export default function DividerBlock() {
  return (
    <div className="my-8 flex items-center justify-center gap-2">
      <span className="h-px w-8 bg-[var(--gray-5)]" />
      <span className="h-1 w-1 rounded-full bg-[var(--gray-4)]" />
      <span className="h-px w-8 bg-[var(--gray-5)]" />
    </div>
  );
}

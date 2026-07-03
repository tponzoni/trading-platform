type PanelProps = {
  title: string;
  children: React.ReactNode;
};

export function Panel({
  title,
  children,
}: PanelProps) {
  return (
    <section className="flex h-full w-full min-h-0 flex-col rounded-md border bg-white shadow-sm">

      {/* <header className="border-b px-4 py-3 font-semibold">
        {title}
      </header> */}

      <div className="flex flex-1 min-h-0 flex-col p-4">
        {children}
      </div>

    </section>
  );
}
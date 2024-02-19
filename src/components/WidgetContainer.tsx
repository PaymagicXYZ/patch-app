import { cn } from "@/libs/utils";

function WidgetContainer(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col bg-gray-900 rounded-2xl border-[0.5px] border-gray-800 w-full p-4",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}

export default WidgetContainer;

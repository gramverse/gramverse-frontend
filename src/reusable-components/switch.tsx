import clsx from "clsx";
import { forwardRef, InputHTMLAttributes } from "react";

export type SwitchProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, className, ...attrs },
  ref,
) {
  return (
    <label className={clsx("flex gap-4", className)}>
      <div className="relative h-8 w-16 rounded-full bg-white after:absolute after:left-0 after:h-8 after:w-8 after:rounded-full after:bg-white after:shadow-sm after:ring-1 after:ring-gray-200 after:transition-transform after:content-[''] has-[:checked]:bg-submit-btn after:has-[:checked]:translate-x-8">
        <input ref={ref} type="checkbox" className="hidden" {...attrs} />
      </div>
      <span>{label}</span>
    </label>
  );
});

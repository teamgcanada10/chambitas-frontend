import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

// --- Recreated UI Components ---
const Card = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg shadow-black/20 dark:shadow-black/50", className)}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

const GradientCard = ({ children, className }) => (
    <div className={cn("p-0.5 rounded-2xl bg-gradient-to-b from-purple-500/50 to-slate-300/50 dark:to-slate-800/50", className)}>
      <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-[15px] h-full">
        {children}
      </div>
    </div>
  );

const Button = forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-purple-600 text-white hover:bg-purple-600/90",
    secondary: "bg-slate-200 text-slate-800 hover:bg-slate-200/80 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-700/80",
    outline: "border border-slate-300 dark:border-slate-700 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
  };
  return (
    <button
      className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

const Input = forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn("flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 dark:placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

const Label = forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
    {...props}
  />
));
Label.displayName = "Label";

const Tabs = ({ value, onValueChange, ...props }) => <div {...props} />;

const TabsList = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("inline-flex h-auto sm:h-10 items-center justify-center rounded-md bg-slate-200 dark:bg-slate-800 p-1 text-slate-600 dark:text-slate-400", className)}
    {...props}
  />
));
TabsList.displayName = "TabsList";

const TabsTrigger = forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50 data-[state=active]:shadow-sm", className)}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

const Textarea = forwardRef(({ className, ...props }, ref) => (
  <textarea
    className={cn("flex min-h-[80px] w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm ring-offset-background placeholder:text-slate-500 dark:placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

const Slider = forwardRef(({ className, value, onValueChange, ...props }, ref) => {
    return (
        <div className="relative w-full h-5 flex items-center">
            <div className="relative w-full h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full">
                <div 
                  className="absolute h-1.5 bg-purple-500 rounded-full"
                  style={{ left: `${((value[0] - props.min) / (props.max - props.min)) * 100}%`, right: `${100 - ((value[1] - props.min) / (props.max - props.min)) * 100}%` }}
                ></div>
                <input type="range" value={value[0]} onChange={(e) => onValueChange([parseFloat(e.target.value), value[1]])} className="absolute w-full h-1.5 opacity-0 cursor-pointer" {...props} />
                <div className="absolute w-4 h-4 bg-white dark:bg-slate-800 border-2 border-purple-500 rounded-full -translate-x-1/2 -top-1.5" style={{ left: `${((value[0] - props.min) / (props.max - props.min)) * 100}%` }}></div>
                <input type="range" value={value[1]} onChange={(e) => onValueChange([value[0], parseFloat(e.target.value)])} className="absolute w-full h-1.5 opacity-0 cursor-pointer" {...props} />
                <div className="absolute w-4 h-4 bg-white dark:bg-slate-800 border-2 border-purple-500 rounded-full -translate-x-1/2 -top-1.5" style={{ left: `${((value[1] - props.min) / (props.max - props.min)) * 100}%` }}></div>
            </div>
        </div>
    );
});
Slider.displayName = "Slider";

const Badge = forwardRef(({ className, variant = "default", ...props }, ref) => {
    const variants = {
        default: "border-transparent bg-purple-600 text-purple-50",
        secondary: "border-transparent bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100",
        outline: "text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700",
    };
    return <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", variants[variant], className)} ref={ref} {...props} />;
});
Badge.displayName = "Badge";

export {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    GradientCard,
    Button,
    Input,
    Label,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Textarea,
    Slider,
    Badge
}
export const Tooltip: React.FC<{
  text?: string;
  children: React.ReactNode;
}> = ({ text, children }) => {
  return text ? (
    <div className="relative inline-block group">
      {children}
      <div
        className="
          absolute left-1/2 -translate-x-1/2 -top-10 
          whitespace-nowrap 
          rounded bg-gray-800 text-white text-sm px-2 py-1
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-400 
          pointer-events-none
          z-1000
        "
      >
        {text}
      </div>
    </div>
  ) : (
    children
  );
};

export const IconText: React.FC<{ icon: React.ReactNode; text: string; sizeClass?: string }> = ({
  icon,
  text,
  sizeClass
}) => {
  return (
    <span className={`flex flex-row items-center gap-2 ${sizeClass}`}>
      {icon}
      {text}
    </span>
  );
};

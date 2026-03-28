const baseStyle = 'h-5';

export const SVGIcon: React.FC<{ src: string; className?: string; onClick?: () => void }> = ({ src, className, onClick }) => (
  <img
    src={src}
    alt="logo"
    className={onClick ? (className ?? baseStyle) + ' cursor-pointer' : className ?? baseStyle}
    onClick={
      onClick
        ? (e) => {
            console.log('clicked');
            e.preventDefault();
            onClick?.();
          }
        : undefined
    }
  />
);

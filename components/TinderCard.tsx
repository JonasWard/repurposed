import { useRef } from 'react';

const SWIPE_X_REGISTRATION_DISTANCE = 60;

export const TinderCard = ({
  url,
  index,
  onLike,
  onDislike,
  active,
  name
}: {
  url: string;
  index: number;
  onLike: () => void;
  onDislike: () => void;
  active: boolean;
  name: string;
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const dragData = useRef({ offsetX: 0, offsetY: 0, startX: 0, startY: 0 });

  const startDrag = (e: any) => {
    if (!elementRef.current) return;
    const x = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const y = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    dragData.current = { startX: x, startY: y, offsetX: 0, offsetY: 0 };

    elementRef.current.style.transition = '';
    document.addEventListener('mousemove', moveDrag);
    document.addEventListener('touchmove', moveDrag, { passive: false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
  };

  const moveDrag = (e: any) => {
    if (!elementRef.current) return;
    const x = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const y = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    dragData.current.offsetX = x - dragData.current.startX;
    dragData.current.offsetY = y - dragData.current.startY;
    const rotate = dragData.current.offsetX / 20;
    elementRef.current.style.transform = `translate(${dragData.current.offsetX}px, ${dragData.current.offsetY}px) rotate(${rotate}deg)`;

    if (dragData.current.offsetX > SWIPE_X_REGISTRATION_DISTANCE)
      elementRef.current.style.boxShadow = '#3fdd5e 0px 14px 28px, #3fdd5e 0px 0px 18px 14px';
    else if (dragData.current.offsetX < -SWIPE_X_REGISTRATION_DISTANCE)
      elementRef.current.style.boxShadow = '#d14949 0px 14px 28px, #d14949 0px 0px 18px 14px';
    else elementRef.current.style.boxShadow = 'rgba(0, 0, 0, 0.1) 0px 14px 28px, rgba(0, 0, 0, 0.1) 0px 0px 18px 14px';
  };

  const endDrag = () => {
    if (!elementRef.current) return;
    const { offsetX } = dragData.current;
    const rotate = dragData.current.offsetX / 20;
    if (offsetX > SWIPE_X_REGISTRATION_DISTANCE) {
      const direction = offsetX > 0 ? 1000 : -1000;
      elementRef.current.style.transform = `translate(${direction}px, ${dragData.current.offsetY}px) rotate(${
        direction > 0 ? 45 : -45
      }deg)`;
      elementRef.current.style.transform = `translate(${500}px, ${dragData.current.offsetY}px) rotate(${rotate}deg)`;
      elementRef.current.style.opacity = '0';
      elementRef.current.style.transition = 'all 0.3s ease-in-out';
      setTimeout(() => onLike(), 300);
    } else if (offsetX < -SWIPE_X_REGISTRATION_DISTANCE) {
      elementRef.current.style.transform = `translate(${offsetX}px, ${dragData.current.offsetY}px) rotate(${
        offsetX > 0 ? 45 : -45
      }deg)`;
      elementRef.current.style.transform = `translate(${-500}px, ${dragData.current.offsetY}px) rotate(${rotate}deg)`;
      elementRef.current.style.opacity = '0';
      elementRef.current.style.transition = 'all 0.3s ease-in-out';
      setTimeout(() => onDislike(), 300);
    } else {
      elementRef.current.style.transform = '';
      elementRef.current.style.opacity = '1';
      elementRef.current.style.transition = 'transform 0.3s ease-in-out';
    }

    document.removeEventListener('mousemove', moveDrag);
    document.removeEventListener('touchmove', moveDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchend', endDrag);
  };

  return (
    <div
      key={url}
      ref={elementRef}
      id={`card-${index}`}
      className="absolute inset-0 shadow-lg bg-cover bg-center cursor-grab bg-image-contain transition-shadow duration-300"
      style={{
        backgroundImage: `url(${url})`,
        filter: active ? 'grayscale(0)' : 'grayscale(0.8)',
        zIndex: 1000 - index
      }}
      onMouseDown={active ? (e) => startDrag(e) : undefined}
      onTouchStart={active ? (e) => startDrag(e) : undefined}
    >
      <div className="absolute bottom-10 left-0 right-0 text-white text-center">{name}</div>
    </div>
  );
};

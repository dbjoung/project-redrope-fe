import { useParams } from "react-router";
import { useRef, useState, type PointerEvent } from "react";
import cn from "@/share/lib/cn";

const slideImages = [
  "https://picsum.photos/id/64/960/640",
  "https://picsum.photos/id/65/960/640",
  "https://picsum.photos/id/91/960/640",
  "https://picsum.photos/id/1027/960/640",
  "https://picsum.photos/id/64/960/640",
  "https://picsum.photos/id/65/960/640",
  "https://picsum.photos/id/91/960/640",
  "https://picsum.photos/id/1027/960/640",
  "https://picsum.photos/id/64/960/640",
  "https://picsum.photos/id/65/960/640",
  "https://picsum.photos/id/91/960/640",
  "https://picsum.photos/id/1027/960/640",
];

export default function EntityDetail() {
  const { entityId } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const thumbnailContainerRef = useRef<HTMLDivElement | null>(null);
  const imageContainerStartXRef = useRef<number | null>(null);
  const thumbnailButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
  });

  const handleThumbnailPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const container = thumbnailContainerRef.current;
    if (!container) return;

    dragStateRef.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: container.scrollLeft,
      hasMoved: false,
    };
  };

  const handleThumbnailPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const container = thumbnailContainerRef.current;
    const dragState = dragStateRef.current;
    if (!container || !dragState.isDragging) return;

    const distance = event.clientX - dragState.startX;

    if (Math.abs(distance) > 4) dragState.hasMoved = true;

    container.scrollLeft = dragState.scrollLeft - distance;
  };

  const handleThumbnailPointerEnd = () => {
    dragStateRef.current.isDragging = false;
  };

  const handleThumbnailClick = (index: number) => {
    if (dragStateRef.current.hasMoved) {
      dragStateRef.current.hasMoved = false;
      return;
    }

    setSelectedImageIndex(index);
    thumbnailButtonRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const handleImagePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!imageContainerStartXRef.current) {
      imageContainerStartXRef.current = e.clientX;
    }
  };

  const handleImagePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!thumbnailButtonRefs.current || !imageContainerStartXRef.current) return;
    const thumbnailButtons = thumbnailButtonRefs.current;
    const currentX = imageContainerStartXRef.current;

    const distance = currentX - e.clientX;
    const abs = Math.abs(distance);
    const direction = distance / abs;

    if (abs > 10) {
      const tempNext = selectedImageIndex + direction;
      let next = 0;
      if (tempNext >= thumbnailButtons.length) next = 0;
      else if (tempNext < 0) next = thumbnailButtons.length - 1;
      else next = tempNext;

      handleThumbnailClick(next);
      imageContainerStartXRef.current = null;
    }
  };

  return (
    <section className="gap-rd-24 mx-auto flex max-w-5xl flex-col">
      <section className="rd-box-shadow rounded-rd-16 bg-rd-white relative overflow-hidden">
        <div className="bg-rd-surface-gray-100 relative aspect-16/10 w-full overflow-hidden">
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${selectedImageIndex * 100}%)` }}
            onPointerDown={handleImagePointerDown}
            onPointerMove={handleImagePointerMove}
          >
            {slideImages.map((imageUrl, index) => (
              <img
                key={`${imageUrl}-${index}`}
                src={imageUrl}
                alt={`entity-${entityId ?? "detail"}-${index + 1}`}
                className="h-full w-full shrink-0 object-cover"
                draggable={false}
              />
            ))}
          </div>
        </div>
        <div
          ref={thumbnailContainerRef}
          className="gap-rd-12 p-rd-16 absolute right-0 bottom-0 z-1 flex cursor-grab touch-pan-x overflow-x-auto [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
          onPointerDown={handleThumbnailPointerDown}
          onPointerMove={handleThumbnailPointerMove}
          onPointerUp={handleThumbnailPointerEnd}
          onPointerLeave={handleThumbnailPointerEnd}
          onPointerCancel={handleThumbnailPointerEnd}
        >
          {slideImages.map((imageUrl, index) => {
            const isSelected = index === selectedImageIndex;

            return (
              <button
                key={`${imageUrl}-${index}`}
                ref={(button) => {
                  thumbnailButtonRefs.current[index] = button;
                }}
                type="button"
                aria-label={`Show image ${index + 1}`}
                aria-current={isSelected}
                className={cn(
                  "rounded-rd-8 bg-rd-surface-gray-100 w-1/5 max-w-28 shrink-0 cursor-grab overflow-hidden border-2 transition",
                  "focus-visible:ring-rd-surface-red-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                  isSelected
                    ? "border-rd-surface-red-400 opacity-100"
                    : "border-transparent opacity-65 hover:opacity-100",
                )}
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={imageUrl}
                  alt=""
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </button>
            );
          })}
        </div>
      </section>
    </section>
  );
}

import Image from "next/image";

type MediaFrameProps = {
  label: string;
  kind?: "image" | "video";
  src?: string;
  priority?: boolean;
  placeholderLabel?: string;
};

export function MediaFrame({ label, src, priority = false, placeholderLabel = "" }: MediaFrameProps) {
  return (
    <figure className="group relative aspect-[4/5] min-h-[420px] overflow-hidden rounded-[2rem] bg-copad-deep shadow-[0_26px_70px_rgba(15,61,57,.18)]">
      {src ? (
        <Image
          className="object-cover transition duration-1000 ease-out group-hover:scale-[1.035]"
          src={src}
          alt={label}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 48vw"
        />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f3d39,#109f83)]" aria-label={`${placeholderLabel}: ${label}`} />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-copad-deep/85 via-copad-deep/5 to-transparent" aria-hidden="true" />
      <figcaption className="absolute inset-x-0 bottom-0 p-7 text-white">
        {!src && <span className="text-[10px] font-black tracking-[0.18em] text-white/60 uppercase">{placeholderLabel}</span>}
        <p className="mt-2 max-w-md text-xl leading-snug font-bold">{label}</p>
      </figcaption>
    </figure>
  );
}

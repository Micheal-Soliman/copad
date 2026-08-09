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
    <figure className="group relative aspect-[4/3] min-h-0 overflow-hidden rounded-[1.5rem] bg-copad-deep shadow-[0_20px_50px_rgba(15,61,57,.16)] sm:aspect-[4/5] sm:min-h-[420px] sm:rounded-[2rem] sm:shadow-[0_26px_70px_rgba(15,61,57,.18)]">
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
      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
        {!src && <span className="text-[10px] font-black tracking-[0.18em] text-white/60 uppercase">{placeholderLabel}</span>}
        <p className="mt-2 max-w-md text-lg leading-snug font-bold sm:text-xl">{label}</p>
      </figcaption>
    </figure>
  );
}

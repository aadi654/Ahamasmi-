"use client";

import Image, { ImageProps } from "next/image";
import { SyntheticEvent } from "react";

type ProtectedImageProps = ImageProps & {
  wrapperClassName?: string;
  watermark?: string | false | {
    text: string;
    variant?: "corner" | "repeating";
  };
};

const imageProtectionStyle = {
  userSelect: "none",
  WebkitTouchCallout: "none",
  WebkitUserDrag: "none",
} as const;

const preventImageAction = (event: SyntheticEvent) => {
  event.preventDefault();
};

const getWatermarkConfig = (watermark: ProtectedImageProps["watermark"]) => {
  if (!watermark) return null;
  return typeof watermark === "string" ? { text: watermark, variant: "corner" as const } : watermark;
};

export const ProtectedImage = ({
  wrapperClassName = "",
  watermark,
  className = "",
  style,
  onContextMenu,
  onDragStart,
  fill,
  alt,
  ...imageProps
}: ProtectedImageProps) => {
  const watermarkConfig = getWatermarkConfig(watermark);

  return (
    <span
      className={`${fill ? "absolute inset-0" : "relative inline-block max-w-full"} select-none [user-select:none] [-webkit-touch-callout:none] ${wrapperClassName}`}
      onContextMenu={preventImageAction}
      onDragStart={preventImageAction}
    >
      <Image
        {...imageProps}
        alt={alt}
        fill={fill}
        draggable={false}
        onContextMenu={(event) => {
          preventImageAction(event);
          onContextMenu?.(event);
        }}
        onDragStart={(event) => {
          preventImageAction(event);
          onDragStart?.(event);
        }}
        className={`select-none [-webkit-touch-callout:none] ${className}`}
        style={{ ...imageProtectionStyle, ...style }}
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0" />
      {watermarkConfig?.variant === "repeating" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex rotate-[-18deg] select-none flex-wrap items-center justify-center gap-x-12 gap-y-8 overflow-hidden text-[0.62rem] font-medium uppercase tracking-[0.22em] text-foreground/14"
        >
          {Array.from({ length: 12 }, (_, index) => (
            <span key={index}>{watermarkConfig.text}</span>
          ))}
        </span>
      )}
      {watermarkConfig?.variant !== "repeating" && watermarkConfig && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 right-3 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-foreground/28"
        >
          {watermarkConfig.text}
        </span>
      )}
    </span>
  );
};

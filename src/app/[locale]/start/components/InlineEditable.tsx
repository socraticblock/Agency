"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export function InlineEditable({
  value,
  onChange,
  placeholder = "",
  multiline = false,
  className = "",
  style,
  editable = true,
  inputMode,
  fallbackIfEmpty = "",
  showFallbackIndicator = false,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** When false, static text (e.g. read-only preview elsewhere). */
  editable?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  /** Shown when value is empty (e.g. EN fallback while editing GE). */
  fallbackIfEmpty?: string;
  /** Amber dot when displaying fallback (refinement brief §2.3). */
  showFallbackIndicator?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useLayoutEffect(() => {
    if (!editing || !editable) return;
    const el = multiline ? textareaRef.current : inputRef.current;
    if (!el) return;
    el.focus();
    const len = el.value.length;
    try {
      el.setSelectionRange(0, len);
    } catch {
      /* setSelectionRange not on all input types */
    }
  }, [editing, editable, multiline]);

  const endEdit = useCallback(() => setEditing(false), []);

  const usingFallback = !value.trim() && Boolean(fallbackIfEmpty?.trim());
  const displayText = value.trim()
    ? value
    : fallbackIfEmpty?.trim() || placeholder || "—";

  if (!editable) {
    return (
      <span className={className} style={style}>
        {displayText}
        {showFallbackIndicator && usingFallback ? (
          <span
            className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-500 align-middle"
            title="Georgian missing — showing English"
            aria-hidden
          />
        ) : null}
      </span>
    );
  }

  const inputStyle: React.CSSProperties = {
    ...style,
    color: style?.color ?? "inherit",
    fontFamily: style?.fontFamily,
    fontWeight: style?.fontWeight,
    fontSize: style?.fontSize,
    lineHeight: style?.lineHeight ?? 1.5,
  };

  if (editing) {
    if (multiline) {
      return (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={endEdit}
          className={`inline-editable-input ${className}`}
          style={inputStyle}
          rows={4}
          aria-label={placeholder || "Edit text"}
        />
      );
    }
    return (
      <input
        ref={inputRef}
        type="text"
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={endEdit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            endEdit();
          }
        }}
        className={`inline-editable-input ${className}`}
        style={inputStyle}
        aria-label={placeholder || "Edit text"}
      />
    );
  }

  return (
    <span
      role="button"
      tabIndex={0}
      className={`inline-editable-display ${className}`}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        setEditing(true);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setEditing(true);
        }
      }}
    >
      {displayText}
      {showFallbackIndicator && usingFallback ? (
        <span
          className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-500 align-middle"
          title="Georgian missing — showing English"
          aria-hidden
        />
      ) : null}
    </span>
  );
}

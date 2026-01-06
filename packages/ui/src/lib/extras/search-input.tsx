"use client";

import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";
import { SearchIcon, X } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { useDebounce } from "use-debounce";

export interface SearchInputProperties extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void;
  delay?: number;
  className?: string;
  initialValue?: string;
  showClear?: boolean;
  minLength?: number;
  triggerOnMount?: boolean;
  onClear?: () => void;
  /**
   * Optional external ref to the underlying input.
   */
  inputRef?: RefObject<HTMLInputElement>;
}

/**
 * Simple, robust SearchInput component.
 *
 * - Works controlled (pass `value`) or uncontrolled (`initialValue` / `defaultValue`).
 * - Debounces calls to `onSearch`.
 * - Calls `onSearch` immediately on Enter.
 * - Clears on Escape or when clear button is clicked.
 */
export function SearchInput({
  placeholder = "Search...",
  onSearch,
  delay = 300,
  className = "",
  initialValue = "",
  value,
  defaultValue,
  showClear = false,
  minLength = 0,
  triggerOnMount = false,
  onClear,
  inputRef,
  onChange,
  ...rest
}: SearchInputProperties) {
  const isControlled = value !== undefined;

  const [internalQuery, setInternalQuery] = useState<string>(() =>
    isControlled
      ? (value as string)
      : ((defaultValue as string) ?? initialValue ?? ""),
  );

  const localReference = useRef<HTMLInputElement | null>(null);
  const referenceToUse = inputRef ?? localReference;

  const currentValue =
    (isControlled ? ((value as string) ?? "") : internalQuery) ?? "";

  const [debouncedQuery] = useDebounce(currentValue, delay);

  const mountedReference = useRef(false);
  const isUserTyping = useRef(false);

  useEffect(() => {
    if (!isUserTyping.current && !isControlled) {
      setInternalQuery(initialValue ?? "");
    }
  }, [initialValue, isControlled]);

  /**
   * Avoid re-triggering search due to unstable onSearch function identity from parents.
   * We store the latest onSearch in a ref and only depend on the debouncedQuery and config values.
   */
  const onSearchReference = useRef<SearchInputProperties["onSearch"]>(onSearch);
  useEffect(() => {
    onSearchReference.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    const searchFunction = onSearchReference.current;
    if (!searchFunction) {
      mountedReference.current = true;
      return;
    }

    if (!mountedReference.current) {
      mountedReference.current = true;
      if (
        triggerOnMount &&
        (debouncedQuery.length >= minLength || debouncedQuery.length === 0)
      ) {
        searchFunction?.(debouncedQuery);
      }
      return;
    }

    if (debouncedQuery.length >= minLength || debouncedQuery.length === 0) {
      searchFunction?.(debouncedQuery);
    }
    // Intentionally exclude onSearch from deps to prevent effect from firing on every parent render
  }, [debouncedQuery, minLength, triggerOnMount]);

  useEffect(() => {
    if (isControlled) {
      setInternalQuery((value as string) ?? "");
    }
  }, [value, isControlled]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    isUserTyping.current = true;
    if (isControlled) {
      onChange?.(event);
    } else {
      setInternalQuery(event.target.value);
      onChange?.(event);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearchReference.current?.(currentValue);
    } else if (event.key === "Escape") {
      clear();
    }

    rest.onKeyDown?.(event as any);
  };

  const clear = () => {
    if (isControlled) {
      const event_ = {
        target: { value: "" },
      } as unknown as ChangeEvent<HTMLInputElement>;
      onChange?.(event_);
    } else {
      setInternalQuery("");
    }

    onClear?.();
    referenceToUse.current?.focus();
    onSearchReference.current?.("");
  };

  return (
    <div className={cn("relative w-full", className)}>
      <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
      <Input
        {...rest}
        ref={referenceToUse as any}
        type="search"
        placeholder={placeholder}
        className={cn(
          "rounded-sm border border-black/10 pr-4 pl-10 shadow-none",
          className,
        )}
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        aria-label={rest["aria-label"] ?? placeholder}
      />
      {showClear && currentValue.length > 0 && (
        <button
          type="button"
          aria-label="Clear search"
          title="Clear"
          onClick={clear}
          className="text-muted-foreground hover:bg-muted/10 absolute top-1/2 right-2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded bg-transparent"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

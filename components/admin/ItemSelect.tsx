"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { getItemImage } from "./giftcode/GetItemImage";

interface IItem {
    id: number;
    name: string;
    iconId: number;
}

interface ItemSelectProps {
    items: IItem[];
    value?: number;
    onChange: (item: IItem) => void;
    listSelect?: IItem[];
}

const MAX_DISPLAY_ITEMS = 15;

export default function ItemSelect({
    items,
    value,
    onChange,
    listSelect = [],
}: ItemSelectProps) {
    const [open, setOpen] = useState(false);
    const [keyword, setKeyword] = useState("");

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    /**
     * Item đang được chọn
     */
    const selectedItem = useMemo(() => {
        return items.find((item) => item.id === value);
    }, [items, value]);

    /**
     * Tạo Set ID của những item đã được add
     *
     * Set giúp kiểm tra item đã tồn tại nhanh hơn:
     * selectedIds.has(item.id)
     */
    const selectedIds = useMemo(() => {
        return new Set(listSelect.map((item) => item.id));
    }, [listSelect]);

    /**
     * Filter + ưu tiên item đã được add
     *
     * Quy trình:
     * 1. Search theo name hoặc ID
     * 2. Item đã add đưa lên đầu
     * 3. Item chưa add đưa phía sau
     * 4. Chỉ render tối đa 15 item
     */
    const displayItems = useMemo(() => {
        const search = keyword.trim().toLowerCase();

        const filteredItems = !search
            ? items
            : items.filter((item) => {
                return (
                    item.name.toLowerCase().includes(search) ||
                    String(item.id).includes(search)
                );
            });

        const selectedItems = filteredItems.filter((item) =>
            selectedIds.has(item.id)
        );

        const otherItems = filteredItems.filter(
            (item) => !selectedIds.has(item.id)
        );

        return [...selectedItems, ...otherItems].slice(
            0,
            MAX_DISPLAY_ITEMS
        );
    }, [items, keyword, selectedIds]);

    /**
     * Đóng dropdown khi click bên ngoài
     */
    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (
                containerRef.current &&
                !containerRef.current.contains(target)
            ) {
                setOpen(false);
                setKeyword("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    /**
     * Nhấn ESC để đóng
     */
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
                setKeyword("");
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    /**
     * Auto focus search khi mở dropdown
     */
    useEffect(() => {
        if (open) {
            requestAnimationFrame(() => {
                inputRef.current?.focus();
            });
        }
    }, [open]);

    /**
     * Chọn item
     */
    const handleSelect = (item: IItem) => {
        onChange(item);
        setOpen(false);
        setKeyword("");
    };

    /**
     * Mở / đóng dropdown
     */
    const handleToggle = () => {
        setOpen((prev) => {
            const next = !prev;

            if (!next) {
                setKeyword("");
            }

            return next;
        });
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full"
        >
            {/* ================= SELECT BUTTON ================= */}
            <button
                type="button"
                onClick={handleToggle}
                aria-haspopup="listbox"
                aria-expanded={open}
                className="
                    h-10.5
                    flex w-full
                    items-center
                    justify-between
                    rounded-lg
                    border border-gray-200
                    bg-white
                    px-3 py-1
                    text-sm
                    shadow-sm
                    transition
                    hover:border-gray-300
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-100
                "
            >
                {selectedItem ? (
                    <div className="flex min-w-0 items-center gap-3">
                        {/* Icon */}
                        <div
                            className="
                                flex
                                h-8 w-8
                                shrink-0
                                items-center
                                justify-center
                                overflow-hidden
                                rounded-md
                                bg-gray-100
                            "
                        >
                            <img
                                src={getItemImage(selectedItem.iconId)}
                                alt={selectedItem.name}
                                width={32}
                                height={32}
                                className="h-8 w-8 object-contain"
                                onError={(e) => {
                                    e.currentTarget.src = "/images/item-default.png";
                                }}
                            />
                        </div>

                        {/* Info */}
                        <div className="flex min-w-0 items-center gap-4 text-left">
                            <p className="truncate font-medium text-gray-800">
                                {selectedItem.name}
                            </p>

                            <p className="shrink-0 text-xs text-gray-400">
                                ID: {selectedItem.id}
                            </p>
                        </div>
                    </div>
                ) : (
                    <span className="text-gray-400">
                        Chọn item...
                    </span>
                )}

                <ChevronDown
                    size={18}
                    className={`
                        shrink-0
                        text-gray-400
                        transition-transform
                        ${open ? "rotate-180" : ""}
                    `}
                />
            </button>

            {/* ================= DROPDOWN ================= */}
            {open && (
                <div
                    className="
                        absolute
                        left-0
                        top-full
                        z-50
                        mt-2
                        w-full
                        overflow-hidden
                        rounded-xl
                        border border-gray-200
                        bg-white
                        shadow-[0_4px_20px_rgba(0,0,0,0.10)]
                    "
                >
                    {/* ================= SEARCH ================= */}
                    <div className="border-b border-gray-100 p-2">
                        <div className="relative">
                            <Search
                                size={17}
                                className="
                                    absolute
                                    left-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                "
                            />

                            <input
                                ref={inputRef}
                                type="text"
                                value={keyword}
                                onChange={(e) => {
                                    setKeyword(e.target.value);
                                }}
                                placeholder="Tìm item theo tên hoặc ID..."
                                className="
                                    w-full
                                    rounded-lg
                                    border border-gray-200
                                    bg-gray-50
                                    py-2
                                    pl-9
                                    pr-3
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-blue-400
                                    focus:bg-white
                                "
                            />
                        </div>
                    </div>

                    {/* ================= LIST ================= */}
                    <div
                        className="
                            max-h-[420px]
                            overflow-y-auto
                            p-1
                        "
                        role="listbox"
                    >
                        {displayItems.length > 0 ? (
                            displayItems.map((item) => {
                                const selected = item.id === value;
                                const isAdded = selectedIds.has(item.id);

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        role="option"
                                        aria-selected={selected}
                                        onClick={() => handleSelect(item)}
                                        className={`
                                            flex
                                            w-full
                                            cursor-pointer
                                            items-center
                                            gap-3
                                            rounded-lg
                                            px-3
                                            py-2
                                            text-left
                                            transition

                                            hover:bg-gray-50

                                            ${selected
                                                ? "bg-blue-50"
                                                : ""
                                            }

                                            ${isAdded
                                                ? "bg-[#8bc6ff54]"
                                                : ""
                                            }

                                            ${selected && isAdded
                                                ? "bg-blue-100"
                                                : ""
                                            }
                                        `}
                                    >
                                        {/* ================= ICON ================= */}
                                        <div
                                            className="
                                                flex
                                                h-9 w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                overflow-hidden
                                                rounded-md
                                                bg-gray-100
                                            "
                                        >
                                            <img
                                                src={getItemImage(item.iconId)}
                                                alt={item.name}
                                                width={32}
                                                height={32}
                                                className="
                                                    h-8
                                                    w-8
                                                    object-contain
                                                "
                                                onError={(e) => {
                                                    e.currentTarget.src =
                                                        "/images/item-default.png";
                                                }}
                                            />
                                        </div>

                                        {/* ================= INFO ================= */}
                                        <div className="min-w-0 flex-1">
                                            <p
                                                className="
                                                    truncate
                                                    text-sm
                                                    font-medium
                                                    text-gray-800
                                                "
                                            >
                                                {item.name}
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                ID: {item.id}
                                            </p>
                                        </div>

                                        {/* ================= ADDED ================= */}
                                        {isAdded && !selected && (
                                            <span
                                                className="
                                                    shrink-0
                                                    rounded-full
                                                    bg-blue-100
                                                    px-2
                                                    py-0.5
                                                    text-[10px]
                                                    font-medium
                                                    text-blue-600
                                                "
                                            >
                                                Đã thêm
                                            </span>
                                        )}

                                        {/* ================= SELECTED ================= */}
                                        {selected && (
                                            <Check
                                                size={17}
                                                className="
                                                    shrink-0
                                                    text-blue-500
                                                "
                                            />
                                        )}
                                    </button>
                                );
                            })
                        ) : (
                            <div
                                className="
                                    py-8
                                    text-center
                                    text-sm
                                    text-gray-400
                                "
                            >
                                Không tìm thấy item
                            </div>
                        )}
                    </div>

                    {/* ================= FOOTER ================= */}
                    <div className="border-t border-gray-100 px-3 py-2">
                        <p className="text-xs text-gray-400">
                            Hiển thị{" "}
                            <span className="font-medium text-gray-500">
                                {displayItems.length}
                            </span>{" "}
                            item
                            {keyword
                                ? " phù hợp"
                                : ` đầu tiên trong ${items.length}`}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
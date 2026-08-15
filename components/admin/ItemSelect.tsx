"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

interface IItem {
    id: number;
    name: string;
    iconId: number;
}

interface ItemSelectProps {
    items: IItem[];
    value?: number;
    onChange: (item: IItem) => void;
}

export default function ItemSelect({
    items,
    value,
    onChange,
}: ItemSelectProps) {
    const [open, setOpen] = useState(false);
    const [keyword, setKeyword] = useState("");

    const selectedItem = useMemo(() => {
        return items.find((item) => item.id === value);
    }, [items, value]);

    // Chỉ lấy 15 item để render
    const displayItems = useMemo(() => {
        const search = keyword.trim().toLowerCase();

        if (!search) {
            return items.slice(0, 15);
        }

        return items
            .filter((item) => {
                return (
                    item.name.toLowerCase().includes(search) ||
                    String(item.id).includes(search)
                );
            })
            .slice(0, 15);
    }, [items, keyword]);

    return (
        <div className="relative w-full">
            {/* Selected */}
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="
                    h-10.5
                    flex w-full items-center justify-between
                    rounded-lg border border-gray-200
                    bg-white px-3 py-1
                    text-sm
                    shadow-sm
                    hover:border-gray-300
                "
            >
                {selectedItem ? (
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                            {selectedItem.iconId}
                        </div>

                        <div className="text-left flex justify-center items-center gap-4">
                            <p className="font-medium text-gray-800">
                                {selectedItem.name}
                            </p>

                            <p className="text-xs text-gray-400">
                                ID: {selectedItem.id}
                            </p>
                        </div>
                    </div>
                ) : (
                    <span className="text-gray-400 ">
                        Chọn item...
                    </span>
                )}

                <ChevronDown
                    size={18}
                    className="text-gray-400"
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    className="
                        absolute left-0 top-full z-50 mt-2
                        w-full
                        overflow-hidden
                        rounded-xl
                        border border-gray-200
                        bg-white
                        shadow-[0_4px_20px_rgba(0,0,0,0.10)]
                    "
                >
                    {/* Search */}
                    <div className="border-b border-gray-100 p-2">
                        <div className="relative">
                            <Search
                                size={17}
                                className="
                                    absolute left-3 top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                "
                            />

                            <input
                                type="text"
                                value={keyword}
                                onChange={(e) =>
                                    setKeyword(e.target.value)
                                }
                                placeholder="Tìm item theo tên hoặc ID..."
                                autoFocus
                                className="
                                    w-full
                                    rounded-lg
                                    border border-gray-200
                                    bg-gray-50
                                    py-2 pl-9 pr-3
                                    text-sm
                                    outline-none
                                    focus:border-blue-400
                                    focus:bg-white
                                "
                            />
                        </div>
                    </div>

                    {/* List */}
                    <div className="max-h-[420px] overflow-y-auto p-1">
                        {displayItems.length > 0 ? (
                            displayItems.map((item) => {
                                const selected = item.id === value;

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => {
                                            onChange(item);
                                            setOpen(false);
                                            setKeyword("");
                                        }}
                                        className={`
                                            cursor-pointer
                                            flex w-full
                                            items-center gap-3
                                            rounded-lg
                                            px-3 py-2
                                            text-left
                                            transition
                                            hover:bg-gray-50
                                            ${selected
                                                ? "bg-blue-50"
                                                : ""
                                            }
                                        `}
                                    >
                                        {/* Icon */}
                                        <div
                                            className="
                                                flex h-9 w-9 shrink-0
                                                items-center justify-center
                                                rounded-md
                                                bg-gray-100
                                                text-xs
                                            "
                                        >
                                            {item.iconId}
                                        </div>

                                        {/* Info */}
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-800">
                                                {item.name}
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                ID: {item.id}
                                            </p>
                                        </div>

                                        {/* Check */}
                                        {selected && (
                                            <Check
                                                size={17}
                                                className="shrink-0 text-blue-500"
                                            />
                                        )}
                                    </button>
                                );
                            })
                        ) : (
                            <div className="py-8 text-center text-sm text-gray-400">
                                Không tìm thấy item
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-100 px-3 py-2">
                        <p className="text-xs text-gray-400">
                            Hiển thị {displayItems.length} item
                            {keyword
                                ? " phù hợp"
                                : " đầu tiên"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
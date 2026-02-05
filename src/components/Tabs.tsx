"use client";

import { useState } from "react";

export type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

export default function Tabs({ items }: { items: TabItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  return (
    <div>
      <div className="flex gap-2 border-b border-white/10">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={`px-4 py-2 text-sm transition ${
              active === item.id
                ? "border-b-2 border-[var(--accent)] text-white"
                : "text-[var(--muted)] hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {items.find((item) => item.id === active)?.content}
      </div>
    </div>
  );
}

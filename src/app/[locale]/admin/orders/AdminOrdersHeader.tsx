"use client";

type Filter = "all" | "pending" | "published";

type Props = {
  ordersCount: number;
  filter: Filter;
  onFilter: (f: Filter) => void;
  onRefresh: () => void;
};

export function AdminOrdersHeader({ ordersCount, filter, onFilter, onRefresh }: Props) {
  return (
    <div className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Genezisi Orders</h1>
            <p className="text-sm text-slate-500">{ordersCount} total orders</p>
          </div>
          <button
            type="button"
            onClick={onRefresh}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Refresh
          </button>
        </div>

        <div className="mt-4 flex gap-2">
          {(["all", "pending", "published"] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => onFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition ${
                filter === f ? "bg-[#1A2744] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

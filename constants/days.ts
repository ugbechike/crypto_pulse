export const days = [
    { label: "1D", value: Date.now() - 86400000 }, // 24 hours ago
    { label: "1W", value: Date.now() - 604800000 }, // 7 days ago
    { label: "1M", value: Date.now() - 2629746000 }, // 30 days ago
    { label: "3M", value: Date.now() - 7776000000 }, // 90 days ago
    { label: "6M", value: Date.now() - 15778476000 }, // 6 months ago
    { label: "ALL", value: Date.now() - 31556952000 }, // 1 year ago (for "ALL")
];
// src/hooks/useTestSeries.js
import { useEffect, useMemo, useState } from "react";
import mocktestService from "../../services/mocktest/mocktestService";

// Helper: debounce hook
function useDebouncedValue(value, delay = 400) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);

    return debounced;
}

export function useTestSeries() {
    const [seriesList, setSeriesList] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedSubCategory, setSelectedSubCategory] = useState("All");

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebouncedValue(search, 450);

    // fetch on mount
    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError(null);

        mocktestService.fetchTestSeries()
            .then((res) => {
                if (!mounted) return;
                const payload = Array.isArray(res) ? res : [res];
                setSeriesList(payload);
                setFiltered(payload);
                setLoading(false);
            })
            .catch((err) => {
                if (!mounted) return;
                setError("Failed to load test series");
                setLoading(false);
                console.error(err);
            });

        return () => {
            mounted = false;
        };
    }, []);

    // categories
    const categories = useMemo(() => {
        const cats = new Set(seriesList.map(s => s.examCategory || "Other"));
        return ["All", ...Array.from(cats)];
    }, [seriesList]);

    // subcategories
    const subCategories = useMemo(() => {
        if (selectedCategory === "All") return [];

        const subs = seriesList
            .filter(s => s.examCategory === selectedCategory)
            .map(s => s.examSubCategory)
            .filter(Boolean);

        return ["All", ...Array.from(new Set(subs))];
    }, [seriesList, selectedCategory]);

    // filtering logic
    useEffect(() => {
        const keyword = (debouncedSearch || "").trim().toLowerCase();
        let result = seriesList;

        if (selectedCategory !== "All") {
            result = result.filter(s => s.examCategory === selectedCategory);
        }

        if (selectedSubCategory !== "All") {
            result = result.filter(s => s.examSubCategory === selectedSubCategory);
        }

        if (keyword) {
            result = result.filter(s =>
                (s.title || "").toLowerCase().includes(keyword) ||
                (s.examCategory || "").toLowerCase().includes(keyword) ||
                (s.examSubCategory || "").toLowerCase().includes(keyword)
            );
        }

        setFiltered(result);
    }, [seriesList, selectedCategory, selectedSubCategory, debouncedSearch]);

    return {
        loading,
        error,
        filtered,
        categories,
        subCategories,
        selectedCategory,
        setSelectedCategory,
        selectedSubCategory,
        setSelectedSubCategory,
        search,
        setSearch,
    };
}

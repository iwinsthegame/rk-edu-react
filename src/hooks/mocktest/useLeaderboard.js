import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import mocktestService from "../../services/mocktest/mocktestService";

export default function useLeaderboard() {
    const { mockTestId } = useParams();
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!mockTestId) return;
        mocktestService
            .fetchLeaderboard(mockTestId, 10) // mockTestId=12, limit=10
            .then((res) => {
                const sorted = res.sort((a, b) => b.percentage - a.percentage);
                setLeaders(sorted);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Leaderboard fetch error:", err);
                setLoading(false);
            });
    }, []);

    return {
        leaders,
        loading,
    };
}

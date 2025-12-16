import { useState, useEffect } from "react";
import mocktestService from "../../services/mocktest/mocktestService";

export const useResult = (attemptId) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (!attemptId) return;

        const getResult = async () => {
            try {
                const data = mocktestService.fetchResult(attemptId);
                setResult(data);
                setLoading(false);

                // trigger chart animation
                setTimeout(() => setAnimate(true), 200);
            } catch (err) {
                setLoading(false);
            }
        };

        getResult();
    }, [attemptId]);

    return { result, loading, animate };
};

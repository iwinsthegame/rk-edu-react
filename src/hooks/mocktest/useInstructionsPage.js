import { useEffect, useState } from "react";
import mocktestService from "../../services/mocktest/mocktestService";

export const useInstructionsPage = (mocktestId) => {
    const [instruction, setInstruction] = useState(null);


    const symbolIcons = {
        answered: " 🟩",
        not_answered: "🟥",
        marked: "🟪",
        marked_and_answered: "🟦",
        not_visited: "⬜",
        review: "🔁",
        warning: "⚠️",
        info: "ℹ️",
        default: "🟢",
    };




    useEffect(() => {
        if (!mocktestId) return;

        mocktestService.getInstructionsByMocktestId(mocktestId)
            .then((res) => setInstruction(res.data))
            .catch(console.error);
    }, [mocktestId]);

    return {
        instruction,
        symbolIcons,
    };
};

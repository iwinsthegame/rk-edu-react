import { useEffect, useState } from "react";
import mocktestService from "../../services/mocktest/mocktestService";

export const useMocktest = (seriesId) => {
    const [mocktests, setMocktests] = useState([]);

    useEffect(() => {
        if (!seriesId) return;

        mocktestService.getMockTestsBySeriesId(seriesId)
            .then((res) => setMocktests(res.data))
            .catch(console.error);
    }, [seriesId]);

    const openInstructions = (mockId) => {
        const features = `
      width=${window.screen.availWidth},
      height=${window.screen.availHeight},
      left=0,
      top=0,
      fullscreen=yes,
      resizable=yes,
      scrollbars=yes
    `;

        const newWin = window.open(
            `/instructions/mocktest/${mockId}`,
            "_blank",
            features
        );

        if (!newWin) {
            alert("Popup blocked! Please allow popups.");
        } else {
            newWin.moveTo(0, 0);
            newWin.resizeTo(
                window.screen.availWidth,
                window.screen.availHeight
            );
        }
    };

    return {
        mocktests,
        openInstructions,
    };
};

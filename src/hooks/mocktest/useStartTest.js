// src/pages/mocktest/hooks/useStartTest.js
import { useEffect, useRef, useState } from 'react';
import mocktestService from "../../services/mocktest/mocktestService";


export default function useStartTest(mocktestIdParam) {
    // prefer explicit param (StartTest.jsx passes mocktestId), fallback to URL
    const mocktestId = mocktestIdParam || getMocktestIdFromUrl();

    // state
    const [loading, setLoading] = useState(true);
    const [mocktest, setMocktest] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [attemptId, setAttemptId] = useState(null);

    const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [answers, setAnswers] = useState({});
    const [marked, setMarked] = useState({});
    const [visited, setVisited] = useState(new Set());

    const [timeLeft, setTimeLeft] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [readyToSubmit, setReadyToSubmit] = useState(false);

    const timerRef = useRef(null);
    const hasAutoSubmitted = useRef(false);
    const attemptStarted = useRef(false);

    // -------- helpers --------
    function getMocktestIdFromUrl() {
        try {
            const parts = window.location.pathname.split('/').filter(Boolean);
            return parts[parts.length - 2] || parts[parts.length - 1] || null;
        } catch {
            return null;
        }
    }

    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');

    // compute palette state for a question (used by StartTest.jsx)
    const getPaletteState = (q) => {
        const qId = q.id;
        const isVisited = visited.has(qId);
        const isAnswered =
            !!answers[qId] && (Array.isArray(answers[qId]) ? answers[qId].length > 0 : true);
        const isMarked = !!marked[qId];
        if (isAnswered && isMarked) return 'answered-marked';
        if (isAnswered) return 'answered';
        if (isMarked) return 'marked';
        if (isVisited && !isAnswered) return 'not-answered';
        return 'not-visited';
    };

    // start attempt (only once)
    useEffect(() => {
        if (!mocktestId) {
            console.warn('useStartTest: mocktestId missing');
            setLoading(false);
            return;
        }

        if (attemptStarted.current) return;
        attemptStarted.current = true;

        (async () => {
            try {
                const res = await mocktestService.startAttempt(mocktestId);
                // service returns res.data usually; handle both shapes
                const attemptData = res?.attemptId ? res : res?.data ? res.data : res;
                const id = attemptData.attemptId || attemptData.id || attemptData.attempt_id || null;
                if (id) setAttemptId(id);
            } catch (err) {
                console.error('startAttempt failed', err);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mocktestId]);

    // fetch mocktest meta (title, duration)
    useEffect(() => {
        if (!mocktestId) return;
        let cancelled = false;

        (async () => {
            try {
                const res = await mocktestService.fetchMocktest(mocktestId);
                const m = res?.data ? res.data : res;
                if (cancelled) return;
                setMocktest(m);
                const duration = m?.durationMinutes ?? m?.duration ?? 60;
                setTimeLeft(duration * 60);
            } catch (err) {
                console.error('fetchMocktest error', err);
            }
        })();

        return () => { cancelled = true; };
    }, [mocktestId]);

    // fetch questions and build subjects
    useEffect(() => {
        if (!mocktestId) return;
        let cancelled = false;

        (async () => {
            try {
                const res = await mocktestService.fetchQuestions(mocktestId);
                // service likely returns res.data — handle both
                const payload = res?.data ? res.data : res;
                const q = Array.isArray(payload) ? payload : payload?.questions || [];

                if (cancelled) return;

                // setQuestions with the fetched array (React state will update on next render)
                setQuestions(q);

                // build grouped subjects array: [{ subject: 'Math', questions: [...] }, ...]
                const grouped = Object.values(
                    q.reduce((acc, question) => {
                        // support either question.subject or question.subjectName
                        const subjectKey = question.subject || question.subjectName || 'General';
                        if (!acc[subjectKey]) acc[subjectKey] = { subject: subjectKey, questions: [] };
                        acc[subjectKey].questions.push(question);
                        return acc;
                    }, {})
                );

                setSubjects(grouped);

                // mark first question visited
                if (q.length) setVisited(new Set([q[0].id]));

                setLoading(false);
            } catch (err) {
                console.error('fetchQuestions error', err);
                setLoading(false);
            }
        })();

        return () => { cancelled = true; };
    }, [mocktestId]);

    // Timer effect
    useEffect(() => {
        if (loading || isPaused) return;
        if (timerRef.current) return;

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;

                    if (!hasAutoSubmitted.current) {
                        hasAutoSubmitted.current = true;
                        alert('Time is up! Auto submitting test...');
                        submitTest();
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
        // note: submitTest is declared below; it's fine — hooks run in order
    }, [loading, isPaused]); // eslint-disable-line

    // fullscreen listener
    useEffect(() => {
        const handler = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handler);
        return () => document.removeEventListener('fullscreenchange', handler);
    }, []);

    const handleFullScreen = () => {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(console.error);
        else document.exitFullscreen();
    };

    const togglePause = () => setIsPaused(prev => !prev);

    // save answer
    const saveAnswerToBackend = async (questionId) => {
        if (!attemptId) return;
        const ans = answers[questionId];
        const arr = Array.isArray(ans) ? ans : ans ? [ans] : [];
        try {
            await mocktestService.saveAnswer(attemptId, questionId, arr);
        } catch (err) {
            console.error('saveAnswer error', err);
        }
    };

    // helpers
    const markVisited = (qId) => setVisited(prev => {
        const copy = new Set(prev);
        copy.add(qId);
        return copy;
    });

    const currentSubject = subjects[currentSubjectIndex];
    const currentQuestion = currentSubject?.questions?.[currentQuestionIndex] ?? null;

    // navigation & selection
    const goToQuestion = (subIdx, qIdx) => {
        const subj = subjects[subIdx];
        if (!subj || !subj.questions || !subj.questions[qIdx]) return;
        setCurrentSubjectIndex(subIdx);
        setCurrentQuestionIndex(qIdx);
        markVisited(subj.questions[qIdx].id);
    };

    const handleSelect = (question, optionId) => {
        const qId = question.id;
        setAnswers(prev => {
            if (question.questionType === 'MULTI_SELECT') {
                const arr = Array.isArray(prev[qId]) ? [...prev[qId]] : [];
                const idx = arr.indexOf(optionId);
                if (idx >= 0) arr.splice(idx, 1);
                else arr.push(optionId);
                return { ...prev, [qId]: arr };
            }
            return { ...prev, [qId]: optionId };
        });
    };

    const clearResponse = () => {
        if (!currentQuestion) return;
        setAnswers(prev => {
            const copy = { ...prev };
            delete copy[currentQuestion.id];
            return copy;
        });
    };

    const toggleMarkForReview = () => {
        if (!currentQuestion) return;
        const qId = currentQuestion.id;
        setMarked(prev => ({ ...prev, [qId]: !prev[qId] }));
    };

    const goNextQuestion = async (isMarkAndNext = false) => {
        if (!currentQuestion) return;

        await saveAnswerToBackend(currentQuestion.id);

        const isLastSub = currentSubjectIndex === subjects.length - 1;
        const isLastQ = currentQuestionIndex === (currentSubject?.questions?.length - 1);

        if (!isLastSub || !isLastQ) {
            if (isLastQ) {
                setCurrentSubjectIndex(prev => prev + 1);
                setCurrentQuestionIndex(0);
            } else {
                setCurrentQuestionIndex(prev => prev + 1);
            }
            return;
        }

        if (!readyToSubmit && !isMarkAndNext) {
            setReadyToSubmit(true);
            return;
        }

        await submitTest();
    };

    const goPrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        } else if (currentSubjectIndex > 0) {
            const prevSub = subjects[currentSubjectIndex - 1];
            setCurrentSubjectIndex(prev => prev - 1);
            setCurrentQuestionIndex(prevSub.questions.length - 1);
        }
    };

    // submit
    const submitTest = async () => {
        if (!attemptId) {
            alert('Attempt ID missing.');
            return;
        }

        try {
            await mocktestService.submitAttempt(attemptId);
            alert('Test submitted successfully!');
            setTimeout(() => window.close(), 500);
        } catch (err) {
            console.error('submit error', err);
            alert('Submission failed. Check console.');
        }
    };

    // expose values + handlers (names match StartTest.jsx)
    return {
        loading,
        questions,
        mocktests: mocktest,
        subjects,
        currentSubjectIndex,
        currentQuestionIndex,
        currentQuestion,
        minutes,
        seconds,
        isFullscreen,
        isPaused,
        answers,
        visited,
        marked,
        readyToSubmit,

        handleFullScreen,
        togglePause,
        handleSelect,
        clearResponse,
        toggleMarkForReview,
        goPrevQuestion,
        goNextQuestion,
        goToQuestion,
        submitTest,
        getPaletteState,
        markVisited,
    };
}

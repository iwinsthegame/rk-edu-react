import React, { useEffect, useState } from "react";
import "./discussion.css";
import { API_BASE_URL } from "../../api/axiosClient";

const PAGE_SIZE = 5;

export default function DiscussionPage({ entityType, entityId }) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState(false);

    useEffect(() => {
        loadDiscussions();
    }, [entityType, entityId, page]);

    const loadDiscussions = () => {
        setLoading(true);

        fetch(
            `${API_BASE_URL}/api/discussion?entityType=${entityType}&entityId=${entityId}`
        )
            .then(res => res.json())
            .then(res => {
                setData(Array.isArray(res) ? res : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const parents = data.filter(d => d.parentId === null).slice(0, page * PAGE_SIZE);
    const replies = data.filter(d => d.parentId !== null);

    return (
        <div className="discussion-page">
            <h2>💬 Discussion & Reviews</h2>

            <CommentBox
                entityType={entityType}
                entityId={entityId}
                onPost={loadDiscussions}
                posting={posting}
                setPosting={setPosting}
            />

            {parents.map(p => (
                <DiscussionCard
                    key={p.id}
                    data={p}
                    replies={replies.filter(r => r.parentId === p.id)}
                    entityType={entityType}
                    entityId={entityId}
                    refresh={loadDiscussions}
                />
            ))}

            {parents.length < data.filter(d => d.parentId === null).length && (
                <button className="load-more" onClick={() => setPage(p => p + 1)}>
                    Load More
                </button>
            )}

            {loading && <div className="loading">Loading...</div>}
        </div>
    );
}

/* ================= POST COMMENT ================= */

function CommentBox({ entityType, entityId, onPost, posting, setPosting }) {
    const [text, setText] = useState("");
    const [rating, setRating] = useState(0);

    // Restore dark mode on refresh
    useEffect(() => {
        const isDark = localStorage.getItem("darkMode") === "true";
        if (isDark) document.body.classList.add("dark");
    }, []);

    const toggleDarkMode = () => {
        document.body.classList.toggle("dark");
        localStorage.setItem(
            "darkMode",
            document.body.classList.contains("dark")
        );
    };

    const submit = () => {
        if (!text.trim()) return;

        setPosting(true);

        fetch(`${API_BASE_URL}/api/discussion`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                entityType,
                entityId,
                content: text,
                rating
            })
        })
            .then(() => {
                setText("");
                setRating(0);
                onPost();
            })
            .finally(() => setPosting(false));
    };

    return (
        <div className="comment-box">
            <button className="dark-toggle" onClick={toggleDarkMode}>
                🌙 Dark Mode
            </button>

            {/* Optional star rating */}
            {/* <StarRating value={rating} onChange={setRating} /> */}

            <textarea
                placeholder="Write your review or doubt..."
                value={text}
                onChange={e => setText(e.target.value)}
            />

            <button disabled={posting} onClick={submit}>
                {posting ? "Posting..." : "Post"}
            </button>
        </div>
    );
}

/* ================= DISCUSSION CARD ================= */

function DiscussionCard({ data, replies, entityType, entityId, refresh }) {
    const [replyText, setReplyText] = useState("");
    const [showReply, setShowReply] = useState(false);

    const reply = () => {
        if (!replyText.trim()) return;

        fetch(`${API_BASE_URL}/api/discussion`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                entityType,
                entityId,
                parentId: data.id,
                content: replyText
            })
        }).then(() => {
            setReplyText("");
            setShowReply(false);
            refresh();
        });
    };

    const upvote = () => {
        fetch(`${API_BASE_URL}/api/discussion/${data.id}/upvote`, {
            method: "POST"
        }).then(refresh);
    };

    return (
        <div className="discussion-card">
            <img
                className="avatar"
                src={data.profileImage ? `${API_BASE_URL}${data.profileImage}` : "https://i.pravatar.cc/40"}
                alt="user"
            />

            <div className="content">
                <div className="meta">
                    <span>User #{data.userId}</span>{" "}
                    <span>
                        {data.createdAt
                            ? new Date(data.createdAt).toLocaleString()
                            : "Earlier"}
                    </span>
                </div>

                <p>{data.content}</p>

                <div className="actions">
                    <button onClick={upvote}>👍 {data.upvotes}</button>
                    <button onClick={() => setShowReply(!showReply)}>
                        Reply
                    </button>
                </div>

                {showReply && (
                    <div className="reply-box">
                        <textarea
                            placeholder="Write a reply..."
                            value={replyText}
                            onChange={e => setReplyText(e.target.value)}
                        />
                        <button onClick={reply}>Reply</button>
                    </div>
                )}

                {replies.map(r => (
                    <div key={r.id} className="reply">
                        <img
                            className="avatar"
                            src={r.profileImage ? `${API_BASE_URL}${r.profileImage}` : "https://i.pravatar.cc/30"}
                            alt="user"
                        />
                        <div>
                            <span>User #{r.userId}</span>
                            <p>{r.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ================= STAR RATING ================= */

function StarRating({ value, onChange }) {
    return (
        <div className="stars">
            {[1, 2, 3, 4, 5].map(i => (
                <span
                    key={i}
                    className={i <= value ? "active" : ""}
                    onClick={() => onChange(i)}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

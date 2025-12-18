import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { user_api } from "../../api/axiosClient";

export default function PyqListPage() {
    const { subCategoryId } = useParams();
    const [pyqs, setPyqs] = useState([]);

    useEffect(() => {
        user_api
            .get(`/pyq/subcategory/${subCategoryId}`)
            .then(res => setPyqs(res.data || []));
    }, [subCategoryId]);

    return (
        <div className="pyq-list-page">
            <h1>Previous Year Question Papers</h1>

            <div className="pyq-grid">
                {pyqs.map(p => (
                    <div className="pyq-card" key={p.id}>
                        <h3>{p.title}</h3>
                        <p>Year: {p.year}</p>

                        <a
                            href={`http://localhost:8080${p.pdfUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-download"
                        >
                            Download PDF
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

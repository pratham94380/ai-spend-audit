import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

function AuditDetails() {
    const { auditId } = useParams();

    const [audit, setAudit] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/audit/${auditId}/`)
        .then((res) => res.json())
        .then((data) => {
            setAudit(data);
        });
    }, [auditId]);

    if (!audit) {
        return <div className="text-white p-10">Loading audit...</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white p-10">
        <h1 className="text-4xl font-bold mb-8">Audit Details</h1>

        <div className="bg-zinc-900 p-6 rounded-xl">
            <p className="mb-4">
            <strong>Email:</strong> {audit.email}
            </p>

            <p className="mb-4">
            <strong>Audit ID:</strong> {audit.audit_id}
            </p>

            <p className="mb-4">
            <strong>Total Monthly Savings:</strong> $
            {audit.output_result.total_monthly_savings}
            </p>

            <p className="mb-4">
            <strong>Total Annual Savings:</strong> $
            {audit.output_result.total_annual_savings}
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Recommendations</h2>

            {audit.output_result.results.map((item, index) => (
            <div key={index} className="bg-zinc-800 p-4 rounded-lg mb-4">
                <p>
                <strong>Tool:</strong> {item.tool}
                </p>

                <p>
                <strong>Plan:</strong> {item.plan}
                </p>

                <p>
                <strong>Recommendation:</strong> {item.recommendation}
                </p>

                <p>
                <strong>Reason:</strong> {item.reason}
                </p>
            </div>
            ))}
        </div>
        </div>
    );
}

export default AuditDetails;

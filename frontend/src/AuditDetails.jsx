import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

function AuditDetails() {
    const { auditId } = useParams();

    const [audit, setAudit] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/audit/${auditId}/`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

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

            <div className="bg-green-600 text-white p-6 rounded-xl mt-6 mb-8">
            <h2 className="text-3xl font-bold">Savings Impact</h2>

            <p className="text-xl mt-4">
                Monthly Delta: $
                {audit.new_result.total_monthly_savings -
                audit.old_result.total_monthly_savings}
            </p>

            <p className="text-xl mt-2">
                Annual Delta: $
                {audit.new_result.total_annual_savings -
                audit.old_result.total_annual_savings}
            </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="bg-zinc-800 p-4 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Old Audit</h2>

                <p>Monthly Savings: ${audit.old_result.total_monthly_savings}</p>

                <p>Annual Savings: ${audit.old_result.total_annual_savings}</p>
            </div>

            <div className="bg-zinc-800 p-4 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Recalculated Audit</h2>

                <p>Monthly Savings: ${audit.new_result.total_monthly_savings}</p>

                <p>Annual Savings: ${audit.new_result.total_annual_savings}</p>
            </div>
            </div>

            <h2 className="text-2xl font-bold mt-10 mb-6">
            Recommendation Changes
            </h2>

            {audit.old_result.results.map((oldItem, index) => {
            const newItem = audit.new_result.results[index];

            return (
                <div key={index} className="bg-zinc-800 p-6 rounded-xl mb-6">
                <p className="mb-2">
                    <strong>Tool:</strong> {oldItem.tool}
                </p>

                <p className="mb-4">
                    <strong>Plan:</strong> {oldItem.plan}
                </p>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                    <h3 className="text-lg font-semibold mb-2">
                        Old Recommendation
                    </h3>

                    <p>{oldItem.recommendation}</p>

                    <p className="text-sm text-zinc-400 mt-2">{oldItem.reason}</p>
                    </div>

                    <div>
                    <h3 className="text-lg font-semibold mb-2">
                        Updated Recommendation
                    </h3>

                    <p>{newItem.recommendation}</p>

                    <p className="text-sm text-zinc-400 mt-2">{newItem.reason}</p>
                    </div>
                </div>
                </div>
            );
            })}
        </div>
        </div>
    );
}

export default AuditDetails;

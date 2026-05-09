import { useEffect, useState } from "react";

function App() {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("auditForm");

    return savedData
      ? JSON.parse(savedData)
      : {
          tool: "",
          plan: "",
          spend: "",
          seats: "",
          useCase: "",
        };
  });

  useEffect(() => {
    localStorage.setItem("auditForm", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [auditResult, setAuditResult] = useState(null);

  const generateAudit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/audit/", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      setAuditResult(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-zinc-900 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-2">AI Spend Audit</h1>

        <p className="text-zinc-400 mb-8">
          Analyze your AI tool spending and discover savings.
        </p>

        <div className="space-y-5">
          <div>
            <label className="block mb-2 text-sm">AI Tool</label>

            <select
              name="tool"
              value={formData.tool}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
            >
              <option value="">Select Tool</option>
              <option>ChatGPT</option>
              <option>Claude</option>
              <option>Cursor</option>
              <option>GitHub Copilot</option>
              <option>Gemini</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm">Plan</label>

            <input
              type="text"
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              placeholder="e.g. Plus / Team"
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Monthly Spend ($)</label>

            <input
              type="number"
              name="spend"
              value={formData.spend}
              onChange={handleChange}
              placeholder="100"
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Number of Seats</label>

            <input
              type="number"
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              placeholder="5"
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Primary Use Case</label>

            <select
              name="useCase"
              value={formData.useCase}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
            >
              <option value="">Select Use Case</option>
              <option>Coding</option>
              <option>Writing</option>
              <option>Research</option>
              <option>Data Analysis</option>
              <option>Mixed</option>
            </select>
          </div>

          <button
            onClick={generateAudit}
            className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition"
          >
            Generate Audit
          </button>

          {auditResult && (
            <div className="mt-8 bg-zinc-800 p-6 rounded-2xl border border-zinc-700">
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Audit Results</h2>

                <p className="text-zinc-400 mt-1">
                  AI spending analysis and optimization recommendations.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-zinc-900 p-4 rounded-xl">
                  <p className="text-zinc-400 text-sm">Monthly Savings</p>

                  <h3 className="text-3xl font-bold text-green-400 mt-2">
                    ${auditResult.monthly_savings}
                  </h3>
                </div>

                <div className="bg-zinc-900 p-4 rounded-xl">
                  <p className="text-zinc-400 text-sm">Annual Savings</p>

                  <h3 className="text-3xl font-bold text-green-400 mt-2">
                    ${auditResult.annual_savings}
                  </h3>
                </div>
              </div>

              <div className="bg-zinc-900 p-5 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Recommendation</h3>

                <p className="mb-3">{auditResult.recommendation}</p>

                <p className="text-zinc-400 text-sm">{auditResult.reason}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

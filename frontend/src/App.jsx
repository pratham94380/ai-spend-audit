import { useEffect, useState } from "react";
import { TOOL_OPTIONS } from "./toolOptions";

function App() {
  const [tools, setTools] = useState(() => {
    const savedData = localStorage.getItem("auditTools");

    return savedData
      ? JSON.parse(savedData)
      : [
          {
            tool: "",
            plan: "",
            spend: "",
            seats: "",
            useCase: "",
          },
        ];
  });

  const [auditResult, setAuditResult] = useState(null);

  const [teamSize, setTeamSize] = useState(
    localStorage.getItem("teamSize") || "",
  );

  useEffect(() => {
    localStorage.setItem("auditTools", JSON.stringify(tools));
  }, [tools]);

  useEffect(() => {
    localStorage.setItem("teamSize", teamSize);
  }, [teamSize]);

  const handleChange = (index, e) => {
    const updatedTools = [...tools];

    updatedTools[index][e.target.name] = e.target.value;

    setTools(updatedTools);
  };

  const addTool = () => {
    setTools([
      ...tools,
      {
        tool: "",
        plan: "",
        spend: "",
        seats: "",
        useCase: "",
      },
    ]);
  };

  const removeTool = (index) => {
    if (tools.length === 1) return;

    const updatedTools = tools.filter((_, i) => i !== index);

    setTools(updatedTools);
  };

  const generateAudit = async () => {
    for (const tool of tools) {
      if (!tool.tool || !tool.plan || !tool.spend || !tool.seats || !tool.useCase) {
        alert("Please fill all fields before generating audit.");
        return;
      }
    }

    try {
      const response = await fetch(
        "https://ai-spend-audit-3kp0.onrender.com/api/audit/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            tools,
            teamSize,
          }),
        },
      );

      const data = await response.json();

      setAuditResult(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-zinc-900 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-2">AI Spend Audit</h1>

        <p className="text-zinc-400 mb-8">
          Analyze your AI tool spending and discover savings.
        </p>

        <div className="mb-8">
          <label className="block mb-2 text-sm">Total Team Size</label>
          <input
            type="number"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            placeholder="e.g. 10"
            className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
          />
        </div>

        <div className="space-y-8">
          {tools.map((toolData, index) => (
            <div
              key={index}
              className="bg-zinc-800 p-5 rounded-2xl border border-zinc-700"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold">Tool #{index + 1}</h2>
                <button
                  onClick={() => removeTool(index)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block mb-2 text-sm">AI Tool</label>
                  <select
                    name="tool"
                    value={toolData.tool}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700"
                  >
                    <option value="">Select Tool</option>
                    {Object.keys(TOOL_OPTIONS).map((tool) => (
                      <option key={tool} value={tool}>
                        {tool}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm">Plan</label>
                  <select
                    name="plan"
                    value={toolData.plan}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700"
                  >
                    <option value="">Select Plan</option>
                    {(TOOL_OPTIONS[toolData.tool] || []).map((plan) => (
                      <option key={plan} value={plan}>
                        {plan}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm">
                    Monthly Spend ($)
                  </label>

                  <input
                    type="number"
                    name="spend"
                    value={toolData.spend}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Seats</label>
                  <input
                    type="number"
                    name="seats"
                    value={toolData.seats}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Primary Use Case</label>
                  <select
                    name="useCase"
                    value={toolData.useCase}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700"
                  >
                    <option value="">Select Use Case</option>
                    <option>Coding</option>
                    <option>Writing</option>
                    <option>Data</option>
                    <option>Research</option>
                    <option>Mixed</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addTool}
            className="w-full bg-zinc-700 py-3 rounded-xl hover:bg-zinc-600 transition"
          >
            + Add Another Tool
          </button>

          <button
            onClick={generateAudit}
            className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition"
          >
            Generate Full Audit
          </button>

          {auditResult && (
            <div className="mt-8 bg-zinc-800 p-6 rounded-2xl border border-zinc-700">
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Audit Results</h2>

                <p className="text-zinc-400 mt-1">
                  Combined AI spending analysis.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-zinc-900 p-4 rounded-xl">
                  <p className="text-zinc-400 text-sm">Monthly Savings</p>

                  <h3 className="text-3xl font-bold text-green-400 mt-2">
                    ${auditResult.total_monthly_savings}
                  </h3>
                </div>

                <div className="bg-zinc-900 p-4 rounded-xl">
                  <p className="text-zinc-400 text-sm">Annual Savings</p>

                  <h3 className="text-3xl font-bold text-green-400 mt-2">
                    ${auditResult.total_annual_savings}
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                {auditResult.results.map((result, index) => (
                  <div key={index} className="bg-zinc-900 p-5 rounded-xl">
                    <h3 className="text-xl font-semibold mb-2">
                      {result.tool}
                    </h3>

                    <p className="mb-2">{result.recommendation}</p>

                    <p className="text-zinc-400 text-sm mb-3">
                      {result.reason}
                    </p>

                    <p className="text-green-400 font-semibold">
                      Potential Savings: ${result.monthly_savings}/month
                    </p>
                    <div className="w-full bg-zinc-700 rounded-full h-3 mt-4">
                      <div
                        className="bg-green-400 h-3 rounded-full"
                        style={{
                          width: `${Math.min(result.monthly_savings, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

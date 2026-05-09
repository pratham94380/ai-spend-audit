from rest_framework.decorators import api_view
from rest_framework.response import Response

from .pricing_data import PRICING


@api_view(['POST'])
def generate_audit(request):

    data = request.data

    tool = data.get("tool")
    plan = data.get("plan")
    spend = float(data.get("spend", 0))
    seats = int(data.get("seats", 1))

    recommendation = "Your spending looks optimized."
    savings = 0
    reason = "No major inefficiencies detected."

    # Get official price
    official_price = PRICING.get(tool, {}).get(plan)

    if official_price:

        expected_cost = official_price * seats

        # Overspending detection
        if spend > expected_cost:

            savings = round(spend - expected_cost, 2)

            recommendation = f"Reduce spending on {tool}."

            reason = (
                f"You are spending ${spend}, "
                f"while estimated pricing is "
                f"around ${expected_cost}."
            )

        # Team overkill logic
        if seats <= 2 and plan in ["Team", "Business"]:

            recommendation = (
                f"Downgrade from {plan} plan."
            )

            reason = (
                "Small teams usually don't require "
                "higher collaboration plans."
            )

            cheaper_plan = "Plus"

            if tool == "GitHub Copilot":
                cheaper_plan = "Individual"

            cheaper_price = (
                PRICING.get(tool, {}).get(cheaper_plan, 0)
            )

            savings = (
                spend - (cheaper_price * seats)
            )

    return Response({
        "tool": tool,
        "plan": plan,
        "recommendation": recommendation,
        "reason": reason,
        "monthly_savings": round(savings, 2),
        "annual_savings": round(savings * 12, 2)
    })
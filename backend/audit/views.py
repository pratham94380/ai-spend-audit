from rest_framework.decorators import api_view
from rest_framework.response import Response

from .pricing_data import PRICING


@api_view(['POST'])
def generate_audit(request):

    tools = request.data.get("tools", [])

    results = []

    total_monthly_savings = 0

    for item in tools:

        tool = item.get("tool")
        plan = item.get("plan")
        spend = float(item.get("spend", 0))
        seats = int(item.get("seats", 1))

        recommendation = "Your spending looks optimized."
        savings = 0
        reason = "No major inefficiencies detected."

        official_price = PRICING.get(tool, {}).get(plan)

        if official_price:

            expected_cost = official_price * seats


            if spend > expected_cost:

                savings = round(
                    spend - expected_cost,
                    2
                )

                recommendation = (
                    f"Reduce spending on {tool}."
                )

                reason = (
                    f"Current spend is ${spend}, "
                    f"while expected pricing "
                    f"is around ${expected_cost}."
                )

                # Extreme overspending detection
                if spend > expected_cost * 2:

                    recommendation = (
                        f"Critical overspending detected for {tool}."
                    )

                    reason = (
                        "Your current spend is more than "
                        "2x the estimated pricing."
                    )

            if seats <= 2 and plan in [
                "Team",
                "Business"
            ]:

                recommendation = (
                    f"Downgrade from {plan} plan."
                )

                reason = (
                    "Small teams usually don't "
                    "require collaboration plans."
                )

        total_monthly_savings += savings

        results.append({
            "tool": tool,
            "plan": plan,
            "recommendation": recommendation,
            "reason": reason,
            "monthly_savings": savings,
            "annual_savings": savings * 12,
        })

    return Response({
        "results": results,
        "total_monthly_savings":
            round(total_monthly_savings, 2),

        "total_annual_savings":
            round(total_monthly_savings * 12, 2)
    })
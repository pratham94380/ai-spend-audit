from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def generate_audit(request):

    data = request.data

    tool = data.get("tool")
    spend = float(data.get("spend", 0))
    seats = int(data.get("seats", 1))

    recommendation = "Your spending looks reasonable."
    savings = 0

    if tool == "ChatGPT" and seats <= 2 and spend > 40:
        recommendation = "Switch to ChatGPT Plus instead of Team plan."
        savings = spend - 40

    return Response({
        "recommendation": recommendation,
        "monthly_savings": savings
    })
import os
import resend
from django.shortcuts import get_object_or_404
from .models import Audit
from openai import OpenAI

from dotenv import load_dotenv
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .pricing_data import PRICING

load_dotenv()

resend.api_key = os.getenv(
    "RESEND_API_KEY"
)

@api_view(['POST'])
def generate_audit(request):

    tools = request.data.get("tools", [])
    email = request.data.get("email")
    results = []

    total_monthly_savings = 0

    client = None

    if os.getenv("OPENAI_API_KEY"):

        client = OpenAI(
            api_key=os.getenv(
                "OPENAI_API_KEY"
            )
        )

    for item in tools:

        tool = item.get("tool")
        plan = item.get("plan")

        spend = float(
            item.get("spend", 0)
        )

        seats = int(
            item.get("seats", 1)
        )

        recommendation = (
            "Your spending looks optimized."
        )

        savings = 0

        reason = (
            "No major inefficiencies detected."
        )

        official_price = (
            PRICING.get(tool, {})
            .get(plan)
        )

        if official_price:

            expected_cost = (
                official_price * seats
            )

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

    try:

        prompt = f"""
        Generate a short professional AI spend audit summary.

        Monthly savings:
        ${round(total_monthly_savings, 2)}

        Annual savings:
        ${round(total_monthly_savings * 12, 2)}

        Audit Results:
        {results}

        Keep response under 100 words.
        """

        if client:

            response = client.chat.completions.create(

                model="gpt-4o-mini",

                messages=[

                    {
                        "role": "system",

                        "content":
                        "You are an AI spend optimization assistant."
                    },

                    {
                        "role": "user",

                        "content": prompt
                    }
                ]
            )

            summary = (
                response.choices[0]
                .message.content
            )

        else:

            summary = (
                f"Your team could potentially save "
                f"${round(total_monthly_savings, 2)}/month "
                f"and ${round(total_monthly_savings * 12, 2)}/year "
                f"by optimizing AI tooling plans "
                f"and reducing unnecessary spending."
            )

    except Exception:

        summary = (
            f"Your team could potentially save "
            f"${round(total_monthly_savings, 2)}/month "
            f"and ${round(total_monthly_savings * 12, 2)}/year "
            f"by optimizing AI tooling plans "
            f"and reducing unnecessary spending."
        )

    audit = Audit.objects.create(

        email=email,

        input_stack=tools,

        output_result={

            "results": results,

            "summary": summary,

            "total_monthly_savings":
                round(total_monthly_savings, 2),

            "total_annual_savings":
                round(total_monthly_savings * 12, 2)
        },

        pricing_snapshot=PRICING
    )

    return Response({

        "results": results,

        "summary": summary,

        "total_monthly_savings":
            round(total_monthly_savings, 2),

        "total_annual_savings":
            round(total_monthly_savings * 12, 2)
    })

@api_view(['POST'])
def detect_changes(request):

    audits = Audit.objects.all()

    # affected_audits = []
    affected_users = {}

    for audit in audits:

        old_snapshot = audit.pricing_snapshot

        changes = []

        for tool, plans in old_snapshot.items():

            current_tool = PRICING.get(tool, {})

            for plan, old_price in plans.items():

                current_price = (
                    current_tool.get(plan)
                )

                if current_price != old_price:

                    changes.append({

                        "tool": tool,

                        "plan": plan,

                        "old_price": old_price,

                        "new_price": current_price
                    })

        if changes:

            if audit.email not in affected_users:

                affected_users[audit.email] = []

            affected_users[audit.email].append({

                "audit_id": str(
                    audit.audit_id
                ),

                "changes": changes
            })

    for email, audits in affected_users.items():

        audit_html = ""

        for audit_data in audits:

            audit_id = audit_data["audit_id"]

            changes = audit_data["changes"]

            changes_html = ""

            for change in changes:

                changes_html += f"""
                <li>
                    <strong>{change['tool']}</strong>
                    ({change['plan']})
                    changed from
                    ${change['old_price']}
                    to
                    ${change['new_price']}
                </li>
                """

            re_audit_link = (
                f"http://localhost:5173/audit/{audit_id}"
            )

            audit_html += f"""
            <div style="margin-bottom: 30px;">

                <h3>
                    Audit ID:
                    {audit_id}
                </h3>

                <p>
                    Pricing changes detected:
                </p>

                <ul>
                    {changes_html}
                </ul>

                <p>
                    Your previous recommendations may now
                    be outdated.
                </p>

                <a
                    href="{re_audit_link}"
                    style="
                        background: black;
                        color: white;
                        padding: 10px 18px;
                        text-decoration: none;
                        border-radius: 8px;
                        display: inline-block;
                        margin-top: 10px;
                    "
                >
                    Re-run Audit
                </a>

            </div>
            """

        resend.Emails.send({

            "from":
                "onboarding@resend.dev",

            "to":
                email,

            "subject":
                "AI Spend Audit Pricing Changes Detected",

            "html":
                f"""
                <h2>
                    AI Pricing Changes Detected
                </h2>

                <p>
                    Some AI tool pricing changes may affect
                    your previous audits.
                </p>

                {audit_html}
                """
        })
    return Response({

        "affected_users":
            affected_users
    })

@api_view(['GET'])
def get_audit(request, audit_id):

    audit = get_object_or_404(

        Audit,

        audit_id=audit_id
    )

    old_result = audit.output_result

    tools = audit.input_stack

    recalculated_results = []

    recalculated_total = 0

    for item in tools:

        tool = item.get("tool")

        plan = item.get("plan")

        spend = float(
            item.get("spend", 0)
        )

        seats = int(
            item.get("seats", 1)
        )

        recommendation = (
            "Your spending looks optimized."
        )

        savings = 0

        reason = (
            "No major inefficiencies detected."
        )

        official_price = (
            PRICING.get(tool, {})
            .get(plan)
        )

        if official_price:

            expected_cost = (
                official_price * seats
            )

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

        recalculated_total += savings

        recalculated_results.append({

            "tool": tool,

            "plan": plan,

            "recommendation":
                recommendation,

            "reason":
                reason,

            "monthly_savings":
                savings,

            "annual_savings":
                savings * 12
        })

    return Response({

        "audit_id":
            str(audit.audit_id),

        "email":
            audit.email,

        "created_at":
            audit.created_at,

        "old_result":
            old_result,

        "new_result": {

            "results":
                recalculated_results,

            "total_monthly_savings":
                recalculated_total,

            "total_annual_savings":
                recalculated_total * 12
        }
    })
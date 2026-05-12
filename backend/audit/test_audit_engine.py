from django.test import TestCase
from audit.pricing_data import PRICING


class AuditEngineTests(TestCase):

    def test_chatgpt_plus_pricing_exists(self):
        self.assertEqual(
            PRICING["ChatGPT"]["Plus"],
            20
        )

    def test_claude_team_pricing_exists(self):
        self.assertEqual(
            PRICING["Claude"]["Team"],
            30
        )

    def test_cursor_business_pricing_exists(self):
        self.assertEqual(
            PRICING["Cursor"]["Business"],
            40
        )

    def test_github_copilot_business_pricing_exists(self):
        self.assertEqual(
            PRICING["GitHub Copilot"]["Business"],
            19
        )

    def test_gemini_ultra_pricing_exists(self):
        self.assertEqual(
            PRICING["Gemini"]["Ultra"],
            40
        )
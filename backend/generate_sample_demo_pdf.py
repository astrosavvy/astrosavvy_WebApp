import os
import sys

# Ensure UTF-8 output
if sys.platform.startswith('win'):
    sys.stdout.reconfigure(encoding='utf-8')

# Add backend directory to sys.path
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "."))
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "src"))

from src.services.pdf_service import PDFService

def generate_sample_pdf():
    name = "Ananya Sharma"
    gender = "Female"
    dob = "1995-08-24"
    tob = "14:30"
    place = "New Delhi, India"
    
    print(f"🚀 Building Sample PDF for: {name}")
    print(f"   Birth Details: {dob} at {tob} in {place}")

    # Mock Kundli Divisional Placements
    d1_placements = {
        "Aries": ["Mars"],
        "Taurus": ["Venus"],
        "Gemini": [],
        "Cancer": ["Moon"],
        "Leo": ["Sun", "Mercury"],
        "Virgo": ["Rahu"],
        "Libra": ["Jupiter"],
        "Scorpio": [],
        "Sagittarius": [],
        "Capricorn": ["Saturn"],
        "Aquarius": [],
        "Pisces": ["Ketu"],
    }
    
    d9_placements = {
        "Aries": ["Sun"],
        "Taurus": ["Moon"],
        "Gemini": [],
        "Cancer": ["Venus"],
        "Leo": ["Mars"],
        "Virgo": ["Mercury"],
        "Libra": [],
        "Scorpio": ["Jupiter"],
        "Sagittarius": ["Rahu"],
        "Capricorn": ["Saturn"],
        "Aquarius": [],
        "Pisces": ["Ketu"],
    }
    
    d30_placements = {
        "Aries": ["Mars"],
        "Taurus": [],
        "Gemini": ["Venus"],
        "Cancer": ["Moon"],
        "Leo": ["Sun"],
        "Virgo": ["Mercury"],
        "Libra": ["Jupiter"],
        "Scorpio": ["Rahu"],
        "Sagittarius": ["Ketu"],
        "Capricorn": ["Saturn"],
        "Aquarius": [],
        "Pisces": [],
    }

    risk_matrix = [
        ["Venus in Leo (Conjunction)", "Triggers heightened expectations in romance.", "Focus on emotional patience."],
        ["Kuja Dosha (Low)", "Slight impatience during intense discussions.", "Calm reflection before reacting."],
    ]

    dasha_timeline = [
        ["Venus - Moon", "2024 to 2026", "Favorable window for deep relationship harmony and stability."],
        ["Venus - Mars", "2026 to 2027", "Action-oriented period for career growth and joint decisions."],
        ["Venus - Rahu", "2027 to 2030", "Transformative growth and international connection opportunities."]
    ]

    # Sample realistic cosmic analysis text matching precise word targets
    sections = {
        1: "Welcome to your personal Vedic Love Blueprint, Ananya. This sacred analysis maps the planetary alignments present at the moment of your birth in New Delhi, uncovering the deep emotional currents, romantic destiny, and soul connections written in your chart.",
        2: "Disclaimer: This individual astrological analysis is crafted for self-reflection, spiritual growth, and personal empowerment. Astrology highlights inner potentials and planetary timing, while conscious choices shape your relationships.",
        5: "This is your D1 Rashi Birth Chart, the fundamental blueprint of your soul's current life journey, mapping the placement of planets across all twelve astrological houses.",
        6: "As a Virgo Lagna, Ananya, your approach to love is grounded, deeply practical, and analytical. You seek genuine sincerity, emotional reliability, and intellectual alignment in your partner above all else.",
        7: "With Moon placed in Cancer, your emotional core is deeply nurturing, intuitive, and protective. You experience feelings with great intensity and require a partner who honors your emotional depth.",
        8: "The 5th house in your chart reveals your romantic romance language and creative expression. Venusian influences bring grace, artistic flair, and a preference for romantic elegance.",
        9: "Venus in Taurus bestows strong emotional stability, appreciation for physical comfort, and an unwavering commitment to genuine partnership once trust is established.",
        10: "The 7th house rules marriage, long-term commitment, and legal partnerships. Jupiter's aspect here grants protective blessings, bringing a wise, dignified partner into your life.",
        11: "Your spouse profile indicates an individual who is intellectually curious, emotionally grounded, and deeply supportive of your personal ambitions and spiritual growth.",
        12: "The comparative promise between your D1 Rashi chart and D9 Navamsha chart reveals a powerful shift toward emotional fulfillment and marital stability in the second half of life.",
        13: "Navamsha (D9) chart dynamics highlight the underlying spiritual strength of your future marriage, resolving early emotional anxieties into lasting peace.",
        14: "Trimshamsha (D30) analysis reveals potential subconscious shadows and stress triggers. Awareness of these patterns allows you to navigate friction points with conscious maturity.",
        15: "Recurring emotional patterns indicate a tendency to over-analyze relationship dynamics. Practicing emotional surrendering allows love to flow effortlessly.",
        16: "Planetary blockages in your chart are minor, primarily involving fleeting communication misalignments during Retrograde phases. Conscious dialogue easily resolves these phases.",
        17: "Cosmic Red Flags: Beware of suppressing your own emotional needs to maintain surface harmony. Authentic expression is essential for your long-term joy.",
        18: "Empowered Relationship Actions: Focus on open dialogue, shared values, and mutual respect to anchor your romantic partnership.",
        19: "The compatibility and risk matrix above summarizes key planetary friction points alongside empowering practical remedies to maintain harmony.",
        20: "Your overall relationship energy score is high, supported by favorable aspects from Jupiter and Venus across your key partnership houses.",
        21: "The 3-Year Vimshottari Dasha timeline above maps your major romantic windows, highlighting prime opportunities for emotional commitment and milestone events.",
        22: "Pratyantar Dasha sub-minor cycles offer focused timing for key relationship decisions, deep conversations, and shared journeys.",
        23: "Spiritual Mantras & Behavioral Shifts: Reciting sacred Venusian and Moon mantras daily calms emotional turbulence and magnetizes harmonious energy.",
        24: (
            "§Your personalised spiritual remedies\n"
            "❤ Perform morning meditation and chant Om Namah Shivaya daily to maintain inner emotional equilibrium.\n\n"
            "§Your personalised love energy bracelet\n"
            "❤ We highly recommend wearing the sacred Divy Rose Quartz & Amethyst Love Energy Bracelet for emotional balance.\n\n"
            "§Your personalised energised rudraksh\n"
            "❤ 2 Mukhi Rudraksha (Nepali) energised through sacred Vedic consecration rituals.\n\n"
            "§Gem stone recommendations\n"
            "❤ Diamond or White Sapphire recommended for enhancing Venusian grace."
        ),
        25: "In conclusion of your Cosmic Blueprint, Ananya: Trust your intuition, honor your deep capacity for love, and embrace the transformative journey ahead with confidence."
    }

    output_dir = os.path.join(os.path.dirname(__file__), "output")
    os.makedirs(output_dir, exist_ok=True)
    output_pdf_path = os.path.join(output_dir, "Sample_Ananya_Sharma_Love_Report.pdf")

    pdf_service = PDFService()
    pdf_service.build_pdf_report(
        output_path=output_pdf_path,
        sections=sections,
        d1_placements=d1_placements,
        d9_placements=d9_placements,
        d30_placements=d30_placements,
        risk_matrix=risk_matrix,
        dasha_timeline=dasha_timeline,
        client_name=name,
        birth_details=f"{dob} at {tob} in {place}",
        lagna_sign="Virgo",
        navamsa_lagna_sign="Taurus",
        trimsamsha_lagna_sign="Aries",
        client_dob=dob,
        client_tob=tob,
        client_pob=place,
        rudraksha_name="2 Mukhi Rudraksha (Nepali)",
        rudraksha_url="https://www.astrosavvysingh.com/product/2-mukhi-rudraksha-nepali",
    )

    print(f"✨ SUCCESS! Sample PDF generated cleanly at: {output_pdf_path}")
    return output_pdf_path

if __name__ == "__main__":
    generate_sample_pdf()

import os
import re
import uuid
import time
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

client = AsyncIOMotorClient(os.environ["MONGO_URL"])
db = client[os.environ["DB_NAME"]]

PUBLISHED = "published"
DRAFT = "draft"
ARCHIVED = "archived"
CONTENT_STATUSES = [DRAFT, PUBLISHED, ARCHIVED]

ENQUIRY_STATUSES = ["new", "notified", "in_progress", "responded", "qualified", "closed"]
ENQUIRY_PRIORITIES = ["low", "normal", "high", "urgent"]
ROLES = ["super_admin", "content_manager", "enquiry_manager"]


def new_id() -> str:
    return str(uuid.uuid4())


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def slugify(value: str) -> str:
    value = re.sub(r"[^a-zA-Z0-9\s-]", "", (value or "").strip().lower())
    value = re.sub(r"[\s_-]+", "-", value)
    return value.strip("-")


def serialize(doc: dict | None) -> dict | None:
    """Map a Mongo document to an API-safe dict (_id -> id)."""
    if not doc:
        return None
    out = {k: v for k, v in doc.items() if k != "_id"}
    out["id"] = doc.get("_id")
    return out


def serialize_many(docs) -> list:
    return [serialize(d) for d in docs]


class RateLimiter:
    """Simple in-process fixed-window limiter."""

    def __init__(self):
        self._hits: dict[str, list[float]] = {}

    def allow(self, key: str, limit: int, window: int) -> bool:
        now = time.time()
        hits = [t for t in self._hits.get(key, []) if now - t < window]
        if len(hits) >= limit:
            self._hits[key] = hits
            return False
        hits.append(now)
        self._hits[key] = hits
        return True


rate_limiter = RateLimiter()


def client_ip(request) -> str:
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


async def log_audit(actor: dict, action: str, entity: str, entity_id: str | None = None, detail: str = ""):
    await db.audit_logs.insert_one({
        "_id": new_id(),
        "actor_id": actor.get("id") if actor else None,
        "actor_username": actor.get("username") if actor else None,
        "action": action,
        "entity": entity,
        "entity_id": entity_id,
        "detail": detail,
        "created_at": now_iso(),
    })


async def ensure_indexes():
    await db.admin_users.create_index("username", unique=True)
    await db.admin_users.create_index("email", unique=True)
    await db.products.create_index("slug", unique=True)
    await db.products.create_index([("status", 1), ("sort_order", 1)])
    await db.products.create_index("category_id")
    await db.categories.create_index("slug", unique=True)
    await db.industries.create_index("slug", unique=True)
    await db.enquiries.create_index("reference_number", unique=True)
    await db.enquiries.create_index([("created_at", -1)])
    await db.enquiries.create_index("status")
    await db.enquiries.create_index("email")
    await db.page_content.create_index("slug", unique=True)
    await db.audit_logs.create_index([("created_at", -1)])


DEFAULT_SETTINGS = {
    "_id": "site",
    "company_name": "TRUECORE TECHNOLOGIES PVT. LTD.",
    "tagline": "Advanced Materials. A Stronger Tomorrow.",
    "positioning": "Manufacturers of High-Performance PU Products",
    "logo_url": "",
    "contact_email": "",
    "contact_phone": "",
    "whatsapp_number": "",
    "whatsapp_message": (
        "Hello TrueCore Technologies, I would like to enquire about your PU products and "
        "engineered material solutions. Please share more information about your products "
        "and suitability for my application."
    ),
    "address": "",
    "business_hours": "",
    "social_links": {"linkedin": "", "twitter": "", "youtube": ""},
    "enquiry_recipients": "",
    "default_seo_title": "TrueCore Technologies Pvt. Ltd. | Advanced Materials. A Stronger Tomorrow.",
    "default_seo_description": (
        "TrueCore Technologies Pvt. Ltd. manufactures high-performance polyurethane (PU) products "
        "and engineered material solutions for railway, automotive, mobility and industrial applications."
    ),
    "analytics_id": "",
    "map_embed_url": "",
    "pending_approval_note": "Contact details, address and logo are placeholders pending company approval.",
    "updated_at": now_iso(),
}

ABOUT_COPY = (
    "TrueCore Technologies Pvt. Ltd. is an advanced materials company established to manufacture "
    "high-performance PU products and develop long-term capabilities in engineered material solutions. "
    "Our objective is to build a reliable Indian company serving critical industrial needs through "
    "quality products, technical understanding and responsible growth."
)

DEFAULT_PAGES = [
    {
        "_id": new_id(),
        "slug": "home",
        "title": "Home",
        "status": PUBLISHED,
        "seo_title": "TrueCore Technologies Pvt. Ltd. | Advanced Materials. A Stronger Tomorrow.",
        "seo_description": DEFAULT_SETTINGS["default_seo_description"],
        "sections": [
            {"key": "hero", "heading": "Advanced Materials. A Stronger Tomorrow.",
             "subheading": "Manufacturers of High-Performance PU Products",
             "body": "Engineered polyurethane solutions for demanding industrial applications.",
             "image_url": ""},
            {"key": "about", "heading": "About TrueCore", "subheading": "Engineered material solutions",
             "body": ABOUT_COPY, "image_url": ""},
            {"key": "offerings", "heading": "Core Offerings",
             "subheading": "Engineered for application. Built for performance.",
             "body": "High-performance PU products\nCustom engineered components\nIndustrial material solutions\nFuture-ready advanced materials",
             "image_url": ""},
            {"key": "technology", "heading": "Technology & Engineering Approach",
             "subheading": "Material selection, application understanding, manufacturing and quality practices",
             "body": "We assess the application requirement first, then select suitable polyurethane systems and manufacturing methods. Specific processes, equipment and quality practices are published only after company verification.",
             "image_url": ""},
            {"key": "why", "heading": "Why TrueCore", "subheading": "Substantiated, application-first engineering",
             "body": "Application-specific material selection\nTechnical understanding of industrial requirements\nQuality-led manufacturing discipline\nResponsible, long-term growth",
             "image_url": ""},
            {"key": "cta", "heading": "Discuss your requirement",
             "subheading": "Share drawings, specifications or application details",
             "body": "Our team will review your requirement and respond with suitable product or custom-solution options.",
             "image_url": ""},
        ],
        "updated_at": now_iso(),
    },
    {
        "_id": new_id(),
        "slug": "about",
        "title": "About Us",
        "status": PUBLISHED,
        "seo_title": "About TrueCore Technologies Pvt. Ltd.",
        "seo_description": "An advanced materials company manufacturing high-performance PU products and engineered material solutions.",
        "sections": [
            {"key": "overview", "heading": "Company Overview", "subheading": "", "body": ABOUT_COPY, "image_url": ""},
            {"key": "vision", "heading": "Vision & Mission", "subheading": "Pending company approval",
             "body": "", "image_url": ""},
            {"key": "philosophy", "heading": "Business Philosophy", "subheading": "Customer and application first",
             "body": "We work from the application requirement backwards: understand the operating conditions, select suitable material systems, and deliver products that remain reliable in service.",
             "image_url": ""},
            {"key": "manufacturing", "heading": "Manufacturing & Engineering Focus",
             "subheading": "", "body": "Our focus is on polyurethane product manufacturing and engineered material development. Specific plant, equipment and capacity details will be published after verification.",
             "image_url": ""},
            {"key": "quality", "heading": "Quality Commitment", "subheading": "",
             "body": "Quality is managed through documented product requirements, inspection at defined stages, and corrective action on deviations. Certification claims are published only when formally obtained.",
             "image_url": ""},
            {"key": "future", "heading": "Future Direction", "subheading": "",
             "body": "We intend to expand our product range and technical capability progressively, in step with customer requirements and responsible investment.",
             "image_url": ""},
        ],
        "updated_at": now_iso(),
    },
    {
        "_id": new_id(),
        "slug": "technology",
        "title": "Technology",
        "status": PUBLISHED,
        "seo_title": "Technology & Engineering Approach | TrueCore Technologies",
        "seo_description": "Our engineering-led approach to polyurethane material selection, product design, manufacturing and quality assurance.",
        "sections": [
            {"key": "materials", "heading": "Polyurethane & Engineered Materials", "subheading": "",
             "body": "Polyurethane systems can be formulated across a wide hardness and performance range, which makes them suitable for wear, damping, sealing and load-bearing applications. Material selection is driven by the application, not by a single standard grade.",
             "image_url": ""},
            {"key": "assessment", "heading": "Application & Requirement Assessment", "subheading": "",
             "body": "We review operating loads, contact conditions, environment, temperature exposure and expected service life before recommending a material or product configuration.",
             "image_url": ""},
            {"key": "design", "heading": "Product Design & Customisation", "subheading": "",
             "body": "Products can be developed to customer drawings or jointly engineered from an application brief, including dimensions, profiles and mounting requirements.",
             "image_url": ""},
            {"key": "process", "heading": "Manufacturing Processes", "subheading": "",
             "body": "Manufacturing method is selected to suit the part geometry and performance requirement. Verified process and equipment details will be published after company approval.",
             "image_url": ""},
            {"key": "quality", "heading": "Quality Assurance & Inspection", "subheading": "",
             "body": "Inspection points are defined per product. Measurement and test capability is declared only where it is available in-house or through an approved partner.",
             "image_url": ""},
            {"key": "collaboration", "heading": "Technical Collaboration", "subheading": "",
             "body": "We work with engineering and procurement teams on trials, iterative sampling and progressive qualification for critical applications.",
             "image_url": ""},
        ],
        "updated_at": now_iso(),
    },
    {
        "_id": new_id(),
        "slug": "privacy-policy",
        "title": "Privacy Policy",
        "status": PUBLISHED,
        "seo_title": "Privacy Policy | TrueCore Technologies Pvt. Ltd.",
        "seo_description": "How TrueCore Technologies collects, uses and retains information submitted through this website.",
        "sections": [
            {"key": "collection", "heading": "Information We Collect", "subheading": "",
             "body": "When you submit an enquiry or quote request we collect your name, company name, business email, phone number and the requirement details you choose to share. We may also record the page from which the enquiry originated and the submission time.",
             "image_url": ""},
            {"key": "use", "heading": "Why We Collect It", "subheading": "",
             "body": "Information is used solely to understand, respond to and follow up on your enquiry, and to maintain an internal record of business communication.",
             "image_url": ""},
            {"key": "retention", "heading": "Retention", "subheading": "",
             "body": "Enquiry records are retained for as long as required for business and legal purposes and are accessible only to authorised staff. Retention periods are configurable and reviewed periodically.",
             "image_url": ""},
            {"key": "requests", "heading": "Your Requests", "subheading": "",
             "body": "You may contact us using the details on the Contact page to ask about the information we hold concerning your enquiry, or to request correction or deletion where applicable.",
             "image_url": ""},
            {"key": "review", "heading": "Approval Status", "subheading": "",
             "body": "This policy is a working draft. Final legal wording is subject to company review and applicable Indian data protection requirements.",
             "image_url": ""},
        ],
        "updated_at": now_iso(),
    },
]


async def seed_content():
    if not await db.site_settings.find_one({"_id": "site"}):
        await db.site_settings.insert_one(dict(DEFAULT_SETTINGS))
    for page in DEFAULT_PAGES:
        if not await db.page_content.find_one({"slug": page["slug"]}):
            await db.page_content.insert_one(dict(page))

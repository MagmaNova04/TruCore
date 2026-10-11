"""Canonical approved public copy, seeded into page_content / directors.

Editing this file changes the defaults for a fresh install; run
`python backend/apply_content.py` to push the same values into an existing database.
"""

AVATAR_FEMALE = "https://static.prod-images.emergentagent.com/jobs/2aef6c48-2f9a-4860-9f17-68ffcdeff4d1/images/fc65a50dede23b16b8110b419984f778b8da0bb9a512699fd560589703714a46.jpeg"
AVATAR_MALE = "https://static.prod-images.emergentagent.com/jobs/2aef6c48-2f9a-4860-9f17-68ffcdeff4d1/images/a3b0af62442e09e269abb24ffee479e7bd599da56874808a76b0eb948fbebf6c.jpeg"
INDUSTRIES_HERO = "https://customer-assets-39nsmqrw.emergentagent.net/job_truecore-pu/artifacts/7fe6e11c5fdc4b45_image.png"
UNIT_1_IMAGE = "https://images.unsplash.com/photo-1730705788367-dbd288c40ee7?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400"
UNIT_2_IMAGE = "https://static.prod-images.emergentagent.com/jobs/2aef6c48-2f9a-4860-9f17-68ffcdeff4d1/images/3cecf89626995696ee117b7c97f74ce0c358d3e45cff2fd7974fe90a489e1cd1.jpeg"

HOME_ABOUT = (
    "TrueCore Technologies Pvt. Ltd. is an advanced materials company focused on developing and "
    "manufacturing high-performance engineered polymer components for demanding industrial "
    "applications. We are building long-term capabilities in material solutions to serve Railways, "
    "Automotive, Mobility and Industrial sectors through quality products, technical expertise and "
    "responsible growth."
)

ABOUT_INTRO = (
    "TrueCore Technologies Pvt. Ltd. is an advanced materials company focused on engineered polymer "
    "solutions for Railways, Automotive, Mobility and Industrial applications. We combine application "
    "understanding, material selection, product development and quality-focused execution to deliver "
    "reliable high-performance components through a flexible network of technical and production "
    "capabilities."
)

TECHNOLOGY_INTRO = (
    "TrueCore Technologies is developing a focused manufacturing platform for high-performance "
    "polyurethane, TPU and engineered polymer components for railway, automotive and industrial "
    "applications."
)

HOME_SECTIONS = [
    {"key": "hero",
     "heading": "High-Performance Engineered Polymer Components",
     "subheading": "Manufacturers of High-Performance Advanced Polymer Products",
     "body": ("Advanced polymer and material solutions engineered for demanding Railway, Automotive, "
              "Mobility and Industrial applications."),
     "image_url": ""},
    {"key": "hero_applications", "heading": "Applications", "subheading": "",
     "body": "Wear Resistance\nDamping & Vibration Control\nSealing\nLoad-Bearing & Impact",
     "image_url": ""},
    {"key": "hero_materials", "heading": "Material Platforms", "subheading": "",
     "body": "PU & TPU\nEngineering Thermoplastics\nReinforced Polymers\nElastomeric Systems",
     "image_url": ""},
    {"key": "hero_sectors", "heading": "Sectors", "subheading": "",
     "body": "Railways\nAutomotive & EV\nMetro & Mobility\nIndustrial",
     "image_url": ""},
    {"key": "about", "heading": "About TrueCore", "subheading": "Engineered material solutions",
     "body": HOME_ABOUT, "image_url": ""},
    {"key": "offerings", "heading": "Core Offerings",
     "subheading": "Engineered for application. Built for performance.",
     "body": ("High-performance Advanced Polymer Products\nCustom engineered components\n"
              "Industrial material solutions\nFuture-ready advanced materials"),
     "image_url": ""},
    {"key": "technology", "heading": "Technology & Engineering Approach",
     "subheading": "Application first, then material system, tooling and production route",
     "body": ("We assess the application first, then define the appropriate material system, tooling "
              "and production route. Our focus is on performance, consistency and quality, while "
              "leveraging suitable manufacturing capabilities to deliver application-specific "
              "engineered polymer solutions."),
     "image_url": ""},
    {"key": "why", "heading": "Why TrueCore", "subheading": "Substantiated, application-first engineering",
     "body": ("Application-specific material selection\nTechnical understanding of industrial requirements\n"
              "Quality-led manufacturing discipline\nResponsible, long-term growth"),
     "image_url": ""},
    {"key": "cta", "heading": "Discuss your requirement",
     "subheading": "Share drawings, specifications or application details",
     "body": ("Our team will review your requirement and respond with suitable product or "
              "custom-solution options."),
     "image_url": ""},
]

ABOUT_SECTIONS = [
    {"key": "overview", "heading": "About Us", "subheading": "", "body": ABOUT_INTRO, "image_url": ""},
    {"key": "vision", "heading": "Vision", "subheading": "",
     "body": ("To become a trusted Indian advanced materials company, recognised for delivering "
              "high-performance engineered polymer solutions for mobility and industrial applications."),
     "image_url": ""},
    {"key": "mission", "heading": "Mission", "subheading": "",
     "body": ("To create reliable, application-driven material solutions through technical "
              "understanding, quality-focused execution and strong customer partnerships, while "
              "continuously expanding our capabilities across advanced polymers and engineered materials."),
     "image_url": ""},
    {"key": "philosophy", "heading": "Business Philosophy", "subheading": "",
     "body": ("Our philosophy is to create long-term value through engineering-led thinking, reliable "
              "quality and responsible growth. We aim to understand each application deeply, align the "
              "right material and solution with customer needs, and build enduring partnerships founded "
              "on trust, consistency and continuous improvement."),
     "image_url": ""},
    {"key": "manufacturing", "heading": "Manufacturing & Engineering Focus", "subheading": "",
     "body": ("TrueCore focuses on engineering discipline, material performance and quality-driven "
              "execution, supported by suitable manufacturing capabilities to deliver reliable "
              "engineered polymer solutions."),
     "image_url": ""},
    {"key": "quality", "heading": "Quality Commitment", "subheading": "",
     "body": ("Quality is managed through documented product requirements, inspection at defined "
              "stages, and corrective action on deviations. Certification claims are published only "
              "when formally obtained."),
     "image_url": ""},
    {"key": "future", "heading": "Future Direction", "subheading": "",
     "body": ("We intend to expand our product range and technical capability progressively, in step "
              "with customer requirements and responsible investment."),
     "image_url": ""},
]

TECHNOLOGY_SECTIONS = [
    {"key": "intro", "heading": "Technology & Manufacturing",
     "subheading": "Building Integrated Polymer Manufacturing Capabilities",
     "body": ("TrueCore Technologies is developing a focused manufacturing platform for "
              "high-performance polyurethane, TPU and engineered polymer components for railway, "
              "automotive and industrial applications. Our manufacturing approach is built around "
              "controlled processing, application-specific tooling, quality discipline and scalable "
              "production."),
     "image_url": ""},
    {"key": "unit_1", "heading": "Unit 1 – Advanced Polymer Moulding",
     "subheading": ("Railway components, automotive parts, precision TPU products and custom moulded "
                    "engineering components."),
     "body": ("Unit 1 is being developed for precision-moulded TPU and engineered polymer components, "
              "supported by modern injection moulding technology, controlled material handling and "
              "application-specific tooling."),
     "image_url": UNIT_1_IMAGE},
    {"key": "unit_2", "heading": "Unit 2 – Polyurethane Processing & Custom Engineering",
     "subheading": ("Rollers, wheels, bushes, pads, liners, scrapers and other specialised industrial "
                    "components."),
     "body": ("Unit 2 is being developed for cast polyurethane and customised engineered components "
              "requiring high wear resistance, resilience and durability."),
     "image_url": UNIT_2_IMAGE},
    {"key": "integrated", "heading": "Integrated Manufacturing Approach", "subheading": "",
     "body": ("Together, the two units will provide TrueCore with complementary capabilities in TPU "
              "moulding, cast polyurethane, tooling and custom product development, supporting the "
              "company's growth across railway, mobility and industrial markets."),
     "image_url": ""},
    {"key": "closing", "heading": "", "subheading": "",
     "body": "Two complementary manufacturing platforms. One integrated engineering approach.",
     "image_url": ""},
]

SUSTAINABILITY_SECTIONS = [
    {"key": "intro", "heading": "Sustainability at TrueCore", "subheading": "",
     "body": ("At TrueCore Technologies Pvt. Ltd., sustainability is viewed as an essential part of "
              "responsible business growth. We believe that the future of manufacturing will depend on "
              "the ability to combine industrial performance with responsible resource use, long-term "
              "thinking and stronger business systems."),
     "image_url": ""},
    {"key": "approach", "heading": "A Growing, Guided Approach", "subheading": "",
     "body": ("With guidance from sustainability and foresight-driven leadership, the company aims to "
              "integrate sustainability into its business approach as it grows."),
     "image_url": ""},
    {"key": "focus", "heading": "Sustainability Focus", "subheading": "",
     "body": ("Responsible business development\nLong-term value creation\nEfficient manufacturing "
              "thinking\nFuture-oriented strategy\nTechnology-enabled sustainability"),
     "image_url": ""},
]

DIRECTORS = [
    {
        "name": "Shubhra Mishra",
        "designation": "Chief Executive Officer & Director – Strategy, Sustainability & Innovation",
        "bio": ("Shubhra Mishra leads TrueCore Technologies as its Chief Executive Officer & Director, "
                "shaping the company's strategic direction and its growth as a women-led engineering "
                "and advanced materials enterprise.\n\nHer doctoral research at IIT Jodhpur focuses on "
                "sustainability, governance and strategic foresight, with emphasis on translating "
                "long-term sustainability goals into practical business and technological actions. At "
                "TrueCore, she leads corporate strategy, organisational development, sustainability "
                "integration, research collaboration and technology foresight across railway, "
                "automotive and industrial applications.\n\nFocus Areas: Corporate Strategy, Women-Led "
                "Enterprise Development, Sustainability, Innovation, Technology Foresight, Research "
                "Collaboration and Governance."),
        "photo_url": AVATAR_FEMALE,
        "sort_order": 1,
    },
    {
        "name": "Arun Gopal Mishra",
        "designation": "Director – Railway & Institutional Development",
        "bio": ("Arun Gopal Mishra brings deep domain experience from Indian Railways, with exposure to "
                "technical coordination, personnel management, employee welfare and institutional "
                "operations.\n\nAt TrueCore, he contributes railway-sector understanding, institutional "
                "insight and practical guidance for developing railway-focused products, business "
                "opportunities and stakeholder relationships."),
        "photo_url": AVATAR_MALE,
        "sort_order": 2,
    },
    {
        "name": "Flying Officer Sudhir Kumar Mishra (Retd.)",
        "designation": "Director – Finance, Commercial & Technical Administration",
        "bio": ("Flying Officer Sudhir Kumar Mishra (Retd.), Indian Air Force, brings strong experience "
                "across finance, procurement, commercial administration and technical-support "
                "environments, with significant service exposure at Base Repair Depots of the Indian "
                "Air Force.\n\nHis background includes budgeting, accounts, tendering, bidding, vendor "
                "evaluation, procurement coordination, expenditure control and interaction with "
                "technical maintenance and repair functions. At TrueCore, he supports financial "
                "discipline, technical-commercial evaluation, procurement governance, vendor "
                "development and structured commercial operations."),
        "photo_url": AVATAR_MALE,
        "sort_order": 3,
    },
]

import { Link } from "react-router-dom";
import useSWR from "swr";
import { api } from "@/lib/api";
import { usePageMeta } from "@/lib/seo";
import { PageHero, Breadcrumbs, SectionHeading } from "@/components/site/Primitives";

const fetcher = (url) => api.get(url).then((r) => r.data);

export default function CmsPage({ slug, eyebrow, fallbackTitle }) {
  const { data: page, error } = useSWR(`/pages/${slug}`, fetcher, { revalidateOnFocus: false });
  usePageMeta({ title: page?.seo_title || fallbackTitle, description: page?.seo_description });

  const sections = (page?.sections || []).filter((s) => s.body || s.heading);
  const intro = sections[0];

  return (
    <>
      <PageHero eyebrow={eyebrow} title={page?.title || fallbackTitle} intro={intro?.body} />
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: page?.title || fallbackTitle }]} />

      <div className="tc-section">
        <div className="tc-container max-w-4xl">
          {error && (
            <p className="text-[#3F434A]" data-testid="cms-page-error">
              This page is not published yet. Please check back soon or contact us for information.
            </p>
          )}
          <div className="space-y-14">
            {sections.slice(1).map((s) => (
              <section key={s.key} data-testid={`cms-section-${s.key}`}>
                <SectionHeading title={s.heading} eyebrow={s.subheading} as="h2" />
                {s.body && <p className="mt-6 whitespace-pre-line text-[#3F434A]">{s.body}</p>}
                {s.image_url && (
                  <img
                    src={s.image_url}
                    alt={s.heading || ""}
                    loading="lazy"
                    className="mt-8 w-full border border-[#8A8F96]/30 object-cover"
                  />
                )}
              </section>
            ))}
          </div>

          <div className="mt-16 border-t border-[#8A8F96]/25 pt-10">
            <p className="text-[#3F434A]">
              Have a requirement or a technical question? Our team will review your application details and respond.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link to="/request-quote" className="tc-btn-primary" data-testid="cms-page-quote-cta">
                Request a Quote
              </Link>
              <Link to="/contact" className="tc-btn-outline" data-testid="cms-page-contact-cta">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

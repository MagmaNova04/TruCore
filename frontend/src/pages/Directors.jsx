import { Link } from "react-router-dom";
import useSWR from "swr";
import { Linkedin } from "lucide-react";
import { api } from "@/lib/api";
import { usePageMeta } from "@/lib/seo";
import { PageHero, Breadcrumbs, EmptyState } from "@/components/site/Primitives";

const fetcher = (url) => api.get(url).then((r) => r.data);

export default function Directors() {
  const { data } = useSWR("/directors", fetcher, { revalidateOnFocus: false });
  usePageMeta({
    title: "Directors | TrueCore Technologies Pvt. Ltd.",
    description: "Leadership of TrueCore Technologies Pvt. Ltd. Published profiles reflect approved information only.",
  });

  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Directors"
        intro="Profiles are published only when the company has approved the name, designation and biography."
      />
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Directors" }]} />
      <div className="tc-section">
        <div className="tc-container">
          {data?.length ? (
            <div className="grid gap-8 lg:grid-cols-3">
              {data.map((d) => (
                <article key={d.id} className="tc-card flex flex-col p-6" data-testid={`director-card-${d.id}`}>
                  <div className="aspect-square w-28 overflow-hidden bg-[#EDEDED]">
                    {d.photo_url ? (
                      <img src={d.photo_url} alt={d.name} loading="lazy" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xl font-bold text-[#8A8F96]">
                        {d.name.slice(0, 1)}
                      </div>
                    )}
                  </div>
                  <h2 className="mt-5 text-lg font-semibold">{d.name}</h2>
                  {d.designation && <p className="tc-eyebrow mt-1">{d.designation}</p>}
                  {d.bio && <p className="mt-4 whitespace-pre-line text-[15px] text-[#3F434A]">{d.bio}</p>}
                  {d.linkedin_url && (
                    <a
                      href={d.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#10A6D8] hover:text-[#003B7A]"
                    >
                      <Linkedin size={15} aria-hidden="true" /> Profile
                    </a>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              testId="directors-empty-state"
              title="Leadership details are being finalised"
              message="TrueCore Technologies Pvt. Ltd. is an advanced materials company focused on high-performance PU products and engineered material solutions. Director profiles will be published once approved."
              action={<Link to="/contact" className="tc-btn-primary">Contact the Company</Link>}
            />
          )}
        </div>
      </div>
    </>
  );
}

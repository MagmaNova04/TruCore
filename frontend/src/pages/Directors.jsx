import useSWR from "swr";
import { Linkedin } from "lucide-react";
import { api } from "@/lib/api";
import { usePageMeta } from "@/lib/seo";
import { PageHero, Breadcrumbs, EmptyState } from "@/components/site/Primitives";
import { useEnquiryModal } from "@/components/site/EnquiryModal";

const fetcher = (url) => api.get(url).then((r) => r.data);

const SUPPORTING_TEXT =
  "TrueCore Technologies is guided by a leadership team bringing together expertise in strategy, " +
  "sustainability, railways, finance, commercial operations and institutional development.";

const DirectorCard = ({ director }) => (
  <article
    className="group flex h-full flex-col border border-[#8A8F96]/35 bg-white transition-all duration-300 hover:border-[#10A6D8] hover:shadow-[0_12px_28px_-18px_rgba(0,59,122,0.45)]"
    data-testid={`director-card-${director.id}`}
  >
    <div className="aspect-[4/5] w-full overflow-hidden bg-[#EDEDED]">
      {director.photo_url ? (
        <img
          src={director.photo_url}
          alt={director.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-[#8A8F96]">
          {director.name.slice(0, 1)}
        </div>
      )}
    </div>

    <div className="flex flex-1 flex-col p-6 lg:p-7">
      <h2 className="text-lg font-bold leading-snug">{director.name}</h2>
      <p className="mt-2 min-h-[3.25rem] text-[12.5px] font-semibold uppercase leading-snug tracking-[0.06em] text-[#10A6D8]">
        {director.designation}
      </p>
      <span className="mt-4 block h-px w-full bg-[#8A8F96]/25" />
      {director.bio && (
        <div className="mt-4 space-y-3 text-[14.5px] leading-relaxed text-[#3F434A]">
          {director.bio.split("\n").map((para) => para.trim()).filter(Boolean).map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>
      )}
      {director.linkedin_url && (
        <a
          href={director.linkedin_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 pt-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#10A6D8] hover:text-[#003B7A]"
        >
          <Linkedin size={15} aria-hidden="true" /> Profile
        </a>
      )}
    </div>
  </article>
);

export default function Directors() {
  const { data } = useSWR("/directors", fetcher, { revalidateOnFocus: false });
  const { openEnquiry } = useEnquiryModal();
  usePageMeta({
    title: "Board of Directors | TrueCore Technologies Pvt. Ltd.",
    description: SUPPORTING_TEXT,
  });

  return (
    <>
      <PageHero eyebrow="Leadership" title="Board of Directors" intro={SUPPORTING_TEXT} />
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Board of Directors" }]} />
      <div className="tc-section">
        <div className="tc-container">
          {data?.length ? (
            <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8" data-testid="directors-grid">
              {data.map((d) => <DirectorCard key={d.id} director={d} />)}
            </div>
          ) : (
            <EmptyState
              testId="directors-empty-state"
              title="Leadership details are being finalised"
              message="TrueCore Technologies Pvt. Ltd. is an advanced materials company focused on high-performance engineered polymer products. Director profiles will be published once approved."
              action={
                <button type="button" className="tc-btn-primary" data-testid="directors-enquire-cta"
                  onClick={() => openEnquiry({ title: "Contact the Company" })}>
                  Contact the Company
                </button>
              }
            />
          )}
        </div>
      </div>
    </>
  );
}

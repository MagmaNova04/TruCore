import useSWR from "swr";
import { api } from "@/lib/api";
import { useSite } from "@/context/SiteContext";
import { usePageMeta } from "@/lib/seo";
import { PageHero, Breadcrumbs, EmptyState } from "@/components/site/Primitives";
import { SimpleCard } from "@/components/site/Cards";
import { useEnquiryModal } from "@/components/site/EnquiryModal";

const fetcher = (url) => api.get(url).then((r) => r.data);

export default function Industries() {
  const { data } = useSWR("/industries", fetcher, { revalidateOnFocus: false });
  const { settings } = useSite();
  const { openEnquiry } = useEnquiryModal();
  usePageMeta({
    title: "Industries & Applications | TrueCore Technologies",
    description: "Industrial sectors and applications addressed by TrueCore engineered polymer and advanced material solutions.",
  });

  return (
    <>
      <PageHero
        eyebrow="Applications"
        title="Industries We Address"
        intro="High-performance polymer components designed for demanding environments across multiple industries."
      />
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Industries" }]} />

      {settings?.industries_hero_url && (
        <section className="tc-container pt-12 lg:pt-16" data-testid="industries-overview-image">
          <figure className="border border-[#8A8F96]/30 bg-white">
            <img
              src={settings.industries_hero_url}
              alt="Engineered polymer solutions for railways, automotive and EV, industrial equipment, mobility and metro systems, and custom applications"
              className="w-full object-contain"
              loading="lazy"
            />
          </figure>
        </section>
      )}

      <div className="tc-section">
        <div className="tc-container">
          {data?.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((ind) => (
                <SimpleCard
                  key={ind.id}
                  to={`/industries/${ind.slug}`}
                  title={ind.name}
                  text={(ind.overview || "").slice(0, 170)}
                  image={ind.image_url}
                  testId={`industry-card-${ind.slug}`}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              testId="industries-empty-state"
              title="Industry pages pending approval"
              message="Confirmed industry and application pages will be published here. Meanwhile, tell us about your application and we will advise on suitability."
              action={
                <button type="button" className="tc-btn-primary" data-testid="industries-enquire-cta"
                  onClick={() => openEnquiry({ title: "Discuss an Application" })}>
                  Discuss an Application
                </button>
              }
            />
          )}
        </div>
      </div>
    </>
  );
}

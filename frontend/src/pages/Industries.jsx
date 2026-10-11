import { Link } from "react-router-dom";
import useSWR from "swr";
import { api } from "@/lib/api";
import { usePageMeta } from "@/lib/seo";
import { PageHero, Breadcrumbs, EmptyState } from "@/components/site/Primitives";
import { SimpleCard } from "@/components/site/Cards";

const fetcher = (url) => api.get(url).then((r) => r.data);

export default function Industries() {
  const { data } = useSWR("/industries", fetcher, { revalidateOnFocus: false });
  usePageMeta({
    title: "Industries & Applications | TrueCore Technologies",
    description: "Industrial sectors and applications addressed by TrueCore polyurethane and engineered material solutions.",
  });

  return (
    <>
      <PageHero
        eyebrow="Applications"
        title="Industries We Address"
        intro="Industry pages are published only after company approval. Listings here reflect confirmed application areas."
      />
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Industries" }]} />
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
              action={<Link to="/request-quote" className="tc-btn-primary">Discuss an Application</Link>}
            />
          )}
        </div>
      </div>
    </>
  );
}

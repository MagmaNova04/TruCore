import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useSite } from "@/context/SiteContext";
import { usePageMeta } from "@/lib/seo";
import { PageHero, Breadcrumbs, SectionHeading } from "@/components/site/Primitives";
import { WhatsAppInline } from "@/components/site/WhatsApp";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export default function Contact() {
  const { settings } = useSite();
  usePageMeta({
    title: "Contact | TrueCore Technologies Pvt. Ltd.",
    description: "Contact TrueCore Technologies Pvt. Ltd. for polyurethane products, engineered components and custom material solutions.",
  });

  const rows = [
    settings?.contact_email && { Icon: Mail, label: "Email", value: settings.contact_email, href: `mailto:${settings.contact_email}` },
    settings?.contact_phone && { Icon: Phone, label: "Phone", value: settings.contact_phone, href: `tel:${settings.contact_phone}` },
    settings?.address && { Icon: MapPin, label: "Address", value: settings.address },
    settings?.business_hours && { Icon: Clock, label: "Business hours", value: settings.business_hours },
  ].filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact TrueCore"
        intro="Send us your application requirement, drawing or specification and our team will respond."
      />
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />

      <div className="tc-section">
        <div className="tc-container grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading eyebrow="Company" title={settings?.company_name || "TRUECORE TECHNOLOGIES PVT. LTD."} />
            <dl className="mt-8 divide-y divide-[#8A8F96]/25 border-y border-[#8A8F96]/25" data-testid="contact-details">
              {rows.map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 py-4">
                  <Icon size={18} className="mt-1 text-[#10A6D8]" aria-hidden="true" />
                  <div>
                    <dt className="tc-eyebrow">{label}</dt>
                    <dd className="mt-1 text-[15px] text-[#3F434A]">
                      {href ? <a href={href} className="hover:text-[#10A6D8]">{value}</a> : value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            {rows.length === 0 && (
              <p className="mt-8 border border-dashed border-[#8A8F96]/50 bg-[#EDEDED]/50 p-5 text-[15px] text-[#3F434A]" data-testid="contact-details-pending">
                Verified contact details are pending company approval and will appear here once published in the admin
                portal. Please use the enquiry form — every submission is recorded with a unique reference.
              </p>
            )}
            <div className="mt-8">
              <WhatsAppInline testId="contact-whatsapp-button" />
            </div>
            {settings?.map_embed_url && (
              <iframe
                title="Location map"
                src={settings.map_embed_url}
                className="mt-8 h-64 w-full border border-[#8A8F96]/30"
                loading="lazy"
              />
            )}
          </div>

          <div className="border border-[#8A8F96]/30 p-6 lg:p-8">
            <h2 className="text-xl font-semibold">Send an enquiry</h2>
            <p className="mt-2 text-[15px] text-[#3F434A]">Fields marked with * are required.</p>
            <div className="mt-6">
              <EnquiryForm compact sourcePage="/contact" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

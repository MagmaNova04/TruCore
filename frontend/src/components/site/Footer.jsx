import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, FileText } from "lucide-react";
import { useSite } from "@/context/SiteContext";

export const Footer = () => {
  const { settings } = useSite();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#003B7A] text-white/85" data-testid="site-footer">
      <div className="tc-container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-[15px] font-extrabold tracking-tight text-white">
            TRUECORE TECHNOLOGIES<span className="text-[#10A6D8]"> PVT. LTD.</span>
          </p>
          <span className="mt-4 block h-[3px] w-12 bg-[#10A6D8]" />
          <p className="mt-4 text-[14px] leading-relaxed text-white/75">
            {settings?.tagline || "Advanced Materials. A Stronger Tomorrow."}
          </p>
          <p className="mt-2 text-[13px] text-white/60">
            {settings?.positioning || "Manufacturers of High-Performance PU Products"}
          </p>
        </div>

        <div>
          <p className="tc-eyebrow !text-white/55">Company</p>
          <ul className="mt-4 space-y-2.5 text-[14px]">
            {[
              ["/about", "About Us"],
              ["/technology", "Technology & Manufacturing"],
              ["/sustainability", "Sustainability"],
              ["/directors", "Leadership & Team"],
              ["/contact", "Contact Us"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-[#10A6D8]" data-testid={`footer-link-${label.replace(/\s/g, "-").toLowerCase()}`}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="tc-eyebrow !text-white/55">Catalogue</p>
          <ul className="mt-4 space-y-2.5 text-[14px]">
            {[
              ["/products", "All Products"],
              ["/industries", "Industries We Cater"],
              ["/request-quote", "Request a Quote"],
              ["/privacy-policy", "Privacy Policy"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-[#10A6D8]">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="tc-eyebrow !text-white/55">Contact</p>
          <ul className="mt-4 space-y-3 text-[14px]">
            {settings?.contact_email && (
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-1 text-[#10A6D8]" aria-hidden="true" />
                <span>
                  <a href={`mailto:${settings.contact_email}`} className="hover:text-[#10A6D8]" data-testid="footer-email">
                    {settings.contact_email}
                  </a>
                  {settings.alternate_email && (
                    <a href={`mailto:${settings.alternate_email}`} className="mt-1 block text-white/65 hover:text-[#10A6D8]" data-testid="footer-alternate-email">
                      {settings.alternate_email}
                    </a>
                  )}
                </span>
              </li>
            )}
            {settings?.contact_phone && (
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-1 text-[#10A6D8]" aria-hidden="true" />
                <span>
                  <a href={`tel:${settings.contact_phone.replace(/\s/g, "")}`} className="hover:text-[#10A6D8]" data-testid="footer-phone">
                    {settings.contact_phone}
                  </a>
                  {settings.alternate_phone && (
                    <a href={`tel:${settings.alternate_phone.replace(/\s/g, "")}`} className="mt-1 block text-white/65 hover:text-[#10A6D8]" data-testid="footer-alternate-phone">
                      {settings.alternate_phone}
                    </a>
                  )}
                </span>
              </li>
            )}
            {settings?.address && (
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 text-[#10A6D8]" aria-hidden="true" />
                <span data-testid="footer-address">
                  <span className="block text-white/55">Registered Office</span>
                  {settings.address}
                </span>
              </li>
            )}
            {settings?.cin && (
              <li className="flex items-start gap-2">
                <FileText size={16} className="mt-1 text-[#10A6D8]" aria-hidden="true" />
                <span data-testid="footer-cin">
                  <span className="block text-white/55">CIN</span>
                  <span className="tc-mono text-[13px]">{settings.cin}</span>
                </span>
              </li>
            )}
            {!settings?.contact_email && !settings?.contact_phone && !settings?.address && (
              <li className="text-[13px] text-white/60">
                Contact details will be published once verified. Use the enquiry form meanwhile.
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="tc-container flex flex-col gap-2 py-5 text-[13px] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} TrueCore Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-[#10A6D8]">Privacy Policy</Link>
            <Link to="/admin/login" className="hover:text-[#10A6D8]" data-testid="footer-admin-link">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

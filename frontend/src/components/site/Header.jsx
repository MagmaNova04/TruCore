import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import useSWR from "swr";
import { api } from "@/lib/api";
import { useSite } from "@/context/SiteContext";
import { useEnquiryModal } from "@/components/site/EnquiryModal";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/industries", label: "Industries" },
  { to: "/technology", label: "Technology" },
  { to: "/sustainability", label: "Sustainability" },
  { to: "/directors", label: "Directors" },
  { to: "/contact", label: "Contact" },
];

const fetcher = (url) => api.get(url).then((r) => r.data);

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const { pathname } = useLocation();
  const { settings } = useSite();
  const { openEnquiry } = useEnquiryModal();
  const { data: categories } = useSWR("/categories", fetcher, { revalidateOnFocus: false });

  useEffect(() => {
    setOpen(false);
    setCatsOpen(false);
  }, [pathname]);

  const linkClass = ({ isActive }) =>
    `relative py-2 text-[13px] font-medium transition-colors xl:text-[14px] ${
      isActive ? "text-[#10A6D8]" : "text-[#3F434A] hover:text-[#10A6D8]"
    }`;

  return (
    <header
      className="sticky top-0 z-50 border-b border-[#8A8F96]/25 bg-white/95 backdrop-blur-[2px]"
      data-testid="site-header"
    >
      <div className="tc-container flex h-[68px] items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3" data-testid="logo-link">
          {settings?.logo_url ? (
            <img src={settings.logo_url} alt={settings.company_name} className="h-9 w-auto" />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center bg-[#003B7A] text-sm font-extrabold text-white">
              TC
            </span>
          )}
          <span className="leading-none">
            <span className="block text-[15px] font-extrabold tracking-tight text-[#003B7A]">
              TRUECORE<span className="text-[#10A6D8]">.</span>
            </span>
            <span className="tc-eyebrow block">Technologies Pvt. Ltd.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-4 lg:flex xl:gap-6" aria-label="Primary">
          {NAV.map((item) =>
            item.to === "/products" && categories?.length ? (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={() => setCatsOpen(true)}
                onMouseLeave={() => setCatsOpen(false)}
              >
                <NavLink to={item.to} className={linkClass} data-testid="nav-products-link">
                  <span className="flex items-center gap-1">
                    {item.label}
                    <ChevronDown size={14} aria-hidden="true" />
                  </span>
                </NavLink>
                {catsOpen && (
                  <div
                    className="absolute left-0 top-full w-64 border border-[#8A8F96]/30 bg-white py-2 shadow-lg"
                    data-testid="nav-category-dropdown"
                  >
                    {categories.map((c) => (
                      <Link
                        key={c.id}
                        to={`/products/category/${c.slug}`}
                        className="block px-4 py-2 text-[14px] text-[#3F434A] hover:bg-[#EDEDED] hover:text-[#003B7A]"
                        data-testid={`nav-category-${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClass}
                data-testid={`nav-${item.label.toLowerCase()}-link`}
              >
                {item.label}
              </NavLink>
            )
          )}
          <button
            type="button"
            onClick={() => openEnquiry({ title: "Enquire Now" })}
            className="tc-btn-primary !py-2.5 !text-[12px]"
            data-testid="header-enquire-button"
          >
            Enquire Now
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center border border-[#8A8F96]/40 text-[#003B7A] lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          data-testid="mobile-menu-toggle"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-[#8A8F96]/25 bg-white lg:hidden"
          aria-label="Mobile"
          data-testid="mobile-nav"
        >
          <div className="tc-container flex flex-col py-3">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="border-b border-[#EDEDED] py-3 text-[15px] font-medium text-[#3F434A]"
                data-testid={`mobile-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => openEnquiry({ title: "Enquire Now" })}
              className="tc-btn-primary mt-4 w-full"
              data-testid="mobile-enquire-button"
            >
              Enquire Now
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

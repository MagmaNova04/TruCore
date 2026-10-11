import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { api, apiError } from "@/lib/api";
import { track } from "@/lib/analytics";

const fetcher = (url) => api.get(url).then((r) => r.data);

const EMPTY = {
  name: "",
  company_name: "",
  email: "",
  phone: "",
  industry_slug: "",
  product_slug: "",
  category_slug: "",
  quantity: "",
  quantity_unit: "",
  requirement: "",
  expected_timeline: "",
  notes: "",
  company_website: "",
};

export const EnquiryForm = ({ sourcePage, initialProduct = "", initialIndustry = "", compact = false }) => {
  const [form, setForm] = useState({ ...EMPTY, product_slug: initialProduct, industry_slug: initialIndustry });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const started = useRef(false);

  const { data: products } = useSWR("/products?page_size=48", fetcher, { revalidateOnFocus: false });
  const { data: industries } = useSWR("/industries", fetcher, { revalidateOnFocus: false });
  const { data: categories } = useSWR("/categories", fetcher, { revalidateOnFocus: false });

  useEffect(() => {
    setForm((f) => ({ ...f, product_slug: initialProduct || f.product_slug, industry_slug: initialIndustry || f.industry_slug }));
  }, [initialProduct, initialIndustry]);

  const set = (key) => (e) => {
    if (!started.current) {
      started.current = true;
      track("enquiry_start", { source_page: sourcePage });
    }
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const payload = {
      ...form,
      quantity: form.quantity ? Number(form.quantity) : null,
      source_page: sourcePage,
    };
    Object.keys(payload).forEach((k) => {
      if (payload[k] === "") payload[k] = null;
    });
    payload.name = form.name;
    payload.company_name = form.company_name;
    payload.email = form.email;
    payload.phone = form.phone;
    payload.requirement = form.requirement;
    try {
      const { data } = await api.post("/enquiries", payload);
      setReference(data.reference_number);
      setStatus("success");
      track("enquiry_submit_success", { source_page: sourcePage });
    } catch (err) {
      setError(apiError(err, "We could not submit your enquiry. Please try again."));
      setStatus("error");
      track("enquiry_submit_error", { source_page: sourcePage });
    }
  };

  if (status === "success") {
    return (
      <div className="border-l-2 border-[#10A6D8] bg-[#EDEDED]/60 p-6" role="status" data-testid="enquiry-success">
        <CheckCircle2 size={28} className="text-[#10A6D8]" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold">Enquiry received</h3>
        <p className="mt-2 text-[15px] text-[#3F434A]">
          Thank you. Your enquiry has been recorded and will be reviewed by our team.
        </p>
        <p className="tc-mono mt-4 text-[15px] text-[#003B7A]" data-testid="enquiry-reference">
          Reference: {reference}
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link to="/products" className="tc-btn-outline">Browse Products</Link>
          <button
            type="button"
            className="tc-btn-ghost text-[13px]"
            onClick={() => {
              setForm({ ...EMPTY });
              setStatus("idle");
            }}
            data-testid="enquiry-new-submission"
          >
            Submit another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate data-testid="enquiry-form">
      {error && (
        <div className="mb-6 flex items-start gap-3 border-l-2 border-[#DC2626] bg-[#DC2626]/5 p-4" role="alert" data-testid="enquiry-error">
          <AlertCircle size={18} className="mt-0.5 text-[#DC2626]" aria-hidden="true" />
          <p className="text-[14px] text-[#3F434A]">{error}</p>
        </div>
      )}

      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label htmlFor="eq-name" className="tc-label">Full name *</label>
          <input id="eq-name" required minLength={2} maxLength={120} value={form.name} onChange={set("name")}
            className="tc-input" autoComplete="name" data-testid="enquiry-name-input" />
        </div>
        <div>
          <label htmlFor="eq-company" className="tc-label">Company name *</label>
          <input id="eq-company" required minLength={2} maxLength={180} value={form.company_name} onChange={set("company_name")}
            className="tc-input" autoComplete="organization" data-testid="enquiry-company-input" />
        </div>
        <div>
          <label htmlFor="eq-email" className="tc-label">Business email *</label>
          <input id="eq-email" type="email" required maxLength={254} value={form.email} onChange={set("email")}
            className="tc-input" autoComplete="email" data-testid="enquiry-email-input" />
        </div>
        <div>
          <label htmlFor="eq-phone" className="tc-label">Phone number *</label>
          <input id="eq-phone" required minLength={7} maxLength={20} value={form.phone} onChange={set("phone")}
            className="tc-input" placeholder="+91 98765 43210" autoComplete="tel" data-testid="enquiry-phone-input" />
        </div>
        <div>
          <label htmlFor="eq-industry" className="tc-label">Industry</label>
          <select id="eq-industry" value={form.industry_slug} onChange={set("industry_slug")} className="tc-input" data-testid="enquiry-industry-select">
            <option value="">Select industry</option>
            {(industries || []).map((i) => <option key={i.id} value={i.slug}>{i.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="eq-product" className="tc-label">Product of interest</label>
          <select id="eq-product" value={form.product_slug} onChange={set("product_slug")} className="tc-input" data-testid="enquiry-product-select">
            <option value="">Select product</option>
            {(products?.items || []).map((p) => <option key={p.id} value={p.slug}>{p.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="eq-category" className="tc-label">Product category</label>
          <select id="eq-category" value={form.category_slug} onChange={set("category_slug")} className="tc-input" data-testid="enquiry-category-select">
            <option value="">Select category</option>
            {(categories || []).map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="eq-qty" className="tc-label">Quantity</label>
            <input id="eq-qty" type="number" min={1} value={form.quantity} onChange={set("quantity")} className="tc-input" data-testid="enquiry-quantity-input" />
          </div>
          <div>
            <label htmlFor="eq-unit" className="tc-label">Unit</label>
            <input id="eq-unit" maxLength={40} value={form.quantity_unit} onChange={set("quantity_unit")} className="tc-input" placeholder="pieces" data-testid="enquiry-unit-input" />
          </div>
        </div>
        <div className={compact ? "" : "sm:col-span-2"}>
          <label htmlFor="eq-requirement" className="tc-label">Application or technical requirement *</label>
          <textarea id="eq-requirement" required minLength={10} maxLength={5000} rows={5} value={form.requirement}
            onChange={set("requirement")} className="tc-input"
            placeholder="Describe the application, operating conditions, loads, dimensions or drawing reference."
            data-testid="enquiry-requirement-input" />
          <p className="mt-1 text-[12px] text-[#8A8F96]">{form.requirement.length}/5000 characters (minimum 10)</p>
        </div>
        <div>
          <label htmlFor="eq-timeline" className="tc-label">Expected timeline</label>
          <input id="eq-timeline" maxLength={120} value={form.expected_timeline} onChange={set("expected_timeline")}
            className="tc-input" placeholder="e.g. within 6 weeks" data-testid="enquiry-timeline-input" />
        </div>
        <div>
          <label htmlFor="eq-notes" className="tc-label">Additional notes</label>
          <input id="eq-notes" maxLength={2000} value={form.notes} onChange={set("notes")} className="tc-input" data-testid="enquiry-notes-input" />
        </div>
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="eq-website">Website</label>
        <input id="eq-website" tabIndex={-1} value={form.company_website} onChange={set("company_website")} autoComplete="off" />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="submit" className="tc-btn-primary" disabled={status === "loading"} data-testid="enquiry-submit-button">
          {status === "loading" && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
          {status === "loading" ? "Submitting" : "Submit Enquiry"}
        </button>
        <p className="text-[13px] text-[#8A8F96]">
          By submitting you agree to our <Link to="/privacy-policy" className="text-[#10A6D8] hover:underline">privacy policy</Link>.
        </p>
      </div>
    </form>
  );
};

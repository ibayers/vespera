import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function StoreLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}

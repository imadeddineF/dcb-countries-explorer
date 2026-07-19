import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-3 p-6">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <Link href="/countries" className="text-blue-500 underline">
        {t("cta")}
      </Link>
    </div>
  );
}

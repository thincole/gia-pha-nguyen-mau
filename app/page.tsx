import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { MemberListProvider } from "@/context/MemberListContext";
import MembersViews from "@/components/MembersViews";
import MemberDetailModal from "@/components/modal/MemberDetailModal";
import ViewToggle, { ViewMode } from "@/components/ViewToggle";
import { UserProvider } from "@/components/UserProvider";
import { getProfile, getSupabase, getUser } from "@/utils/supabase/queries";
import { Sparkles } from "lucide-react";

interface HomePageProps {
  searchParams: Promise<{ view?: string; rootId?: string; avatar?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { view, rootId, avatar } = await searchParams;
  const initialView = view as ViewMode | undefined;
  const initialShowAvatar = avatar !== "hide";

  const user = await getUser();
  const profile = user ? await getProfile(user.id) : null;
  const canEdit = profile?.role === "admin" || profile?.role === "editor";

  const supabase = await getSupabase();

  const [personsRes, relsRes] = await Promise.all([
    supabase
      .from("persons")
      .select("*")
      .order("birth_year", { ascending: true, nullsFirst: false }),
    supabase.from("relationships").select("*"),
  ]);

  const persons = personsRes.data || [];
  const relationships = relsRes.data || [];

  // Prepare map and roots for tree views
  const personsMap = new Map();
  persons.forEach((p) => personsMap.set(p.id, p));

  const childIds = new Set(
    relationships
      .filter(
        (r) => r.type === "biological_child" || r.type === "adopted_child",
      )
      .map((r) => r.person_b),
  );

  let finalRootId = rootId;

  if (!finalRootId || !personsMap.has(finalRootId)) {
    const rootsFallback = persons.filter((p) => !childIds.has(p.id));
    if (rootsFallback.length > 0) {
      finalRootId = rootsFallback[0].id;
    } else if (persons.length > 0) {
      finalRootId = persons[0].id;
    }
  }

  return (
    <UserProvider user={user} profile={profile}>
      <div className="min-h-screen bg-neutral text-primary flex flex-col font-sans selection:bg-amber-200 selection:text-amber-900">
        <DashboardHeader />

        {/* Compact clan banner */}
        <div className="bg-amber-50/60 border-b border-amber-200/50 py-2 px-4 text-center">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-900">
            <Sparkles className="size-4 text-amber-600 shrink-0" />
            <span>Thôn Thượng Đền • Thị trấn Cổ Lễ • Huyện Trực Ninh • Tỉnh Nam Định</span>
          </div>
        </div>

        <main className="flex-1 flex flex-col relative w-full">
          <MemberListProvider
            initialView={initialView}
            initialRootId={finalRootId}
            initialShowAvatar={initialShowAvatar}
          >
            <ViewToggle />
            <MembersViews
              persons={persons}
              relationships={relationships}
              canEdit={canEdit}
            />

            <MemberDetailModal />
          </MemberListProvider>
        </main>

        <Footer
          className="mt-auto bg-white border-t border-stone-200"
          showDisclaimer={true}
        />
      </div>
    </UserProvider>
  );
}

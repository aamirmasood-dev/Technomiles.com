import { PageWipe } from "@/components/fx/PageWipe";

/** Re-mounts on every navigation, so the inner-page wipe replays. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageWipe />
      {children}
    </>
  );
}

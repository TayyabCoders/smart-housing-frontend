"use client";

import { useAppSelector } from "@/redux/store";
import { useAuth } from "@/hooks/use-auth";
import PopupModal from "@/components/shared/popup-modal";
import AnnouncementForm from "./AnnouncementForm";
import AnnouncementCard from "./AnnouncementCard";

export default function AnnouncementsContainer() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const { announcements, loading, error } = useAppSelector((state) => state.announcements);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Announcements</h1>
          <p className="text-sm text-muted-foreground">Updates and notices posted by the admin.</p>
        </div>
        {isAdmin && (
          <PopupModal
            buttonText="Add Announcement"
            renderModal={(onClose) => <AnnouncementForm modalClose={onClose} />}
          />
        )}
      </div>

      {loading && <p className="text-muted-foreground">Loading announcements...</p>}
      {error && <p className="text-destructive">{error}</p>}
      {!loading && announcements.length === 0 && (
        <p className="text-muted-foreground">No announcements yet.</p>
      )}

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} isAdmin={isAdmin} />
        ))}
      </div>
    </div>
  );
}

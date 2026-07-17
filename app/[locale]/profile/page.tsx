"use client";

import React, { useEffect, useState } from "react";
import { DynamicLayout } from "@/components/layout/dynamic-layout";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  fetchProfile,
  updateProfile,
  changePassword,
  clearProfileErrors,
} from "@/redux/slices/profile-slice";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Lock,
  Save,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Edit3,
} from "lucide-react";
import { cn } from "@/lib/tailwindUtils/utils";

const GENDER_OPTIONS = [
  { value: "", label: "Prefer not to say" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

function getUserInitials(username?: string, email?: string) {
  if (username) return username.substring(0, 2).toUpperCase();
  if (email) return email.substring(0, 2).toUpperCase();
  return "U";
}

function Toast({ msg, type, show }: { msg: string; type: "success" | "error"; show: boolean }) {
  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-full border shadow-xl transition-all duration-300",
        show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none",
        type === "success"
          ? "bg-card border-green-500/30 text-green-500"
          : "bg-card border-red-500/30 text-red-500"
      )}
    >
      {type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
      <span className="text-sm font-medium text-foreground">{msg}</span>
    </div>
  );
}

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { profile, loading, updating, changingPassword, error, passwordError } = useAppSelector(
    (s) => s.profile
  );

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone_number: "",
    age: "",
    gender: "",
    address: "",
    city: "",
    country: "",
    zip_code: "",
  });

  const [pwForm, setPwForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [toast, setToast] = useState({ show: false, msg: "", type: "success" as "success" | "error" });

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 3500);
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setForm({
        username: profile.username ?? "",
        email: profile.email ?? "",
        phone_number: profile.phone_number ?? "",
        age: profile.age?.toString() ?? "",
        gender: profile.gender ?? "",
        address: profile.address ?? "",
        city: profile.city ?? "",
        country: profile.country ?? "",
        zip_code: profile.zip_code ?? "",
      });
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    const payload: Record<string, any> = {};
    if (form.username !== profile?.username) payload.username = form.username;
    if (form.email !== profile?.email) payload.email = form.email;
    if (form.phone_number !== (profile?.phone_number ?? "")) payload.phone_number = form.phone_number || null;
    if (form.age !== ((profile?.age ?? "")?.toString())) payload.age = form.age ? Number(form.age) : null;
    if (form.gender !== (profile?.gender ?? "")) payload.gender = form.gender || null;
    if (form.address !== (profile?.address ?? "")) payload.address = form.address || null;
    if (form.city !== (profile?.city ?? "")) payload.city = form.city || null;
    if (form.country !== (profile?.country ?? "")) payload.country = form.country || null;
    if (form.zip_code !== (profile?.zip_code ?? "")) payload.zip_code = form.zip_code || null;

    if (Object.keys(payload).length === 0) {
      showToast("No changes to save", "error");
      return;
    }

    try {
      await dispatch(updateProfile(payload)).unwrap();
      showToast("Profile updated successfully");
      setEditMode(false);
    } catch (err: any) {
      showToast(typeof err === "string" ? err : "Failed to update profile", "error");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.new_password !== pwForm.confirm_password) {
      showToast("New passwords do not match", "error");
      return;
    }
    if (pwForm.new_password.length < 8) {
      showToast("New password must be at least 8 characters", "error");
      return;
    }
    try {
      await dispatch(changePassword(pwForm)).unwrap();
      showToast("Password changed successfully");
      setPwForm({ old_password: "", new_password: "", confirm_password: "" });
      dispatch(clearProfileErrors());
    } catch (err: any) {
      showToast(typeof err === "string" ? err : "Failed to change password", "error");
    }
  };

  const initials = getUserInitials(profile?.username, profile?.email);
  const roleColor = profile?.role === "admin"
    ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
    : "bg-blue-500/10 text-blue-600 border-blue-500/20";

  if (loading) {
    return (
      <DynamicLayout>
        <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground gap-3">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading profile...
        </div>
      </DynamicLayout>
    );
  }

  return (
    <DynamicLayout>
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      {/* Header Card */}
      <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
        <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
        <div className="px-6 pb-6 -mt-10 flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="w-20 h-20 rounded-2xl border-4 border-card bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground text-2xl font-black shadow-lg flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0 pb-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-bold truncate">{profile?.username || "User"}</h1>
              <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize", roleColor)}>
                {profile?.role || "user"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground truncate">{profile?.email}</p>
          </div>
          <button
            onClick={() => setEditMode((v) => !v)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              editMode
                ? "bg-muted text-foreground hover:bg-muted/80"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <Edit3 className="w-4 h-4" />
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-5">
        <h2 className="font-semibold text-base flex items-center gap-2">
          <User className="w-4 h-4 text-primary" /> Personal Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Username</label>
            {editMode ? (
              <input
                className="w-full border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                value={form.username}
                onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
              />
            ) : (
              <p className="text-sm font-medium py-2.5 px-4 bg-muted/40 rounded-xl">{profile?.username || "—"}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <Mail className="w-3 h-3" /> Email
            </label>
            {editMode ? (
              <input
                type="email"
                className="w-full border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            ) : (
              <p className="text-sm font-medium py-2.5 px-4 bg-muted/40 rounded-xl">{profile?.email || "—"}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <Phone className="w-3 h-3" /> Phone
            </label>
            {editMode ? (
              <input
                type="tel"
                className="w-full border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="+92 300 1234567"
                value={form.phone_number}
                onChange={(e) => setForm((f) => ({ ...f, phone_number: e.target.value }))}
              />
            ) : (
              <p className="text-sm font-medium py-2.5 px-4 bg-muted/40 rounded-xl">
                {profile?.phone_number || "—"}
              </p>
            )}
          </div>

          {/* Age */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> Age
            </label>
            {editMode ? (
              <input
                type="number"
                min={1}
                max={120}
                className="w-full border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="25"
                value={form.age}
                onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
              />
            ) : (
              <p className="text-sm font-medium py-2.5 px-4 bg-muted/40 rounded-xl">
                {profile?.age || "—"}
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Gender</label>
            {editMode ? (
              <select
                className="w-full border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                value={form.gender}
                onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))}
              >
                {GENDER_OPTIONS.map((g) => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
            ) : (
              <p className="text-sm font-medium py-2.5 px-4 bg-muted/40 rounded-xl capitalize">
                {profile?.gender?.replace(/_/g, " ") || "—"}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <MapPin className="w-3 h-3" /> Address
            </label>
            {editMode ? (
              <input
                className="w-full border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Street address"
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              />
            ) : (
              <p className="text-sm font-medium py-2.5 px-4 bg-muted/40 rounded-xl">
                {profile?.address || "—"}
              </p>
            )}
          </div>

          {/* City */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">City</label>
            {editMode ? (
              <input
                className="w-full border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Lahore"
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              />
            ) : (
              <p className="text-sm font-medium py-2.5 px-4 bg-muted/40 rounded-xl">
                {profile?.city || "—"}
              </p>
            )}
          </div>

          {/* Country */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Country</label>
            {editMode ? (
              <input
                className="w-full border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Pakistan"
                value={form.country}
                onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
              />
            ) : (
              <p className="text-sm font-medium py-2.5 px-4 bg-muted/40 rounded-xl">
                {profile?.country || "—"}
              </p>
            )}
          </div>

          {/* Zip Code */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Zip Code</label>
            {editMode ? (
              <input
                className="w-full border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="54000"
                value={form.zip_code}
                onChange={(e) => setForm((f) => ({ ...f, zip_code: e.target.value }))}
              />
            ) : (
              <p className="text-sm font-medium py-2.5 px-4 bg-muted/40 rounded-xl">
                {profile?.zip_code || "—"}
              </p>
            )}
          </div>
        </div>

        {editMode && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSaveProfile}
              disabled={updating}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>

      {/* Change Password */}
      <div className="bg-card border rounded-2xl p-6 shadow-sm">
        <h2 className="font-semibold text-base flex items-center gap-2 mb-5">
          <Lock className="w-4 h-4 text-primary" /> Change Password
        </h2>

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          {/* Current Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showOld ? "text" : "password"}
                required
                className="w-full border rounded-xl px-4 py-2.5 pr-11 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Enter current password"
                value={pwForm.old_password}
                onChange={(e) => setPwForm((f) => ({ ...f, old_password: e.target.value }))}
              />
              <button
                type="button"
                onClick={() => setShowOld((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                required
                minLength={8}
                className="w-full border rounded-xl px-4 py-2.5 pr-11 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Minimum 8 characters"
                value={pwForm.new_password}
                onChange={(e) => setPwForm((f) => ({ ...f, new_password: e.target.value }))}
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {/* Strength bar */}
            {pwForm.new_password && (
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4].map((i) => {
                  const strength =
                    pwForm.new_password.length >= 12 ? 4 :
                    pwForm.new_password.length >= 10 ? 3 :
                    pwForm.new_password.length >= 8 ? 2 : 1;
                  return (
                    <div
                      key={i}
                      className={cn(
                        "h-1 flex-1 rounded-full transition-colors",
                        i <= strength
                          ? strength <= 1 ? "bg-red-500"
                            : strength <= 2 ? "bg-amber-500"
                            : strength <= 3 ? "bg-yellow-400"
                            : "bg-green-500"
                          : "bg-muted"
                      )}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                required
                className={cn(
                  "w-full border rounded-xl px-4 py-2.5 pr-11 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30",
                  pwForm.confirm_password && pwForm.confirm_password !== pwForm.new_password
                    ? "border-red-500 focus:ring-red-500/30"
                    : pwForm.confirm_password && pwForm.confirm_password === pwForm.new_password
                    ? "border-green-500 focus:ring-green-500/30"
                    : ""
                )}
                placeholder="Repeat new password"
                value={pwForm.confirm_password}
                onChange={(e) => setPwForm((f) => ({ ...f, confirm_password: e.target.value }))}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {pwForm.confirm_password && pwForm.confirm_password !== pwForm.new_password && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Passwords do not match
              </p>
            )}
          </div>

          {passwordError && (
            <p className="text-xs text-red-500 flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {passwordError}
            </p>
          )}

          <button
            type="submit"
            disabled={changingPassword}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {changingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            {changingPassword ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>

      <Toast show={toast.show} msg={toast.msg} type={toast.type} />
    </div>
    </DynamicLayout>
  );
}

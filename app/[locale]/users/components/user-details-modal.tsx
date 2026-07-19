"use client";

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalTitle } from "@/components/ui/modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BaseGrid } from "@/components/shared/base-grid";
import { UserModuleUser } from "@/app/[locale]/users/types/user";
import { User, Mail, Phone, Calendar, MapPin } from "lucide-react";

interface UserDetailsModalProps {
  user: UserModuleUser;
  isOpen: boolean;
  onClose: () => void;
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user, isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="mx-auto w-full max-w-3xl">
        <ModalHeader>
          <ModalTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Details
          </ModalTitle>
        </ModalHeader>
        <ScrollArea className="max-h-[75vh]">
          <div className="p-6 space-y-6">
            {/* Status Badge */}
            <div className="flex items-center justify-between pb-4 border-b">
              <div>
                <h3 className="text-2xl font-semibold">{user.username}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <Badge variant={user.is_active ? "default" : "destructive"}>
                {user.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Contact Information
              </h4>
              <BaseGrid columns={{ sm: 1, md: 2 }} gap={4}>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <Label className="text-xs text-muted-foreground">Email</Label>
                    <p className="text-sm font-medium break-all">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <Label className="text-xs text-muted-foreground">Phone</Label>
                    <p className="text-sm font-medium">{user.phone_number || "Not provided"}</p>
                  </div>
                </div>
              </BaseGrid>
            </div>

            {/* Personal Information */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Personal Information
              </h4>
              <BaseGrid columns={{ sm: 2, md: 3 }} gap={4}>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Age</Label>
                  <p className="text-sm font-medium">{user.age ?? "Not provided"}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Gender</Label>
                  <p className="text-sm font-medium">{user.gender || "Not provided"}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">User ID</Label>
                  <p className="text-xs font-mono text-muted-foreground break-all">{user.id}</p>
                </div>
              </BaseGrid>
            </div>

            {/* Address Information */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address Information
              </h4>
              <div className="p-4 bg-muted/30 rounded-lg space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Street Address</Label>
                  <p className="text-sm font-medium">{user.address || "Not provided"}</p>
                </div>
                <BaseGrid columns={{ sm: 1, md: 3 }} gap={4}>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">City</Label>
                    <p className="text-sm font-medium">{user.city || "Not provided"}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Country</Label>
                    <p className="text-sm font-medium">{user.country || "Not provided"}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Zip Code</Label>
                    <p className="text-sm font-medium">{user.zip_code || "Not provided"}</p>
                  </div>
                </BaseGrid>
              </div>
            </div>

            {/* Timestamps */}
            <div className="space-y-3 pt-4 border-t">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Record Information
              </h4>
              <BaseGrid columns={{ sm: 1, md: 2 }} gap={4}>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Created At</Label>
                  <p className="text-sm font-medium">
                    {user.created_at
                      ? new Date(user.created_at).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "Not available"}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Last Updated</Label>
                  <p className="text-sm font-medium">
                    {user.updated_at
                      ? new Date(user.updated_at).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "Not available"}
                  </p>
                </div>
              </BaseGrid>
            </div>
          </div>
        </ScrollArea>
      </ModalContent>
    </Modal>
  );
};

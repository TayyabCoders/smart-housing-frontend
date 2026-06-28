import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2, Copy, Download, Plus, Send } from 'lucide-react';
import jsPDF from 'jspdf';
import { cn } from '@/lib/tailwindUtils/utils';
import { Complaint } from '@/app/[locale]/dashboard/types';
import { useAppDispatch } from '@/redux/store';
import { createComplaint } from '@/redux/slices/complaint-slice';

interface SubmitTabProps {
  lastSubmitted: Complaint | null;
  onNewComplaint: () => void;
}

export default function SubmitTab({ lastSubmitted, onNewComplaint }: SubmitTabProps) {
  const t = useTranslations("complaints.submit");
  const tSuccess = useTranslations("complaints.success");
  const dispatch = useAppDispatch();
  
  const [fullname, setFullname] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [complaint_detail, setComplaintDetail] = useState('');
  const [errors, setErrors] = useState({ fullname: false, gender: false, complaint_detail: false });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localLastSubmitted, setLocalLastSubmitted] = useState<Complaint | null>(lastSubmitted);

  const getNow = () => {
    return new Date().toLocaleString('en-PK', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: true
    });
  };

  const handleSubmit = async () => {
    const newErrors = {
      fullname: !fullname.trim(),
      gender: !gender,
      complaint_detail: !complaint_detail.trim(),
    };
    setErrors(newErrors);

    if (!newErrors.fullname && !newErrors.gender && !newErrors.complaint_detail) {
      try {
        setIsSubmitting(true);
        const result = await dispatch(createComplaint({
          fullname: fullname.trim(),
          gender: gender as string,
          complaint_detail: complaint_detail.trim(),
        }));
        
        if (createComplaint.fulfilled.match(result)) {
          // Set last submitted complaint to show success screen
          setLocalLastSubmitted(result.payload);
          
          // Reset form
          setFullname('');
          setGender('');
          setComplaintDetail('');
          setErrors({ fullname: false, gender: false, complaint_detail: false });
        }
      } catch (error) {
        console.error('Failed to submit complaint:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const copyId = () => {
    if (!localLastSubmitted) return;
    navigator.clipboard.writeText(localLastSubmitted.tracking_id).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error("Failed to copy", err);
    });
  };

  const downloadPdf = () => {
    if (!localLastSubmitted) return;
    const rec = localLastSubmitted;

    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const PW = doc.internal.pageSize.getWidth();
    const PH = doc.internal.pageSize.getHeight();

    // Background
    doc.setFillColor(249, 250, 251);
    doc.rect(0, 0, PW, PH, 'F');

    // Top color bar
    doc.setFillColor(99, 102, 241);
    doc.rect(0, 0, PW, 7, 'F');
    doc.setFillColor(139, 92, 246);
    doc.rect(0, 7, PW, 3, 'F');

    // Header card
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(1);
    doc.roundedRect(30, 22, PW - 60, 78, 8, 8, 'FD');

    doc.setFillColor(99, 102, 241);
    doc.rect(30, 22, 5, 78, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(19);
    doc.setTextColor(31, 41, 55);
    doc.text('COMPLAINT MANAGEMENT SYSTEM', PW / 2, 56, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(107, 114, 128);
    doc.text('Official Complaint Registration Receipt', PW / 2, 74, { align: 'center' });

    // Status chip
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(134, 239, 172);
    doc.setLineWidth(1);
    doc.roundedRect(PW / 2 - 52, 82, 104, 20, 5, 5, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(22, 163, 74);
    doc.text('STATUS: SUBMITTED', PW / 2, 95, { align: 'center' });

    // Tracking ID block
    doc.setFillColor(238, 242, 255);
    doc.setDrawColor(199, 210, 254);
    doc.setLineWidth(1.5);
    doc.roundedRect(30, 116, PW - 60, 60, 8, 8, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(99, 102, 241);
    doc.text('YOUR TRACKING ID', PW / 2, 134, { align: 'center' });

    doc.setFont('courier', 'bold');
    doc.setFontSize(28);
    doc.setTextColor(67, 56, 202);
    doc.text(rec.tracking_id, PW / 2, 162, { align: 'center' });

    // Details section
    let y = 202;

    const wSecTitle = (title: string, yy: number) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(99, 102, 241);
      doc.text(title, 46, yy);
      doc.setDrawColor(224, 231, 255);
      doc.setLineWidth(0.75);
      doc.line(46, yy + 4, PW - 46, yy + 4);
    };

    const wField = (label: string, value: string, yy: number) => {
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(243, 244, 246);
      doc.setLineWidth(0.5);
      doc.roundedRect(30, yy - 13, PW - 60, 24, 5, 5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(156, 163, 175);
      doc.text(label, 46, yy + 1);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(31, 41, 55);
      const maxW = PW - 200;
      const lines = doc.splitTextToSize(value, maxW);
      doc.text(lines[0], 175, yy + 1);
      return 28 + (lines.length > 1 ? (lines.length - 1) * 12 : 0);
    };

    wSecTitle('COMPLAINANT INFORMATION', y);
    y += 16;
    y += wField('Full Name', rec.fullname, y);
    y += 4;
    y += wField('Gender', rec.gender.charAt(0).toUpperCase() + rec.gender.slice(1), y);
    y += 4;
    y += wField('Submitted On', rec.created_at, y);
    y += 20;

    wSecTitle('COMPLAINT DESCRIPTION', y);
    y += 16;

    const cLines = doc.splitTextToSize(rec.complaint_detail, PW - 100);
    const cBoxH = Math.max(46, cLines.length * 13 + 18);
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(243, 244, 246);
    doc.setLineWidth(0.5);
    doc.roundedRect(30, y - 13, PW - 60, cBoxH, 5, 5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text('COMPLAINT TEXT', 46, y + 1);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(31, 41, 55);
    doc.text(cLines, 46, y + 15);
    y += cBoxH + 16;

    doc.setFillColor(239, 246, 255);
    doc.setDrawColor(147, 197, 253);
    doc.setLineWidth(0.75);
    doc.roundedRect(30, y, PW - 60, 58, 6, 6, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(37, 99, 235);
    doc.text('IMPORTANT', 46, y + 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text([
      '• Ye Tracking ID sambhal kar rakhein — complaint track karne ke liye zaroori hai.',
      '• Status check karne ke liye Complaint Portal mein Track tab use karein.',
      '• Madad ke liye ye ID zaroor batayein.'
    ], 46, y + 28);

    // Footer
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.5);
    doc.rect(0, PH - 42, PW, 42, 'FD');
    doc.setFillColor(99, 102, 241);
    doc.rect(0, PH - 42, PW, 2, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(156, 163, 175);
    doc.text('System-generated receipt — no signature required.', PW / 2, PH - 24, { align: 'center' });
    doc.text(`Generated: ${rec.created_at}`, PW / 2, PH - 12, { align: 'center' });

    doc.save(`Complaint_${rec.tracking_id}.pdf`);
  };

  const resetForm = () => {
    setFullname('');
    setGender('');
    setComplaintDetail('');
    setErrors({ fullname: false, gender: false, complaint_detail: false });
    setLocalLastSubmitted(null);
    onNewComplaint();
  };

  if (localLastSubmitted) {
    return (
      <div className="max-w-md mx-auto mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-background border rounded-2xl p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mx-auto flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">{tSuccess("title")}</h3>
          <p className="text-sm text-muted-foreground mb-6">{tSuccess("subtitle")}</p>
          
          <div className="bg-muted/50 border-2 border-dashed border-border rounded-xl p-4 flex items-center gap-3 mb-4">
            <code className="flex-1 font-mono text-lg font-bold text-primary tracking-wider text-left">
              {localLastSubmitted.tracking_id}
            </code>
            <button 
              onClick={copyId}
              className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors text-muted-foreground relative"
              title="Copy"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          
          <div className="h-4 mb-4">
            {copied && <p className="text-xs font-medium text-emerald-500 animate-in fade-in">{tSuccess("copied")}</p>}
          </div>

          <div className="space-y-3">
            <button 
              onClick={downloadPdf}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-xl font-semibold shadow-md shadow-red-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              {tSuccess("downloadPdf")}
            </button>
            <button 
              onClick={resetForm}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-xl font-semibold transition-all"
            >
              <Plus className="w-4 h-4" />
              {tSuccess("newComplaint")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-4 animate-in fade-in duration-500">
      <div className="bg-background border rounded-2xl p-6 shadow-sm space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {t("fullName")}
          </label>
          <input 
            type="text" 
            value={fullname}
            onChange={(e) => {
              setFullname(e.target.value);
              if (errors.fullname) setErrors(prev => ({ ...prev, fullname: false }));
            }}
            placeholder={t("namePlaceholder")}
            className={cn(
              "w-full bg-muted/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
              errors.fullname ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-border focus:border-primary"
            )}
          />
          {errors.fullname && <p className="text-xs text-red-500 mt-1 animate-in slide-in-from-top-1">{t("nameRequired")}</p>}
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {t("gender")}
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setGender('male');
                if (errors.gender) setErrors(prev => ({ ...prev, gender: false }));
              }}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 border rounded-xl text-sm font-medium transition-all",
                gender === 'male' ? "bg-primary/10 border-primary text-primary" : "bg-muted/50 border-border text-muted-foreground hover:border-primary/50"
              )}
            >
              <div className={cn("w-2 h-2 rounded-full border-2", gender === 'male' ? "bg-primary border-primary" : "border-current")} />
              {t("male")}
            </button>
            <button
              onClick={() => {
                setGender('female');
                if (errors.gender) setErrors(prev => ({ ...prev, gender: false }));
              }}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 border rounded-xl text-sm font-medium transition-all",
                gender === 'female' ? "bg-primary/10 border-primary text-primary" : "bg-muted/50 border-border text-muted-foreground hover:border-primary/50"
              )}
            >
              <div className={cn("w-2 h-2 rounded-full border-2", gender === 'female' ? "bg-primary border-primary" : "border-current")} />
              {t("female")}
            </button>
          </div>
          {errors.gender && <p className="text-xs text-red-500 mt-1 animate-in slide-in-from-top-1">{t("genderRequired")}</p>}
        </div>

        {/* Complaint Detail */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {t("complaintDetail")}
          </label>
          <textarea 
            value={complaint_detail}
            onChange={(e) => {
              setComplaintDetail(e.target.value);
              if (errors.complaint_detail) setErrors(prev => ({ ...prev, complaint_detail: false }));
            }}
            placeholder={t("complaintPlaceholder")}
            rows={5}
            className={cn(
              "w-full bg-muted/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none",
              errors.complaint_detail ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-border focus:border-primary"
            )}
          />
          {errors.complaint_detail && <p className="text-xs text-red-500 mt-1 animate-in slide-in-from-top-1">{t("complaintRequired")}</p>}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary text-primary-foreground rounded-xl font-semibold shadow-md shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Send className="w-4 h-4" />
          {isSubmitting ? 'Submitting...' : t("submitButton")}
        </button>
      </div>
    </div>
  );
}

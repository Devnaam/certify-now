import { QRCodeSVG } from "qrcode.react";

interface CertificateTemplate1Props {
  studentName: string;
  institutionName: string;
  certificateType: string;
  domain: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  certificateId?: string;
  verificationUrl?: string;
}

const CertificateTemplate1 = ({
  studentName,
  institutionName,
  certificateType,
  domain,
  startDate,
  endDate,
  description,
  certificateId,
  verificationUrl,
}: CertificateTemplate1Props) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div id="certificate-preview" className="relative aspect-[1.414/1] w-full overflow-hidden rounded-lg bg-white shadow-[var(--shadow-certificate)]">
      {/* Orange Curved Sidebar */}
      <div className="absolute left-0 top-0 h-full w-[15%]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#E85D3D", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#D14428", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path d="M 0 0 Q 80 25, 80 50 T 80 100 L 0 100 Z" fill="url(#orangeGradient)" />
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="relative ml-[15%] flex h-full flex-col p-8">
        {/* Header Logos */}
        <div className="mb-6 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-red-600 bg-white">
              <span className="text-xs font-bold text-red-600">LOGO</span>
            </div>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-teal-600 bg-white">
            <span className="text-xs font-bold text-teal-600">SEAL</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-600">S</span>
            <span className="text-lg font-semibold text-gray-700">SkillDzire</span>
          </div>
        </div>

        {/* Orange Ribbon Banner */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="relative bg-gradient-to-r from-orange-600 to-orange-500 px-16 py-3">
            <h1 className="text-center text-2xl font-bold uppercase tracking-wider text-white">
              CERTIFICATE OF {certificateType.toUpperCase()}
            </h1>
            {/* Ribbon ends */}
            <div className="absolute -right-4 top-0 h-0 w-0 border-l-[16px] border-t-[38px] border-l-transparent border-t-orange-600"></div>
            <div className="absolute -left-4 top-0 h-0 w-0 border-r-[16px] border-t-[38px] border-r-transparent border-t-orange-600"></div>
          </div>
        </div>

        {/* Certificate Content */}
        <div className="flex-1 space-y-3 px-8 text-left">
          <p className="text-base text-gray-700">This is to Certify that Mr./Ms</p>
          
          <div className="border-b-2 border-gray-300 pb-1">
            <h2 className="text-center text-2xl font-bold text-gray-900">{studentName}</h2>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-sm text-gray-600">Enrolled in the</span>
            <div className="flex-1 border-b border-gray-300">
              <span className="text-sm font-semibold text-gray-800">{domain}</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-sm text-gray-600">From College</span>
            <div className="flex-1 border-b border-gray-300">
              <span className="text-sm font-semibold text-gray-800">{institutionName}</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-sm text-gray-600">of university</span>
            <div className="flex-1 border-b border-gray-300">
              <span className="text-sm font-semibold text-gray-800">JNTUA, Anantapur</span>
            </div>
          </div>

          <p className="pt-2 text-sm leading-relaxed text-gray-700">
            has Successfully Completed short-term Internship programme titled
          </p>

          <div className="border-b-2 border-gray-300 pb-1">
            <h3 className="text-center text-xl font-bold text-gray-900">{domain}</h3>
          </div>

          <p className="text-sm leading-relaxed text-gray-700">
            under SkillDzire for 2 Months. Organized By <strong>SkillDzire</strong> in collaboration with{" "}
            <strong>Andhra Pradesh State Council of Higher Education</strong>.
          </p>

          {description && (
            <p className="text-sm italic text-gray-600">{description}</p>
          )}
        </div>

        {/* Footer Section */}
        <div className="mt-6 grid grid-cols-3 gap-8 px-8">
          {/* Certificate ID */}
          <div className="text-left">
            <p className="text-xs font-semibold text-orange-600">Certificate ID:</p>
            <p className="font-mono text-xs font-bold text-gray-800">{certificateId || "SDST-02724"}</p>
            <p className="mt-2 text-xs font-semibold text-orange-600">Issued On:</p>
            <p className="text-xs font-bold text-gray-800">{formatDate(endDate) || "28-Jun-2024"}</p>
          </div>

          {/* Approval Seal */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border-4 border-orange-500 bg-orange-100">
              <span className="text-xs font-bold text-orange-600">SEAL</span>
            </div>
            <p className="text-xs font-semibold text-gray-700">Approved By AICTE</p>
          </div>

          {/* Authorized Signature */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-400">
              <span className="text-xs font-bold text-gray-600">SIGN</span>
            </div>
            <p className="text-xs font-semibold text-gray-700">Authorized Signature</p>
          </div>
        </div>

        {/* QR Code */}
        {verificationUrl && (
          <div className="absolute bottom-4 right-4 rounded-lg bg-white p-2 shadow-md">
            <QRCodeSVG value={verificationUrl} size={60} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateTemplate1;

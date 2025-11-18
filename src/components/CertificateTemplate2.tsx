import { QRCodeSVG } from "qrcode.react";

interface CertificateTemplate2Props {
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

const CertificateTemplate2 = ({
  studentName,
  institutionName,
  certificateType,
  domain,
  startDate,
  endDate,
  description,
  certificateId,
  verificationUrl,
}: CertificateTemplate2Props) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });
  };

  return (
    <div id="certificate-preview" className="relative aspect-[1.414/1] w-full overflow-hidden rounded-lg border-4 border-cyan-200 bg-white p-8 shadow-[var(--shadow-certificate)]">
      {/* Geometric Decorations - Top Left */}
      <div className="absolute left-8 top-8 h-32 w-32 opacity-20">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <polygon points="50,5 90,35 75,80 25,80 10,35" fill="#67E8F9" />
          <polygon points="50,20 75,40 65,65 35,65 25,40" fill="#22D3EE" />
        </svg>
      </div>

      {/* Geometric Decorations - Top Right */}
      <div className="absolute right-8 top-8 h-24 w-24 opacity-20">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <polygon points="50,10 80,40 60,75 40,75 20,40" fill="#67E8F9" />
        </svg>
      </div>

      {/* Geometric Decorations - Bottom Left */}
      <div className="absolute bottom-8 left-8 h-28 w-28 opacity-20">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <polygon points="50,5 85,30 75,70 25,70 15,30" fill="#67E8F9" />
        </svg>
      </div>

      {/* Geometric Decorations - Bottom Right */}
      <div className="absolute bottom-8 right-8 h-40 w-40 opacity-20">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <polygon points="50,3 92,28 82,75 18,75 8,28" fill="#67E8F9" />
          <polygon points="50,15 80,35 72,65 28,65 20,35" fill="#22D3EE" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Header Logo */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded bg-gradient-to-br from-cyan-400 to-cyan-600">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-cyan-600">INTERNSHALA</h3>
            <p className="text-xs font-medium text-gray-600">TRAININGS</p>
          </div>
        </div>

        {/* Certificate Title */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Certificate of {certificateType}</h1>
          <div className="mx-auto mt-2 h-1 w-24 bg-gray-800"></div>
        </div>

        {/* Student Name */}
        <div className="mb-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">{studentName}</h2>
        </div>

        {/* Body Text */}
        <div className="mb-6 flex-1 px-12 text-center text-sm leading-relaxed text-gray-700">
          <p className="mb-4">
            from <strong>{institutionName}</strong> has successfully completed an 8-week online training on{" "}
            <strong className="text-cyan-600">{domain}</strong>. The training consisted of Introduction to {domain},{" "}
            {domain} Analysis Fundamentals, Introduction to {domain} Visualization, Working with Data, Predictive Analytics using Machine Learning,
            AI in {domain}, and Capstone Project modules.
          </p>
          
          {description && (
            <p className="mb-4 italic text-gray-600">{description}</p>
          )}

          <p className="text-sm text-gray-600">
            We wish {studentName.split(" ")[0]} all the best for future endeavours.
          </p>
        </div>

        {/* Signatures Section */}
        <div className="mt-auto grid grid-cols-2 gap-12 px-12 pt-6">
          {/* Left Signature */}
          <div className="text-center">
            <div className="mb-2 border-b-2 border-gray-800 pb-1">
              <div className="h-12 font-signature text-2xl italic text-gray-800">Sarvesh</div>
            </div>
            <p className="text-xs font-semibold text-gray-800">Sarvesh Agrawal</p>
            <p className="text-xs text-gray-600">FOUNDER & CEO, INTERNSHALA</p>
          </div>

          {/* Right Signature */}
          <div className="text-center">
            <div className="mb-2 flex flex-col items-center">
              <div className="mb-1 flex h-12 w-20 items-center justify-center rounded border-2 border-yellow-400 bg-yellow-50">
                <span className="text-xs font-bold text-yellow-600">LOGO</span>
              </div>
            </div>
            <p className="text-xs font-semibold text-gray-800">Dr. Shankar Raman</p>
            <p className="text-xs text-gray-600">CEO, IITM PRAVARTAK TECHNOLOGIES FOUNDATION</p>
          </div>
        </div>

        {/* Footer Information */}
        <div className="mt-6 flex justify-between border-t border-gray-200 pt-4 text-xs text-gray-600">
          <div>
            <span className="font-semibold">Date of certification:</span> {formatDate(endDate) || "2025-10-21"}
          </div>
          <div>
            <span className="font-semibold">Certificate no.:</span> {certificateId || "a37m1jk9yox"}
          </div>
        </div>

        <div className="mt-2 text-center text-xs text-gray-500">
          For certificate authentication, please visit {verificationUrl || "https://trainings.internshala.com/verify_certificate"}
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

export default CertificateTemplate2;

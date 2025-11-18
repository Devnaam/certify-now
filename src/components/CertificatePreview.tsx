import { QRCodeSVG } from "qrcode.react";

interface CertificatePreviewProps {
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

const CertificatePreview = ({
  studentName,
  institutionName,
  certificateType,
  domain,
  startDate,
  endDate,
  description,
  certificateId,
  verificationUrl,
}: CertificatePreviewProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const getDuration = () => {
    if (startDate && endDate) {
      return `from ${formatDate(startDate)} to ${formatDate(endDate)}`;
    }
    return "";
  };

  return (
    <div id="certificate-preview" className="relative aspect-[1.414/1] w-full overflow-hidden rounded-lg bg-gradient-to-br from-primary via-primary to-secondary p-8 shadow-[var(--shadow-certificate)]">
      {/* White Content Area */}
      <div className="relative flex h-full flex-col rounded-lg bg-background p-8 shadow-xl">
        {/* Header Logos */}
        <div className="mb-6 flex items-center justify-center gap-6">
          <div className="text-xs font-semibold text-muted-foreground">CERTIFICATE ISSUER</div>
        </div>

        {/* Certificate Title */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-wide text-foreground">
            CERTIFICATE OF {certificateType.toUpperCase()}
          </h1>
          <div className="mx-auto mt-2 h-1 w-32 bg-gradient-to-r from-primary to-secondary"></div>
        </div>

        {/* This is to certify that */}
        <p className="mb-4 text-center text-sm text-muted-foreground">This is to certify that</p>

        {/* Student Name */}
        <div className="mb-4">
          <h2 className="text-center text-3xl font-bold text-foreground">{studentName}</h2>
          <div className="mx-auto mt-2 h-px w-96 max-w-full bg-border"></div>
        </div>

        {/* Institution */}
        <p className="mb-6 text-center text-sm text-muted-foreground">of</p>
        <h3 className="mb-6 text-center text-xl font-bold text-foreground">{institutionName}</h3>

        {/* Body Text */}
        <div className="mb-6 flex-1 text-center text-sm leading-relaxed text-foreground">
          <p>
            has successfully completed their <strong>{certificateType.toLowerCase()}</strong> in the field of{" "}
            <strong className="text-primary">{domain}</strong>
            {getDuration() && ` ${getDuration()}`}.
          </p>
          {description && (
            <p className="mt-4 text-muted-foreground">{description}</p>
          )}
        </div>

        {/* Certificate ID */}
        {certificateId && (
          <p className="mb-4 text-center text-xs font-mono text-muted-foreground">
            Certificate ID: {certificateId}
          </p>
        )}

        {/* QR Code */}
        {verificationUrl && (
          <div className="absolute bottom-8 right-8 rounded-lg bg-background p-2 shadow-md">
            <QRCodeSVG value={verificationUrl} size={80} />
          </div>
        )}

        {/* Signature Section */}
        <div className="grid grid-cols-3 gap-4 pt-6">
          <div className="text-center">
            <div className="mb-2 border-t-2 border-foreground pt-2">
              <p className="text-xs font-semibold">Authorized Signature</p>
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 border-t-2 border-foreground pt-2">
              <p className="text-xs font-semibold">Authorized Signature</p>
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 border-t-2 border-foreground pt-2">
              <p className="text-xs font-semibold">Authorized Signature</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePreview;

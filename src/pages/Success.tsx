import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Download, Eye, Share2, Loader2 } from "lucide-react";
import CertificatePreview from "@/components/CertificatePreview";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Success = () => {
  const { certificateId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [certificate, setCertificate] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (certificateId) {
      fetchCertificate();
    }
  }, [certificateId]);

  const fetchCertificate = async () => {
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .eq("certificate_id", certificateId)
        .single();

      if (error) throw error;
      setCertificate(data);
    } catch (error) {
      console.error("Error fetching certificate:", error);
      toast({
        title: "Error",
        description: "Failed to load certificate details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!certificateRef.current || !certificate) return;

    setIsDownloading(true);
    toast({
      title: "Generating PDF",
      description: "Please wait while we prepare your certificate...",
    });

    try {
      // Create a temporary container for rendering
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      tempContainer.style.width = "1123px"; // A4 landscape width
      tempContainer.style.height = "794px"; // A4 landscape height
      document.body.appendChild(tempContainer);

      // Clone the certificate element
      const certificateClone = certificateRef.current.cloneNode(true) as HTMLElement;
      certificateClone.style.width = "1123px";
      certificateClone.style.height = "794px";
      tempContainer.appendChild(certificateClone);

      // Wait for images and fonts to load
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Generate canvas
      const canvas = await html2canvas(certificateClone, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      // Clean up
      document.body.removeChild(tempContainer);

      // Create PDF
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1123, 794],
      });

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, 1123, 794);
      pdf.save(`certificate-${certificate.certificate_id}.pdf`);

      toast({
        title: "Download Complete",
        description: "Your certificate has been downloaded successfully!",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    const verificationUrl = `${window.location.origin}/verify/${certificateId}`;
    navigator.clipboard.writeText(verificationUrl);
    toast({
      title: "Link Copied!",
      description: "Verification link has been copied to clipboard.",
    });
  };

  const handleViewVerification = () => {
    navigate(`/verify/${certificateId}`);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Certificate Not Found</CardTitle>
            <CardDescription>The requested certificate could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/")}>Go Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent">
      <div className="container mx-auto px-4 py-8">
        {/* Success Message */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              Certificate Generated Successfully!
            </CardTitle>
            <CardDescription className="text-base">
              Your certificate is ready. You can download it or share the verification link.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Certificate Preview */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div ref={certificateRef}>
                  <CertificatePreview
                    studentName={certificate.student_name}
                    institutionName={certificate.institution_name}
                    certificateType={certificate.certificate_type}
                    domain={certificate.domain}
                    startDate={certificate.start_date}
                    endDate={certificate.end_date}
                    description={certificate.description}
                    certificateId={certificate.certificate_id}
                    verificationUrl={certificate.verification_url}
                    templateType={certificate.template_type || "classic"}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>Download or share your certificate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleDownloadPDF} disabled={isDownloading} className="w-full" size="lg">
                  {isDownloading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </>
                  )}
                </Button>

                <Button onClick={handleShare} variant="secondary" className="w-full" size="lg">
                  <Share2 className="mr-2 h-4 w-4" />
                  Copy Verification Link
                </Button>

                <Button onClick={handleViewVerification} variant="outline" className="w-full" size="lg">
                  <Eye className="mr-2 h-4 w-4" />
                  View Verification Page
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Certificate Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold">Certificate ID:</span>
                  <p className="font-mono text-muted-foreground">{certificate.certificate_id}</p>
                </div>
                <div>
                  <span className="font-semibold">Generated:</span>
                  <p className="text-muted-foreground">
                    {new Date(certificate.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <span className="font-semibold">Verification URL:</span>
                  <p className="break-all text-xs text-primary">{certificate.verification_url}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, XCircle, Loader2, Shield } from "lucide-react";
import CertificatePreview from "@/components/CertificatePreview";

const Verify = () => {
  const { certificateId } = useParams();
  const [certificate, setCertificate] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (certificateId) {
      verifyCertificate();
    }
  }, [certificateId]);

  const verifyCertificate = async () => {
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .eq("certificate_id", certificateId)
        .single();

      if (error) throw error;

      if (data) {
        setCertificate(data);
        setIsValid(true);
      }
    } catch (error) {
      console.error("Error verifying certificate:", error);
      setIsValid(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-lg">Verifying certificate...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent">
      <div className="container mx-auto px-4 py-8">
        {/* Verification Status */}
        <Card className={`mb-8 ${isValid ? "border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10" : "border-destructive/20 bg-destructive/5"}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              {isValid ? (
                <>
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  Certificate Verified
                </>
              ) : (
                <>
                  <XCircle className="h-6 w-6 text-destructive" />
                  Certificate Not Found
                </>
              )}
            </CardTitle>
            <CardDescription className="text-base">
              {isValid
                ? "This certificate is authentic and has been verified in our system."
                : "The certificate ID you entered could not be found in our system."}
            </CardDescription>
          </CardHeader>
        </Card>

        {isValid && certificate && (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Certificate Display */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardContent className="p-6">
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
                  />
                </CardContent>
              </Card>
            </div>

            {/* Certificate Information */}
            <div className="space-y-4">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Verification Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Badge className="mb-2 bg-primary">Authentic</Badge>
                    <p className="text-sm text-muted-foreground">
                      This certificate has been verified as authentic and issued by our system.
                    </p>
                  </div>

                  <div className="space-y-2 border-t pt-4">
                    <div>
                      <p className="text-xs font-semibold uppercase text-muted-foreground">Certificate ID</p>
                      <p className="font-mono text-sm">{certificate.certificate_id}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-muted-foreground">Student Name</p>
                      <p className="text-sm">{certificate.student_name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-muted-foreground">Institution</p>
                      <p className="text-sm">{certificate.institution_name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-muted-foreground">Type</p>
                      <p className="text-sm">{certificate.certificate_type}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-muted-foreground">Domain</p>
                      <p className="text-sm">{certificate.domain}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-muted-foreground">Issued On</p>
                      <p className="text-sm">
                        {new Date(certificate.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-muted bg-muted/30">
                <CardContent className="p-4 text-xs text-muted-foreground">
                  <p className="mb-2 font-semibold">About Verification</p>
                  <p>
                    This verification page confirms the authenticity of the certificate. The QR code on the
                    certificate links directly to this page for easy verification.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;

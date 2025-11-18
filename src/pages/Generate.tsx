import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Loader2 } from "lucide-react";
import CertificatePreview from "@/components/CertificatePreview";

const certificateTypes = [
  "Internship",
  "Course Completion",
  "Workshop",
  "Training Program",
  "Seminar",
];

const domains = [
  "Web Development",
  "Data Science",
  "Digital Marketing",
  "AI/ML",
  "Graphic Design",
  "Content Writing",
  "Mobile Development",
  "Cyber Security",
  "Cloud Computing",
  "UI/UX Design",
];

const Generate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    institutionName: "",
    certificateType: "",
    domain: "",
    startDate: "",
    endDate: "",
    description: "",
    templateType: "classic",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateCertificateId = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `CERT-${year}-${random}`;
  };

  const handleGenerate = async () => {
    // Validation
    if (!formData.studentName || !formData.institutionName || !formData.certificateType || !formData.domain) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const certificateId = generateCertificateId();
      const verificationUrl = `${window.location.origin}/verify/${certificateId}`;

      // Save certificate to database
      const { data, error } = await supabase
        .from("certificates")
        .insert({
          certificate_id: certificateId,
          student_name: formData.studentName,
          institution_name: formData.institutionName,
          certificate_type: formData.certificateType,
          domain: formData.domain,
          start_date: formData.startDate || null,
          end_date: formData.endDate || null,
          description: formData.description || null,
          verification_url: verificationUrl,
          qr_code_data: verificationUrl,
          template_type: formData.templateType,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Certificate Generated!",
        description: "Your certificate has been created successfully.",
      });

      // Navigate to success page with certificate ID
      navigate(`/success/${certificateId}`);
    } catch (error) {
      console.error("Error generating certificate:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate certificate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-foreground">Generate Certificate</h1>
          <p className="text-muted-foreground">Create professional certificates in minutes</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Certificate Details
              </CardTitle>
              <CardDescription>Fill in the information for your certificate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">Full Name *</Label>
                <Input
                  id="studentName"
                  placeholder="Enter student's full name"
                  value={formData.studentName}
                  onChange={(e) => handleInputChange("studentName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="institutionName">Institution/College Name *</Label>
                <Input
                  id="institutionName"
                  placeholder="Enter institution name"
                  value={formData.institutionName}
                  onChange={(e) => handleInputChange("institutionName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="certificateType">Certificate Type *</Label>
                <Select value={formData.certificateType} onValueChange={(value) => handleInputChange("certificateType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select certificate type" />
                  </SelectTrigger>
                  <SelectContent>
                    {certificateTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="domain">Domain/Field *</Label>
                <Select value={formData.domain} onValueChange={(value) => handleInputChange("domain", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select domain" />
                  </SelectTrigger>
                  <SelectContent>
                    {domains.map((domain) => (
                      <SelectItem key={domain} value={domain}>
                        {domain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Add any additional information or achievements..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>

              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full" size="lg">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Certificate"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <div className="space-y-4">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>See how your certificate will look</CardDescription>
              </CardHeader>
              <CardContent>
                <CertificatePreview
                  studentName={formData.studentName || "Student Name"}
                  institutionName={formData.institutionName || "Institution Name"}
                  certificateType={formData.certificateType || "Certificate Type"}
                  domain={formData.domain || "Domain"}
                  startDate={formData.startDate}
                  endDate={formData.endDate}
                  description={formData.description}
                  templateType={formData.templateType}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;

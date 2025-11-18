import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, CheckCircle2, Download, Shield, Sparkles, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: "Quick Generation",
      description: "Create professional certificates in minutes with our intuitive form",
    },
    {
      icon: Shield,
      title: "Secure Verification",
      description: "Each certificate includes a unique QR code and verification URL",
    },
    {
      icon: Download,
      title: "High-Quality PDF",
      description: "Download print-ready PDFs with professional design and formatting",
    },
    {
      icon: CheckCircle2,
      title: "Instant Validation",
      description: "Recipients can verify certificate authenticity anytime, anywhere",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-secondary">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-background/10 px-6 py-2 text-primary-foreground backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Professional Certificate Generator</span>
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
            Create Stunning
            <br />
            <span className="bg-gradient-to-r from-accent to-background bg-clip-text text-transparent">
              Digital Certificates
            </span>
          </h1>

          <p className="mb-8 max-w-2xl text-lg text-primary-foreground/90 md:text-xl">
            Generate professional certificates for internships, courses, and workshops. Each certificate includes
            secure verification through QR codes and unique IDs.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => navigate("/generate")}
              size="lg"
              className="bg-background text-primary hover:bg-background/90"
            >
              <Award className="mr-2 h-5 w-5" />
              Generate Certificate
            </Button>
            <Button
              onClick={() => navigate("/verify")}
              size="lg"
              variant="outline"
              className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-background/10"
            >
              <Shield className="mr-2 h-5 w-5" />
              Verify Certificate
            </Button>
          </div>

          {/* Features Grid */}
          <div className="mt-20 grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-primary-foreground/10 bg-background/10 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-background">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 font-semibold text-primary-foreground">{feature.title}</h3>
                    <p className="text-sm text-primary-foreground/70">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-primary-foreground/10 bg-background/5 py-8 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-primary-foreground/70">
          <p className="text-sm">
            © {new Date().getFullYear()} Certificate Generator. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

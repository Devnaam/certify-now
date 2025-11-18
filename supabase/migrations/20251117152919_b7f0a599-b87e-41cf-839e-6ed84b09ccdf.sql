-- Create certificates table
CREATE TABLE public.certificates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  certificate_id TEXT NOT NULL UNIQUE,
  student_name TEXT NOT NULL,
  institution_name TEXT NOT NULL,
  certificate_type TEXT NOT NULL,
  domain TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  description TEXT,
  verification_url TEXT NOT NULL,
  qr_code_data TEXT NOT NULL,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read certificates (for verification)
CREATE POLICY "Certificates are viewable by everyone" 
ON public.certificates 
FOR SELECT 
USING (true);

-- Create policy to allow anyone to create certificates
CREATE POLICY "Anyone can create certificates" 
ON public.certificates 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_certificates_updated_at
BEFORE UPDATE ON public.certificates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster certificate lookup by certificate_id
CREATE INDEX idx_certificates_certificate_id ON public.certificates(certificate_id);
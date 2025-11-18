-- Add template_type column to certificates table
ALTER TABLE public.certificates 
ADD COLUMN template_type TEXT DEFAULT 'classic' CHECK (template_type IN ('classic', 'internship', 'training'));
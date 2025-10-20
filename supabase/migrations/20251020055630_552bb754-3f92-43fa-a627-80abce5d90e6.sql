-- Create assignments table
CREATE TABLE IF NOT EXISTS public.assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  course_name TEXT NOT NULL,
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  total_points INTEGER DEFAULT 100,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create assignment submissions table
CREATE TABLE IF NOT EXISTS public.assignment_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  student_name TEXT NOT NULL,
  submission_text TEXT,
  file_url TEXT,
  score INTEGER,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'graded', 'late')),
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  graded_at TIMESTAMP WITH TIME ZONE,
  feedback TEXT,
  UNIQUE(assignment_id, student_id)
);

-- Enable Row Level Security
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for assignments
-- Teachers can view all assignments they created
CREATE POLICY "Teachers can view their own assignments"
ON public.assignments
FOR SELECT
USING (auth.uid() = created_by);

-- Teachers can create assignments
CREATE POLICY "Teachers can create assignments"
ON public.assignments
FOR INSERT
WITH CHECK (auth.uid() = created_by);

-- Teachers can update their own assignments
CREATE POLICY "Teachers can update their own assignments"
ON public.assignments
FOR UPDATE
USING (auth.uid() = created_by);

-- Teachers can delete their own assignments
CREATE POLICY "Teachers can delete their own assignments"
ON public.assignments
FOR DELETE
USING (auth.uid() = created_by);

-- RLS Policies for assignment_submissions
-- Teachers can view all submissions for their assignments
CREATE POLICY "Teachers can view submissions for their assignments"
ON public.assignment_submissions
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.assignments
    WHERE assignments.id = assignment_submissions.assignment_id
    AND assignments.created_by = auth.uid()
  )
);

-- Students can view their own submissions
CREATE POLICY "Students can view their own submissions"
ON public.assignment_submissions
FOR SELECT
USING (auth.uid() = student_id);

-- Students can create their own submissions
CREATE POLICY "Students can submit assignments"
ON public.assignment_submissions
FOR INSERT
WITH CHECK (auth.uid() = student_id);

-- Teachers can update submissions (for grading)
CREATE POLICY "Teachers can grade submissions"
ON public.assignment_submissions
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.assignments
    WHERE assignments.id = assignment_submissions.assignment_id
    AND assignments.created_by = auth.uid()
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_assignment_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_assignments_updated_at
BEFORE UPDATE ON public.assignments
FOR EACH ROW
EXECUTE FUNCTION public.update_assignment_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_assignments_created_by ON public.assignments(created_by);
CREATE INDEX idx_assignment_submissions_assignment_id ON public.assignment_submissions(assignment_id);
CREATE INDEX idx_assignment_submissions_student_id ON public.assignment_submissions(student_id);
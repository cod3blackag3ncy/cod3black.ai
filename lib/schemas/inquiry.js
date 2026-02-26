import { z } from 'zod';

export const inquirySchema = z.object({
  // Section 1: Basics
  projectName: z.string().min(3, 'Project name required'),
  description: z.string().min(10, 'Description required'),
  problemStatement: z.string().min(5, 'Problem statement required'),
  projectType: z.enum(['website', 'web-app', 'mobile-app', 'integration', 'redesign', 'mvp', 'other']),
  
  // Section 2: Scope
  designScope: z.string().optional(),
  integrationCount: z.string().optional(),
  databaseNeeded: z.string().optional(),
  integrationTypes: z.array(z.string()).optional(),
  deploymentRequirements: z.array(z.string()).optional(),
  
  // Section 3: Timeline & Budget
  timeline: z.string().min(1, 'Timeline required'),
  budgetExpectation: z.string().min(1, 'Budget expectation required'),
  
  // Section 4: Team & Complexity
  techStack: z.string().optional(),
  existingCode: z.string().optional(),
  teamLevel: z.enum(['non-tech', 'mixed', 'strong-dev', 'enterprise']).optional(),
  specialRequirements: z.array(z.string()).optional(),
  
  // Section 5: Contact
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  company: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  contactMethod: z.string().optional(),
  additionalInfo: z.string().optional(),
  
  // Section 6: Partner Qualification
  partnerQualification: z.string().optional(),
  partnerDetails: z.string().optional(),
}).strict();

export function validateInquiry(data) {
  try {
    return { valid: true, data: inquirySchema.parse(data) };
  } catch (error) {
    return { valid: false, error: error.errors[0].message };
  }
}

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  Supabase credentials missing. Database storage disabled.');
  console.warn('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
}

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function saveInquiry(inquiryData, estimate, inquiryId) {
  if (!supabase) {
    console.log('Supabase not configured. Inquiry not saved to database.');
    return { id: inquiryId, success: false, reason: 'Database not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([{
        id: inquiryId,
        name: inquiryData.name,
        email: inquiryData.email,
        company: inquiryData.company,
        website: inquiryData.website,
        project_name: inquiryData.projectName,
        project_type: inquiryData.projectType,
        description: inquiryData.description,
        problem_statement: inquiryData.problemStatement,
        design_scope: inquiryData.designScope,
        integration_count: inquiryData.integrationCount,
        database_needed: inquiryData.databaseNeeded,
        integration_types: inquiryData.integrationTypes,
        deployment_requirements: inquiryData.deploymentRequirements,
        timeline: inquiryData.timeline,
        budget_expectation: inquiryData.budgetExpectation,
        tech_stack: inquiryData.techStack,
        existing_code: inquiryData.existingCode,
        team_level: inquiryData.teamLevel,
        special_requirements: inquiryData.specialRequirements,
        contact_method: inquiryData.contactMethod,
        additional_info: inquiryData.additionalInfo,
        partner_qualification: inquiryData.partnerQualification,
        partner_details: inquiryData.partnerDetails,
        estimated_hours: estimate.estimatedHours,
        estimated_tier: estimate.tier,
        estimated_complexity: estimate.complexity,
        estimated_monthly_rate: estimate.monthlyRate,
        is_partner_qualified: estimate.isPartnerQualified,
        status: 'new',
        created_at: new Date().toISOString(),
      }])
      .select();

    if (error) {
      console.error('Database error:', error);
      return { id: inquiryId, success: false, error: error.message };
    }

    return { id: inquiryId, success: true, data: data[0] };
  } catch (error) {
    console.error('Failed to save inquiry:', error);
    return { id: inquiryId, success: false, error: error.message };
  }
}

export async function getInquiry(inquiryId) {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .eq('id', inquiryId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to fetch inquiry:', error);
    return null;
  }
}

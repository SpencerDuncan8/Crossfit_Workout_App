// src/data/programTemplates.js

import { bodyweightBlastBeginnerTemplate } from './templates/bodyweightBlastBeginnerTemplate.js';
import { bodyweightBlastIntermediateTemplate } from './templates/bodyweightBlastIntermediateTemplate.js';
import { bodyweightBlastAdvancedTemplate } from './templates/bodyweightBlastAdvancedTemplate.js';
import { thirtyDayGfIntermediateTemplate } from './templates/thirtyDayGfIntermediateTemplate.js';
import { kettlebellKrusherTemplate } from './templates/kettlebellKrusherTemplate.js';
import { strengthFocusTemplate } from './templates/strengthFocusTemplate.js';
import { dumbbellDominationTemplate } from './templates/dumbbellDominationTemplate.js';
import { benchmarkWodsTemplate } from './templates/benchmarkWods.js';
import { heroWodsTemplate } from './templates/heroWods.js';
import { pullupChallengeTemplate } from './templates/pullupChallengeTemplate.js';
import { couchTo5kTemplate } from './templates/couchTo5kTemplate.js';
import { thirtyDayIntermediateFatLossTemplate } from './templates/thirtyDayIntermediateFatLossTemplate.js';
import { beginnerFatLoss20DayTemplate } from './templates/beginnerFatLoss20DayTemplate.js';
import { ironConditioningFoundationTemplate} from './templates/ironConditioningFoundationTemplate.js';
import { ironConditioningPowerTemplate} from './templates/ironConditioningPowerTemplate.js';
import { ironConditioningApexTemplate} from './templates/ironConditioningApexTemplate.js';
import { 
homeIronFoundationTemplate} from './templates/homeIronFoundationTemplate.js';
import { 
homeIronForgeTemplate} from './templates/homeIronForgeTemplate.js';
import { homeIronFinisherTemplate } from './templates/homeIronFinisherTemplate.js';

const allTemplates = [
  // Bodyweight Programs
  bodyweightBlastBeginnerTemplate,
  bodyweightBlastIntermediateTemplate,
  bodyweightBlastAdvancedTemplate,
  
  // Equipment-Based Programs
  thirtyDayIntermediateFatLossTemplate,
  kettlebellKrusherTemplate,
  strengthFocusTemplate,
  dumbbellDominationTemplate,
  
  // Specialty Programs & WODs
  benchmarkWodsTemplate,
  heroWodsTemplate,
  pullupChallengeTemplate,
  couchTo5kTemplate,
  thirtyDayGfIntermediateTemplate,
  beginnerFatLoss20DayTemplate,
  ironConditioningFoundationTemplate,
  ironConditioningPowerTemplate,
  ironConditioningApexTemplate,
  homeIronFoundationTemplate,
  homeIronForgeTemplate,
  homeIronFinisherTemplate,
];

// ---------------------------------------------------------------------------
// Private templates
// These are the author's own programs. They are hidden from the public Template
// Library, but can be revealed on a device by opening the site once with
// "?templates=all" on the end of the address (see TemplateLibrary.jsx).
// Users who already added one of these to their own programs keep it.
// NOTE: this list is kept separate from the template objects on purpose, so no
// extra field is copied into a user's program when they add a template.
// ---------------------------------------------------------------------------
export const PRIVATE_TEMPLATE_IDS = new Set([
  'template_iron_conditioning_foundation',
  'template_iron_conditioning_power',
  'template_iron_conditioning_apex',
  'template_home_iron_foundation',
  'template_home_iron_forge',
  'template_home_iron_finisher',
  'template_30_day_intermediate_fat_loss',
  'template_30_day_gf_intermediate',
  'template_beginner_fat_loss_20_day',
]);

// Small corrections applied on top of the template files.
const TEMPLATE_OVERRIDES = {
  'template-dumbbell-domination': {
    isTemplate: true,
    description: 'A 30-day functional fitness program built around dumbbells to develop strength and conditioning. Best suited to intermediate lifters.',
  },
};

export const programTemplates = allTemplates.map(t =>
  TEMPLATE_OVERRIDES[t.id] ? { ...t, ...TEMPLATE_OVERRIDES[t.id] } : t
);

export const isPrivateTemplate = (template) => PRIVATE_TEMPLATE_IDS.has(template.id);

// What the Template Library shows. Everyone sees the public templates;
// showAll also includes the private ones.
export const getLibraryTemplates = (showAll = false) =>
  showAll ? programTemplates : programTemplates.filter(t => !isPrivateTemplate(t));

// Equipment tags can list several items ("Barbell, Dumbbells"), so match
// against each item instead of the whole string.
export const templateHasEquipment = (template, equipment) =>
  String(template.meta?.equipment || '')
    .split(',')
    .map(e => e.trim())
    .includes(equipment);
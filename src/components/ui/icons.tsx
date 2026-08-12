/**
 * SMILE ARCHITECTS — ICON SYSTEM
 *
 * Single source of truth for every icon on the site.
 * Library: @tabler/icons-react (MIT, tree-shakable)
 *
 * Design rules:
 *   • 20px  nav / action / inline
 *   • 24px  card / feature default
 *   • 28px  section feature
 *   • 32px  hero / large feature
 *   • stroke 1.6–1.8  (refined, not chunky)
 *   • color: "currentColor" — inherits from parent, participates in hover transitions
 *   • Never use emoji replacements
 *   • Don't put an icon on every card — use them semantically
 */

import {
  IconDental,
  IconStethoscope,
  IconCalendarEvent,
  IconPhone,
  IconMapPin,
  IconClock,
  IconCheck,
  IconArrowRight,
  IconChevronDown,
  IconChevronLeft,
  IconX,
  IconBrandWhatsapp,
  IconScan,
  IconShieldCheck,
  IconSparkles,
  IconMoodSmile,
  IconDentalBroken,
  IconAward,
  IconUsers,
  IconBuildingHospital,
  IconHeartHandshake,
  IconMicroscope,
  IconSettings2,
  IconAlignBoxLeftMiddle,
  IconCircleCheck,
  IconSend,
  IconMail,
} from "@tabler/icons-react";

// ─── STANDARD SIZES ──────────────────────────────────────────────────────────

export type IconSize = "sm" | "md" | "lg" | "xl";

const SIZE_MAP: Record<IconSize, number> = {
  sm: 18,
  md: 22,
  lg: 26,
  xl: 32,
};

const STROKE = 1.65;

// ─── BASE PROPS ──────────────────────────────────────────────────────────────

interface IconProps {
  size?: IconSize | number;
  color?: string;
  stroke?: number;
  className?: string;
  "aria-hidden"?: boolean;
}

function resolveSize(size: IconSize | number = "md"): number {
  return typeof size === "number" ? size : SIZE_MAP[size];
}

function baseProps(props: IconProps) {
  return {
    size: resolveSize(props.size),
    color: props.color ?? "currentColor",
    stroke: props.stroke ?? STROKE,
    className: props.className,
    "aria-hidden": props["aria-hidden"] ?? true,
  };
}

// ─── DENTAL / MEDICAL ────────────────────────────────────────────────────────

/** Dental — teeth, general dental services, implants */
export const ToothIcon = (p: IconProps) => <IconDental {...baseProps(p)} />;

/** Stethoscope — doctors, medical team */
export const DoctorIcon = (p: IconProps) => <IconStethoscope {...baseProps(p)} />;

/** DentalBroken — orthodontics, braces */
export const OrthodonticsIcon = (p: IconProps) => <IconDentalBroken {...baseProps(p)} />;

/** Sparkles — cosmetic dentistry, smile design */
export const CosmeticIcon = (p: IconProps) => <IconSparkles {...baseProps(p)} />;

/** MoodSmile — smile design, aesthetics */
export const SmileDesignIcon = (p: IconProps) => <IconMoodSmile {...baseProps(p)} />;

/** Scan — digital X-ray, imaging */
export const XRayIcon = (p: IconProps) => <IconScan {...baseProps(p)} />;

/** ShieldCheck — sterilisation, safety, hygiene */
export const SafetyIcon = (p: IconProps) => <IconShieldCheck {...baseProps(p)} />;

/** Microscope — clinical precision */
export const PrecisionIcon = (p: IconProps) => <IconMicroscope {...baseProps(p)} />;

/** Settings2 — CAD/CAM, systems, lingual brackets */
export const SystemsIcon = (p: IconProps) => <IconSettings2 {...baseProps(p)} />;

/** AlignBoxLeftMiddle — aligners, ClearPath */
export const AlignersIcon = (p: IconProps) => <IconAlignBoxLeftMiddle {...baseProps(p)} />;

// ─── CLINIC / FACILITY ───────────────────────────────────────────────────────

/** BuildingHospital — clinic, facility */
export const ClinicIcon = (p: IconProps) => <IconBuildingHospital {...baseProps(p)} />;

/** HeartHandshake — patient-first, care philosophy */
export const CareIcon = (p: IconProps) => <IconHeartHandshake {...baseProps(p)} />;

/** Award — excellence, recognition, certifications */
export const AwardIcon = (p: IconProps) => <IconAward {...baseProps(p)} />;

/** Users — team, doctors */
export const TeamIcon = (p: IconProps) => <IconUsers {...baseProps(p)} />;

// ─── ACTIONS / NAVIGATION ────────────────────────────────────────────────────

/** ArrowRight — CTAs, links, "learn more" */
export const ArrowRightIcon = (p: IconProps) => <IconArrowRight {...baseProps(p)} />;

/** ChevronDown — dropdowns, accordions */
export const ChevronDownIcon = (p: IconProps) => <IconChevronDown {...baseProps(p)} />;

/** ChevronLeft — back links */
export const ChevronLeftIcon = (p: IconProps) => <IconChevronLeft {...baseProps(p)} />;

/** X — close, dismiss */
export const CloseIcon = (p: IconProps) => <IconX {...baseProps(p)} />;

/** Check — benefits, features, tick lists */
export const CheckIcon = (p: IconProps) => <IconCircleCheck {...baseProps(p)} />;

// ─── CONTACT / LOCATION ──────────────────────────────────────────────────────

/** Phone — call actions */
export const PhoneIcon = (p: IconProps) => <IconPhone {...baseProps(p)} />;

/** BrandWhatsapp — WhatsApp */
export const WhatsAppIcon = (p: IconProps) => <IconBrandWhatsapp {...baseProps(p)} />;

/** MapPin — address, directions */
export const MapPinIcon = (p: IconProps) => <IconMapPin {...baseProps(p)} />;

/** Clock — opening hours */
export const ClockIcon = (p: IconProps) => <IconClock {...baseProps(p)} />;

/** Calendar — appointments, booking */
export const CalendarIcon = (p: IconProps) => <IconCalendarEvent {...baseProps(p)} />;

/** Send — form submission, sending messages */
export const SendIcon = (p: IconProps) => <IconSend {...baseProps(p)} />;

/** Mail — email, contact */
export const MailIcon = (p: IconProps) => <IconMail {...baseProps(p)} />;

// ─── TREATMENT ICON SELECTOR ─────────────────────────────────────────────────

/**
 * Returns the semantically correct icon for a treatment slug.
 * Renders nothing for slugs without a clear semantic match
 * (better no icon than a generic one).
 */
export function TreatmentIconFor({
  slug,
  size = "md",
  color,
}: {
  slug: string;
  size?: IconSize | number;
  color?: string;
}) {
  const props: IconProps = { size, color };

  if (slug.includes("orthodontic") || slug.includes("braces") || slug.includes("lingual"))
    return <OrthodonticsIcon {...props} />;

  if (slug.includes("implant"))
    return <ToothIcon {...props} />;

  if (slug.includes("cosmetic") || slug.includes("whitening") || slug.includes("veneer"))
    return <CosmeticIcon {...props} />;

  if (slug.includes("smile-design"))
    return <SmileDesignIcon {...props} />;

  if (slug.includes("aligner") || slug.includes("clear"))
    return <AlignersIcon {...props} />;

  if (slug.includes("general") || slug.includes("check") || slug.includes("clean"))
    return <ToothIcon {...props} />;

  if (slug.includes("pediatric") || slug.includes("children"))
    return <CareIcon {...props} />;

  if (slug.includes("root-canal") || slug.includes("endodontic"))
    return <PrecisionIcon {...props} />;

  if (slug.includes("surgery") || slug.includes("extraction"))
    return <DoctorIcon {...props} />;

  // No icon for unmatched slugs — intentional
  return null;
}

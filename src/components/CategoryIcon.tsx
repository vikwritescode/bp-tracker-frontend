import {
  Accessibility,
  ArrowLeftRight,
  Baby,
  Banknote,
  Euro,
  BookOpen,
  Bot,
  Bomb,
  Brain,
  Building2,
  Church,
  CircleHelp,
  Compass,
  Cpu,
  Earth,
  EyeOff,
  FileText,
  Flag,
  Flame,
  Gavel,
  Globe,
  GraduationCap,
  HardHat,
  Heart,
  HeartHandshake,
  HeartPulse,
  History,
  Home,
  KeyRound,
  Landmark,
  Leaf,
  MapPin,
  Megaphone,
  Music,
  Palette,
  PawPrint,
  Pill,
  PlaneTakeoff,
  Scale,
  Shield,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Swords,
  TreeDeciduous,
  Trophy,
  Tv,
  Users,
  Venus,
  Vote,
  Zap,
  type LucideIcon,
  type LucideProps,
  Crown,
} from "lucide-react";
import type { Category } from "../interfaces";

export const CATEGORY_ICON_MAP: Record<Category, LucideIcon> = {
  Africa: Earth,
  "Animal Rights": PawPrint,
  Art: Palette,
  "Artificial Intelligence": Bot,
  Asia: Compass,
  Australia: MapPin,
  Charity: HeartHandshake,
  Children: Baby,
  Cities: Building2,
  "Climate Change": Flame,
  Colonialism: Crown,
  "Criminal Justice": Gavel,
  Culture: Music,
  Cybersecurity: ShieldAlert,
  Democracy: Vote,
  Development: HardHat,
  "Disability Rights": Accessibility,
  Drugs: Pill,
  Economics: Banknote,
  "Education/Academia": GraduationCap,
  "Elderly/Aging": HeartHandshake,
  Energy: Zap,
  Environment: Leaf,
  Ethics: BookOpen,
  Europe: Euro,
  Feminism: Venus,
  Healthcare: HeartPulse,
  "Historical Memory": History,
  Housing: Home,
  "Human Rights": Users,
  Immigration: PlaneTakeoff,
  "Indigenous People": TreeDeciduous,
  "International Relations": Globe,
  Labor: HardHat,
  "Latin America": Compass,
  Law: Scale,
  "LGBTQ+": Sparkles,
  Media: Tv,
  Medical: Stethoscope,
  "Mental Health": Brain,
  "Middle East": Compass,
  Military: Swords,
  "Minority Communities": Users,
  Nationalism: Flag,
  Philosophy: BookOpen,
  Police: Shield,
  Policy: FileText,
  Politics: Landmark,
  Privacy: EyeOff,
  "Private Property": KeyRound,
  "Refugees/Asylum": PlaneTakeoff,
  Religion: Church,
  "Romance/Sex": Heart,
  "Romance/Sexuality": Heart,
  "Science/Technology": Cpu,
  "Social Justice": Megaphone,
  "Social Policy": FileText,
  Sports: Trophy,
  Terrorism: Bomb,
  Trade: ArrowLeftRight,
};

export interface CategoryIconProps extends LucideProps {
  category?: string | null;
}

export const CategoryIcon = ({
  category,
  className = "h-4 w-4 shrink-0",
  ...props
}: CategoryIconProps) => {
  if (!category) {
    return <CircleHelp className={className} {...props} />;
  }

  const normalizedCategory = Object.keys(CATEGORY_ICON_MAP).find(
    (key) => key.toLowerCase() === category.toLowerCase().trim(),
  ) as Category | undefined;

  const IconComponent = normalizedCategory
    ? CATEGORY_ICON_MAP[normalizedCategory]
    : CircleHelp;

  return <IconComponent className={className} {...props} />;
};

export default CategoryIcon;

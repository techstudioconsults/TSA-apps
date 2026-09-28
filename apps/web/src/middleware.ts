import { NextResponse, type NextRequest } from "next/server";
import {
  CAMPAIGN_PREVIEW_COOKIE,
  isIndependenceActive,
} from "@/lib/campaigns/independence";

/**
 * Independence Month (1–30 Oct 2026): serve green versions of the blue image
 * assets. Same URLs, so no component changes are needed — requests for the
 * files listed in `config.matcher` are rewritten to
 * /public/campaigns/independence/<same path> while the campaign is on.
 * Outside the window this is a pass-through.
 */
export function middleware(request: NextRequest) {
  const preview = request.cookies.get(CAMPAIGN_PREVIEW_COOKIE)?.value;
  if (!isIndependenceActive(Date.now(), preview)) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  url.pathname = `/campaigns/independence${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Only the recoloured assets — nothing else goes through middleware.
  matcher: [
    "/images/:file(HeroBg\\.webp|pricebg\\.png|csctabg\\.png|datactabg\\.png|fsctabg\\.png|uictabg\\.png|guy-on-laptop\\.png|programming-coding1\\.png)",
    "/icons/:file(logo\\.png)",
    "/icons/:file(ArrowsClockwise|ArrowsClockwise2|basil_document-solid|Book|BookOpen|BookOpen2|Brain|Briefcase|Briefcase2|BriefcaseMetal|CalendarBlank|checkbox-fill|Clock|Code|Database|design|fa6-solid_users|FileText|FolderOpen|Globe|Globe2|GraduationCap|GraduationCap2|Headset|Kanban|Key|Laptop|Lightbulb|LightbulbFilament|LockKey|mark|mdi_file-tick|meteor-icons_linkedin|MonitorPlay|Network|Network2|PaintBrush|PenNib|PersonSimpleSwim|phone|puzzle|RocketLaunch|ShieldCheck|Stack|user|Users|Users2|UsersThree|VideoCamera|Warning|wifi)\\.svg",
  ],
};

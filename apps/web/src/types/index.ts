/**
 * Module re-exports for ambient global types declared in ./type.d.ts
 * This allows explicit importing of types in module files (ESM/TS) instead of relying on globals.
 */

export type CourseTag = globalThis.CourseTag;
export type GlobalCourse = globalThis.Course;

export type ProgramIntro = globalThis.ProgramIntro;
export type ProgramCard = globalThis.ProgramCard;
export type AboutCard = globalThis.AboutCard;
export type ProgramSectionOne = globalThis.ProgramSectionOne;
export type AboutOnlineSection = globalThis.AboutOnlineSection;
export type ProgramDuration = globalThis.ProgramDuration;

export type EducationPrograms = globalThis.EducationPrograms;

/* Global type declarations for importing CSS (global and modules) in Next.js */
declare module "*.css" {
  const content: { readonly [className: string]: string };
  export default content;
}

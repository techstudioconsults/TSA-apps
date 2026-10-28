import { Wrapper } from "@workspace/ui/lib";
import { FC, Fragment } from "react";
import type { LegalSection } from "./types";

interface LegalDocumentProps {
  sections: LegalSection[];
}

export const LegalDocument: FC<LegalDocumentProps> = ({ sections }) => {
  return (
    <Wrapper className="py-[64px]">
      <article className="mx-auto flex max-w-[860px] flex-col gap-10 text-neutral-700">
        {sections.map((section, index) => (
          <section key={section.title ?? index} className="flex flex-col gap-4">
            {section.title && (
              <h2 className="text-xl font-bold text-primary">
                {section.title}
              </h2>
            )}
            {section.blocks.map((block, i) => {
              if (block.type === "h") {
                return (
                  <h3 key={i} className="text-base font-semibold text-primary">
                    {block.text}
                  </h3>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={i} className="list-disc space-y-2 pl-6">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "contact") {
                return (
                  <ul key={i} className="list-disc space-y-2 pl-6">
                    {block.rows.map((row) => (
                      <li key={row.label} className="break-words">
                        {row.label}:{" "}
                        {row.links.map((link, linkIndex) => (
                          <Fragment key={link.text}>
                            {linkIndex > 0 && " / "}
                            {link.href ? (
                              <a
                                href={link.href}
                                className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
                                {...(link.href.startsWith("http")
                                  ? { target: "_blank", rel: "noreferrer" }
                                  : {})}
                              >
                                {link.text}
                              </a>
                            ) : (
                              link.text
                            )}
                          </Fragment>
                        ))}
                      </li>
                    ))}
                  </ul>
                );
              }
              return <p key={i}>{block.text}</p>;
            })}
          </section>
        ))}
      </article>
    </Wrapper>
  );
};

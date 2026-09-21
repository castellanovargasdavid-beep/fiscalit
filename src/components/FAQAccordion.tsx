import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
}

export function FAQAccordion({ items, title = "Preguntas frecuentes" }: FAQAccordionProps) {
  return (
    <section aria-labelledby="faq-heading" className="mt-16">
      <h2 id="faq-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
      <div className="mt-4 divide-y divide-zinc-200 dark:divide-zinc-800">
        {items.map((item) => (
          <details key={item.question} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {item.question}
              <ChevronDown
                className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

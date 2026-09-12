export default function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-prose">
      {eyebrow && (
        <p className="mb-2 text-sm text-amber-600 dark:text-amber-400">{eyebrow}</p>
      )}
      <h2 className="font-serif text-2xl font-semibold text-ink-900 dark:text-ink-100 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-ink-600 dark:text-ink-300">{description}</p>
      )}
    </div>
  );
}

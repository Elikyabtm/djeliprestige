type CommitmentItemProps = {
  number: string;
  title: string;
  text: string;
};

/** Engagement : colonne minimale séparée par un filet vertical. */
export function CommitmentItem({ number, title, text }: CommitmentItemProps) {
  return (
    <li className="border-t border-ink/10 py-10 md:border-t-0 md:border-l md:px-10 md:py-4 md:first:border-l-0 md:first:pl-0 lg:px-14">
      <p className="font-serif text-5xl font-light text-gold-deep">{number}</p>
      <h3 className="eyebrow mt-10 text-ink">{title}</h3>
      <p className="mt-4 max-w-xs font-serif text-2xl leading-snug font-light text-ink/75">{text}</p>
    </li>
  );
}

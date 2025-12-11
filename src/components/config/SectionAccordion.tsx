import './config.css';

type Props = {
  title: string;
  children: React.ReactNode;
};

function SectionAccordion({ title, children }: Props) {
  return (
    <details open className="section-accordion">
      <summary className="section-summary">{title}</summary>
      <div className="section-content">{children}</div>
    </details>
  );
}

export default SectionAccordion;

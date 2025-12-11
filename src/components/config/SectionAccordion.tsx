type Props = {
  title: string;
  children: React.ReactNode;
};

function SectionAccordion({ title, children }: Props) {
  return (
    <details open style={{ border: '1px solid #1f2937', borderRadius: 8, padding: 10, background: '#0f172a' }}>
      <summary style={{ cursor: 'pointer', fontWeight: 600, marginBottom: 8 }}>{title}</summary>
      <div style={{ marginTop: 8 }}>{children}</div>
    </details>
  );
}

export default SectionAccordion;

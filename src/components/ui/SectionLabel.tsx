interface SectionLabelProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionLabel({ label, title, subtitle }: SectionLabelProps) {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-4 bg-cyan-glow rounded-full" />
        <span className="section-label">{label}</span>
        <div className="flex-1 h-px bg-gradient-to-r from-cyan-glow/20 to-transparent" />
      </div>
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-[#8b949e] text-lg max-w-2xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
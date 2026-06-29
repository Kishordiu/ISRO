import type { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

export default function Panel({ title, subtitle, icon, action, className = "", children }: Props) {
  return (
    <section className={`card card-hover p-5 animate-fade-in ${className}`}>
      <header className="flex items-center gap-3 mb-4">
        {icon && (
          <div className="grid place-items-center h-9 w-9 rounded-xl bg-navy-500/10 text-navy-600 shrink-0">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h2 className="section-title leading-tight">{title}</h2>
          {subtitle && <p className="text-xs text-ink-muted mt-0.5">{subtitle}</p>}
        </div>
        {action && <div className="ml-auto">{action}</div>}
      </header>
      {children}
    </section>
  );
}

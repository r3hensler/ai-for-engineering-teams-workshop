import { Customer } from '@/data/mock-customers';

export interface CustomerCardProps {
  customer: Customer;
  onClick?: (customer: Customer) => void;
}

function getHealthColor(score: number): string {
  if (score <= 30) return 'bg-red-500';
  if (score <= 70) return 'bg-yellow-400';
  return 'bg-green-500';
}

function getHealthLabel(score: number): string {
  if (score <= 30) return 'Critical';
  if (score <= 70) return 'Warning';
  return 'Healthy';
}

export default function CustomerCard({ customer, onClick }: CustomerCardProps) {
  const { name, company, healthScore, domains } = customer;
  const healthColor = getHealthColor(healthScore);
  const healthLabel = getHealthLabel(healthScore);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(customer)}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(customer)}
      className="max-w-[400px] min-h-[120px] w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-gray-900">{name}</h3>
          <p className="truncate text-sm text-gray-500">{company}</p>
        </div>
        <div className="flex flex-shrink-0 flex-col items-center gap-1">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${healthColor} text-xs font-bold text-white`}
          >
            {healthScore}
          </div>
          <span className="text-xs text-gray-400">{healthLabel}</span>
        </div>
      </div>

      {domains && domains.length > 0 && (
        <div className="mt-3">
          {domains.length > 1 && (
            <p className="mb-1 text-xs font-medium text-gray-500">
              {domains.length} domains
            </p>
          )}
          <ul className="space-y-0.5">
            {domains.map((domain) => (
              <li key={domain} className="truncate text-xs text-gray-600">
                {domain}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

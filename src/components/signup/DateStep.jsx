import { useMemo } from 'react';
import Input from '../ui/Input';

const DateStep = ({ value, onChange, error }) => {
  // Calculate minimum date (tomorrow)
  const minDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }, []);

  // Calculate maximum date (6 months from now)
  const maxDate = useMemo(() => {
    const max = new Date();
    max.setMonth(max.getMonth() + 6);
    return max.toISOString().split('T')[0];
  }, []);

  // Format date for display
  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl">Wanneer wil je starten?</h2>
        <p className="mt-2 text-white/60">
          Kies de datum waarop je lidmaatschap moet ingaan. Vanaf deze datum worden de maandelijkse kosten geïncasseerd.
        </p>
      </div>

      <div className="mx-auto max-w-xs">
        <Input
          type="date"
          name="startDate"
          label="Startdatum"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={minDate}
          max={maxDate}
          error={error}
          required
          className="[&_input]:text-center"
        />
      </div>

      {value && (
        <div className="rounded-xl bg-white/5 p-4 text-center">
          <p className="text-sm text-white/60">Je lidmaatschap start op:</p>
          <p className="mt-1 font-display text-lg text-fitcity">
            {formatDisplayDate(value)}
          </p>
        </div>
      )}
    </div>
  );
};

export default DateStep;

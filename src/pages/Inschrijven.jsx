import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';
import Container from '../components/Container';
import Button from '../components/ui/Button';
import StepIndicator from '../components/signup/StepIndicator';
import MembershipSelector from '../components/signup/MembershipSelector';
import DateStep from '../components/signup/DateStep';
import PersonalInfoForm from '../components/signup/PersonalInfoForm';
import { plans } from '../data/memberships';

// Filter to only show signup-eligible plans
const signupPlans = plans.filter((p) => p.signupEligible !== false);

const INITIAL_FORM_DATA = {
  membershipId: '',
  startDate: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  street: '',
  houseNumber: '',
  houseNumberAddition: '',
  postalCode: '',
  city: '',
  agreeTerms: false,
};

const Inschrijven = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Pre-select plan from URL parameter
  useEffect(() => {
    const planId = searchParams.get('plan');
    if (planId && signupPlans.some((p) => p.id === planId)) {
      setFormData((prev) => ({ ...prev, membershipId: planId }));
    }
  }, [searchParams]);

  const selectedPlan = signupPlans.find((p) => p.id === formData.membershipId);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};

    if (stepNumber === 1) {
      if (!formData.membershipId) {
        newErrors.membershipId = 'Kies een abonnement';
      }
    }

    if (stepNumber === 2) {
      if (!formData.startDate) {
        newErrors.startDate = 'Kies een startdatum';
      } else {
        const date = new Date(formData.startDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date <= today) {
          newErrors.startDate = 'Startdatum moet in de toekomst liggen';
        }
      }
    }

    if (stepNumber === 3) {
      if (!formData.firstName?.trim()) newErrors.firstName = 'Verplicht';
      if (!formData.lastName?.trim()) newErrors.lastName = 'Verplicht';
      if (!formData.email?.trim()) {
        newErrors.email = 'Verplicht';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Ongeldig e-mailadres';
      }
      if (!formData.phone?.trim()) {
        newErrors.phone = 'Verplicht';
      }
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'Verplicht';
      } else {
        const dob = new Date(formData.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
        if (age < 13) newErrors.dateOfBirth = 'Minimaal 13 jaar oud';
      }
      if (!formData.street?.trim()) newErrors.street = 'Verplicht';
      if (!formData.houseNumber?.trim()) newErrors.houseNumber = 'Verplicht';
      if (!formData.postalCode?.trim()) {
        newErrors.postalCode = 'Verplicht';
      } else if (!/^[1-9][0-9]{3}\s?[A-Za-z]{2}$/.test(formData.postalCode)) {
        newErrors.postalCode = 'Ongeldige postcode';
      }
      if (!formData.city?.trim()) newErrors.city = 'Verplicht';
      if (!formData.agreeTerms) newErrors.agreeTerms = 'Je moet akkoord gaan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/start-signup-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Er is een fout opgetreden');
      }

      // Redirect to Mollie checkout
      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitError(error.message);
      setIsSubmitting(false);
    }
  };

  const formatPrice = (value) => `€${value.toFixed(2).replace('.', ',')}`;

  return (
    <AnimatedPage>
      <section className="min-h-screen py-24 lg:py-32">
        <Container size="md">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="font-display text-4xl lg:text-5xl">Inschrijven</h1>
            <p className="mt-4 text-lg text-white/60">
              Word lid van FitCity Culemborg
            </p>
          </div>

          {/* Step indicator */}
          <div className="mb-12">
            <StepIndicator currentStep={step} />
          </div>

          {/* Step content */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:p-10"
          >
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="font-display text-2xl">Kies je abonnement</h2>
                  <p className="mt-2 text-white/60">
                    Selecteer het abonnement dat bij jou past.
                  </p>
                </div>
                <MembershipSelector
                  plans={signupPlans}
                  selectedId={formData.membershipId}
                  onSelect={(id) => updateFormData('membershipId', id)}
                />
                {errors.membershipId && (
                  <p className="text-center text-sm text-red-400">
                    {errors.membershipId}
                  </p>
                )}
              </div>
            )}

            {step === 2 && (
              <DateStep
                value={formData.startDate}
                onChange={(value) => updateFormData('startDate', value)}
                error={errors.startDate}
              />
            )}

            {step === 3 && (
              <PersonalInfoForm
                data={formData}
                errors={errors}
                onChange={updateFormData}
              />
            )}

            {/* Submit error */}
            {submitError && (
              <div className="mt-6 rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-center">
                <p className="text-sm text-red-400">{submitError}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between gap-4">
              {step > 1 ? (
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  icon={ArrowLeft}
                  iconPosition="left"
                  disabled={isSubmitting}
                >
                  Terug
                </Button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <Button onClick={handleNext} icon={ArrowRight}>
                  Volgende
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="min-w-[200px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Bezig...
                    </>
                  ) : (
                    `Betaal €17,00`
                  )}
                </Button>
              )}
            </div>
          </motion.div>

          {/* Summary sidebar for larger screens */}
          {selectedPlan && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="text-sm font-medium text-white/60">
                Geselecteerd abonnement
              </h3>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-display text-lg">{selectedPlan.name}</span>
                <span className="text-fitcity">
                  {formatPrice(selectedPlan.price)} / {selectedPlan.period}
                </span>
              </div>
              <div className="mt-4 border-t border-white/10 pt-4">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-white/60">Inschrijfkosten (eenmalig)</span>
                  <span className="font-semibold">€17,00</span>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </AnimatedPage>
  );
};

export default Inschrijven;

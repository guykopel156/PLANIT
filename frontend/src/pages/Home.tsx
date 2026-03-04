import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  UIPrimaryButton,
  UISecondaryButton,
  UICard,
  UIInput,
  UIBadge,
  UIAlert,
  UIToggle,
  UIAvatar,
  UIIconButton,
} from '../UI';

function HeroSection(): React.ReactElement {
  return (
    <main className="flex flex-col items-center justify-center px-6 py-20">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">PLANIT</h2>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Your all-in-one trip planner</p>
    </main>
  );
}

function ShowcaseButtons(): React.ReactElement {
  return (
    <UICard title="Buttons" className="mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <UIPrimaryButton>Primary Button</UIPrimaryButton>
        <UIPrimaryButton disabled>Disabled</UIPrimaryButton>
        <UISecondaryButton>Secondary Button</UISecondaryButton>
        <UISecondaryButton disabled>Disabled</UISecondaryButton>
      </div>
    </UICard>
  );
}

function ShowcaseInputs(): React.ReactElement {
  const [inputValue, setInputValue] = useState('');
  const [isToggleChecked, setIsToggleChecked] = useState(false);

  return (
    <>
      <UICard title="Input" className="mb-6">
        <div className="max-w-sm">
          <UIInput
            label="Email address"
            placeholder="you@example.com"
            type="email"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
        </div>
      </UICard>
      <UICard title="Toggle" className="mb-6">
        <UIToggle
          checked={isToggleChecked}
          onChange={setIsToggleChecked}
          label="Enable notifications"
        />
      </UICard>
    </>
  );
}

function ShowcaseSection(): React.ReactElement {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-20">
      <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
        UI Component Library
      </h2>
      <ShowcaseButtons />
      <ShowcaseInputs />
      <UICard title="Badges" className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <UIBadge variant="info">Info</UIBadge>
          <UIBadge variant="success">Success</UIBadge>
          <UIBadge variant="warning">Warning</UIBadge>
          <UIBadge variant="error">Error</UIBadge>
        </div>
      </UICard>
      <ShowcaseAlerts />
      <UICard title="Avatars" className="mb-6">
        <div className="flex items-center gap-4">
          <UIAvatar name="John Doe" size="sm" />
          <UIAvatar name="Jane Smith" size="md" />
          <UIAvatar name="Alex Johnson" size="lg" />
        </div>
      </UICard>
    </section>
  );
}

function ShowcaseAlerts(): React.ReactElement {
  return (
    <UICard title="Alerts" className="mb-6">
      <div className="flex flex-col gap-4">
        <UIAlert variant="info" title="Information">
          This is an informational message.
        </UIAlert>
        <UIAlert variant="success" title="Success">
          Operation completed successfully.
        </UIAlert>
        <UIAlert variant="warning" title="Warning">
          Please review before proceeding.
        </UIAlert>
        <UIAlert variant="error" title="Error">
          Something went wrong.
        </UIAlert>
      </div>
    </UICard>
  );
}

function Home(): React.ReactElement {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="flex items-center justify-between p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">PLANIT</h1>
        <UIIconButton onClick={toggleTheme} ariaLabel="Toggle theme">
          {theme === "light" ? "\u{1F319}" : "\u{2600}\u{FE0F}"}
        </UIIconButton>
      </header>
      <HeroSection />
      <ShowcaseSection />
    </div>
  );
}

export default Home;

import { CalendarDays } from 'lucide-react';

export function CalendarRoute() {
  return (
    <div className="page">
      <h1>Calendar</h1>
      <section className="empty-state">
        <CalendarDays size={30} />
        <h2>Upcoming releases</h2>
        <p>Follow titles or people to build an upcoming release calendar and export it as ICS.</p>
      </section>
    </div>
  );
}

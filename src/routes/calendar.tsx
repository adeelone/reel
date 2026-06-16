import { CalendarDays } from 'lucide-react';

function emptyCalendar() {
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Reel//Release Calendar//EN', 'END:VCALENDAR'].join('\r\n');
}

export function CalendarRoute() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Calendar</h1>
        <button type="button" onClick={() => navigator.clipboard.writeText(emptyCalendar())}>
          Export ICS
        </button>
      </div>
      <section className="empty-state">
        <CalendarDays size={30} />
        <h2>Upcoming releases</h2>
        <p>Follow titles or people to build an upcoming release calendar and export it as ICS.</p>
      </section>
    </div>
  );
}

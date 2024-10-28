import React, { useState } from 'react';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarPage.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
    const [events, setEvents] = useState<Event[]>([]);

    const handleSelectSlot = async ({ start, end }: { start: Date; end: Date }) => {
        const title = window.prompt('Enter interview title, e.g., "Interview with John Doe"');
        
        if (title) {
            const newEvent = { start, end, title, allDay: false };
            setEvents([...events, newEvent]);
            
            // Send notification to applicant
            try {
                const response = await axios.post("http://localhost:8000/api/v1/users/notifyApplicant", {
                    title,
                    interviewDate: start,
                });

                if (response.status === 200) {
                    toast.success("Interview scheduled and notification sent to applicant");
                } else {
                    toast.error("Failed to send notification");
                }
            } catch (error) {
                toast.error("Error scheduling interview: " + error.message);
            }
        }
    };

    const handleEventClick = (event: Event) => {
        alert(`Event: ${event.title}`);
    };

    return (
        <div className="calendar-container">
            <h1 className="calendar-header">Job Application Calendar</h1>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={['month', 'week', 'day']}
                step={30}                  // Each slot represents 30 minutes
                timeslots={2}               // Show two timeslots per hour
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleEventClick}
                min={new Date(0, 0, 0, 9, 0)}   // Start at 9:00 AM
                max={new Date(0, 0, 0, 18, 0)}  // End at 6:00 PM
                style={{ height: '80vh', margin: '2rem' }}
            />
        </div>
    );
};

export default CalendarPage;

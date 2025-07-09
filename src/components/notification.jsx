import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationScheduler = ({ leads }) => {
  useEffect(() => {
    const now = new Date();

    leads.forEach((lead) => {
      const dateStr = lead.follow_up_date?.[0];    
      const timeRange = lead.follow_up_time?.[1]; 

      if (!dateStr || !timeRange) return;

      try {

        const [startTime] = timeRange.split('-'); // e.g. '16:00'

        // Parse the scheduled time
        const scheduledTime = new Date(`${dateStr}T${startTime}:00`);

        // Subtract 15 minutes
        scheduledTime.setMinutes(scheduledTime.getMinutes()); //-15

        const delay = scheduledTime.getTime() - now.getTime();

        if (delay > 0) {
          // console.log(` Scheduling notification for ${lead.fname} in ${Math.round(delay / 1000)} seconds`);

          const notify = () => {
            //  Browser Notification
            new Notification(' Follow-up Reminder', {
              body: `${lead.fname} ${lead.lname} — follow-up is in 15 minutes!`,
            });

            //  Toast Notification
            toast.info(` ${lead.fname} ${lead.lname} — follow-up in 15 minutes`, {
              position: 'top-right',
              autoClose: 7000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          };

          if (Notification.permission === 'granted') {
            setTimeout(notify, delay);
          } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((perm) => {
              if (perm === 'granted') {
                setTimeout(notify, delay);
              } else {
                console.warn(' Notification permission denied.');
              }
            });
          }
        } else {
          console.log(` Skipping ${lead.fname} — time already passed`);
        }
      } catch (err) {
        console.error(' Error scheduling notification for:', lead, err);
      }
    });
  }, [leads]);

  return null;
};

export default NotificationScheduler;

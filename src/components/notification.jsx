// components/notification.jsx
import React, { useEffect } from 'react';

const NotificationScheduler = ({ leads }) => {
  useEffect(() => {
    if (!("Notification" in window)) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Request permission if not granted
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    leads.forEach((lead) => {
      const followUpDate = lead.follow_up_date?.[0];
      if (followUpDate) {
        const date = new Date(followUpDate);
        date.setHours(0, 0, 0, 0);
        if (date.getTime() === today.getTime()) {
          // Show notification
          showNotification(lead);
        }
      }
    });
  }, [leads]);

  const showNotification = (lead) => {
    if (Notification.permission === "granted") {
      new Notification("📅 Today's Follow-up", {
        body: `${lead.fname} ${lead.lname} - ${lead.mobile}`,
        icon: '/followup-icon.png', // Optional: replace with your app logo/icon
      });
    }
  };

  return null;
};

export default NotificationScheduler;

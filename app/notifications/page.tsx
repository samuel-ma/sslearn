"use client"
import React, { useState } from "react"

export default function NotificationsPage() {
  // Sample notifications array; empty means no notifications.
  const [notifications] = useState<string[]>([])

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <p className="text-lg text-gray-600">No notifications available.</p>
      ) : (
        // ...existing notifications listing...
        notifications.map((n, i) => <p key={i}>{n}</p>)
      )}
    </div>
  )
}

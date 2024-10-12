// src/app/user/agent/dashboard/page.tsx
"use client";
import { withRole } from '@/utils/withRole';

function AgentDashboard() {
  return <div>Welcome to the Agent Dashboard</div>;
}

export default withRole(AgentDashboard, 'agent');

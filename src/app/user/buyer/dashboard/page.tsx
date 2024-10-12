// src/app/user/buyer/dashboard/page.tsx
"use client";
import { withRole } from '@/utils/withRole';

function BuyerDashboard() {
  return <div>Welcome to the Buyer Dashboard</div>;
}

export default withRole(BuyerDashboard, 'buyer');

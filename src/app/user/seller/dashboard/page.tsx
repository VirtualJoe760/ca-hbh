// src/app/user/seller/dashboard/page.tsx
"use client";
import { withRole } from '@/utils/withRole';

function SellerDashboard() {
  return <div>Welcome to the Seller Dashboard</div>;
}

export default withRole(SellerDashboard, 'seller');

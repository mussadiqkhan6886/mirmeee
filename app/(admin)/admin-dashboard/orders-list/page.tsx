import OrderTable from "@/components/adminComp/OrderTable";

export default async function OrdersPage() {
  try {
    // Call your API route
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order`, {
      next: {revalidate: 1}, // ensure fresh data every time
    });

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await res.json();
    const orders = data.orders;

    return <OrderTable orders={orders} />;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return <div className="text-center py-10">Failed to load orders.</div>;
  }
}


"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUser } from "@/context/UserContext";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import useSWR from "swr";

interface Orders {
  _id: string;
  _createdAt: string;
  total: number;
  products: {
    product: {
      title: string;
      image: string[];
      price: number;
    };
    quantity: number;
    size?: string;
  }[];
  status: string;
}

 function OrdersPage() {

  // const userId =  "d49WQ2pB7uisbExatf0UgP"

  const { user } = useUser(); 
  const userId = user?._id; 


  // Fetch function
  const fetchOrders = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch orders");

    return res.json();
  };

  // SWR hook to fetch data from API
  const { data, error, isLoading } = useSWR(
    userId ? `/api/orders?userId=${userId}` : null,
    fetchOrders,
    { refreshInterval: 60000 }
  );

  if (isLoading) return <div className="text-center py-8">Loading orders...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Failed to load orders</div>;

  if(!data) return <div className="text-center py-8 text-mygray">No orders found</div>

  const orders: Orders[] = data?.orders || [];

  console.log(orders)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Items</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{new Date(order._createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {order.products.length > 0 ? (

                    order.products.slice(0, 2).map((product, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        <Image
                          width={40}
                          height={40}
                          src={product?.product?.image ? urlFor(product.product.image).url() : "/images/logo.png"}
                          alt={product?.product?.title || "No name"}
                          className="w-10 h-10 rounded-md object-cover"
                        />
                        <span className="text-sm">{product?.product?.title || "Unnamed Product"}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-500">No items</span>
                  )}
                  {order.products.length > 2 && <span className="text-sm">+{order.products.length - 2} more</span>}
                </div>
              </TableCell>
              <TableCell className="text-right">${order.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


export default OrdersPage
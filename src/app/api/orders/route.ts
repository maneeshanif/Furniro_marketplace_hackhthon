
import { createClient } from '@sanity/client';
import { NextResponse ,NextRequest } from 'next/server';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, 
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-01-01' 
});



const generateKey = () => {
  return Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
};


export async function POST(req:NextRequest) {
  try {
    const body = await req.json();
    const { userId, billingDetails = {}, orderItems = [], total, status = 'pending' } = body;
    console.log(body)

    if (!userId || !orderItems.length) {
      console.log("userid and orderitem not equal")
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // interface BillingDetails {
    //   street?: string;
    //   city?: string;
    //   province?: string;
    //   country?: string;
    // }

    interface OrderItem {
      id: string;
      quantity?: number;
    }

    interface Order {
      _type: string;
      _key: string;
      customer: {
        _type: string;
        _ref: string;
        _key: string;
      };
      products: {
        product: {
          _type: string;
          _ref: string;
        };
        _key: string;
      }[];
      status: string;
      address: string;
      city: string;
      state: string;
      country: string;
      total: number;
    }

    const order: Order = {
      _type: 'orders',
      _key: generateKey(),
      customer: {
        _type: 'reference',
        _ref: userId,
        _key: generateKey()
      },
      products: orderItems.map((item: OrderItem) => ({
        product: {
          _type: 'reference',
          _ref: item.id
        },
        _key: generateKey(),
      })),
      status,
      address: billingDetails.street || '',
      city: billingDetails.city || '',
      state: billingDetails.province || '',
      country: billingDetails.country || '',
      total: total || 0
    };

    const result = await client.create(order);

    // Update user's `orders` field
    await client
      .patch(userId)
      .setIfMissing({ orders: [] })
      .append('orders', [{ _type: 'reference', _ref: result._id }])
      .commit();

    return NextResponse.json({ success: true, orderId: result._id });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ success: false, error: "Invalid Error" }, { status: 500 });
  }
}






export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
  }

  try {
 
    const orders = await client.fetch(
      `*[_type == "orders" && customer._ref == $userId] {
        _id,
        _createdAt,
        total,
        products[] {
          "product": product->{
            title,  // Ensure this matches your schema
            image,
            price
          },
          quantity,
          size
        },
        status
      }`,
      { userId }
    );


    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { OrderManagementService, OrderItem, CustomerInfo } from '@/utils/orderManagement';
import { books } from '@/data/books';

// GET /api/orders - Get all orders (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (email) {
      // Get orders by customer email
      const orders = await OrderManagementService.getOrdersByEmail(email);
      return NextResponse.json({ orders });
    } else {
      // Get all orders (in production, add admin authentication)
      const orders = await OrderManagementService.getAllOrders();
      return NextResponse.json({ orders });
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customer, paymentMethod, paymentIntentId, paypalOrderId } = body;

    // Validate required fields
    if (!items || !customer || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields: items, customer, paymentMethod' },
        { status: 400 }
      );
    }

    // Convert cart items to order items
    const orderItems: OrderItem[] = items.map((item: any) => {
      const book = books.find(b => b.id === item.bookId);
      if (!book) {
        throw new Error(`Book not found: ${item.bookId}`);
      }
      
      return {
        bookId: item.bookId,
        quantity: item.quantity,
        price: item.price,
        book
      };
    });

    // Create order
    const order = await OrderManagementService.createOrder(
      orderItems,
      customer,
      paymentMethod,
      paymentIntentId,
      paypalOrderId
    );

    return NextResponse.json({ 
      success: true, 
      order,
      message: 'Order created successfully' 
    });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create order' },
      { status: 400 }
    );
  }
}

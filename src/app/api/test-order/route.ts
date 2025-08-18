import { NextRequest, NextResponse } from 'next/server';
import { OrderManagementService } from '@/utils/orderManagement';
import { books } from '@/data/books';

export async function POST(request: NextRequest) {
  try {
    // Get a sample book for testing
    const sampleBook = books[0];
    
    // Create test customer info
    const customerInfo = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+44 123 456 7890',
      address: {
        line1: '123 Test Street',
        line2: 'Test Apartment',
        city: 'London',
        state: 'SW1A 1AA',
        postalCode: 'SW1A 1AA',
        country: 'GB'
      }
    };

    // Create test order items
    const orderItems = [
      {
        bookId: sampleBook.id,
        quantity: 2,
        price: sampleBook.price,
        book: sampleBook
      }
    ];

    // Create order
    const order = await OrderManagementService.createOrder(
      orderItems,
      customerInfo,
      'test',
      'test_payment_id_123'
    );

    // Confirm payment
    await OrderManagementService.confirmPayment(order.id, 'test_payment_id_123');

    // Process order
    await OrderManagementService.processOrder(order.id);

    // Ship order
    await OrderManagementService.shipOrder(order.id, 'ROYAL_MAIL_1ST_CLASS');

    return NextResponse.json({
      success: true,
      message: 'Test order created and processed successfully',
      order: {
        id: order.id,
        status: order.status,
        total: order.total,
        customerEmail: order.customer.email,
        items: order.items.map(item => ({
          bookTitle: item.book.title,
          quantity: item.quantity,
          price: item.price
        }))
      }
    });

  } catch (error) {
    console.error('Test order creation failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create test order',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get all orders
    const orders = await OrderManagementService.getAllOrders();
    
    return NextResponse.json({
      success: true,
      message: 'Orders retrieved successfully',
      count: orders.length,
      orders: orders.map(order => ({
        id: order.id,
        status: order.status,
        total: order.total,
        customerEmail: order.customer.email,
        createdAt: order.createdAt,
        items: order.items.map(item => ({
          bookTitle: item.book.title,
          quantity: item.quantity
        }))
      }))
    });

  } catch (error) {
    console.error('Failed to retrieve orders:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to retrieve orders',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

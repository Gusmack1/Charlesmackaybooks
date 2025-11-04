import { NextRequest, NextResponse } from 'next/server';
import { OrderManagementService } from '@/utils/orderManagement';

// GET /api/orders/[id] - Get specific order
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const orderId = id;
    const order = await OrderManagementService.getOrder(orderId);
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ order });

  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

// PATCH /api/orders/[id] - Update order status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const orderId = id;
    const body = await request.json();
    const { action, ...data } = body;

    let order;

    switch (action) {
      case 'confirm_payment':
        order = await OrderManagementService.confirmPayment(orderId, data.paymentIntentId);
        break;
      
      case 'process':
        order = await OrderManagementService.processOrder(orderId);
        break;
      
      case 'ship':
        order = await OrderManagementService.shipOrder(orderId, data.trackingNumber);
        break;
      
      case 'deliver':
        order = await OrderManagementService.deliverOrder(orderId);
        break;
      
      case 'cancel':
        order = await OrderManagementService.cancelOrder(orderId, data.reason);
        break;
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({ 
      success: true, 
      order,
      message: `Order ${action.replace('_', ' ')} successful` 
    });

  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update order' },
      { status: 400 }
    );
  }
}

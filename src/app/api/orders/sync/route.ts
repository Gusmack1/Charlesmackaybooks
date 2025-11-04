import { NextRequest, NextResponse } from 'next/server';
import { OrderManagementService, Order } from '@/utils/orderManagement';

// POST /api/orders/sync - Sync an order from localStorage to OrderManagementService
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { order } = body;

    if (!order || !order.id) {
      return NextResponse.json(
        { error: 'Invalid order data' },
        { status: 400 }
      );
    }

    // Sync order to OrderManagementService
    const syncedOrder = await OrderManagementService.syncOrder(order as Order);

    return NextResponse.json({ 
      success: true, 
      order: syncedOrder,
      message: 'Order synced successfully' 
    });

  } catch (error) {
    console.error('Error syncing order:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to sync order' },
      { status: 500 }
    );
  }
}


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

    // Ensure dates are Date objects before syncing
    const orderToSync: Order = {
      ...order,
      createdAt: order.createdAt instanceof Date 
        ? order.createdAt 
        : order.createdAt 
          ? new Date(order.createdAt) 
          : new Date(),
      updatedAt: order.updatedAt instanceof Date 
        ? order.updatedAt 
        : order.updatedAt 
          ? new Date(order.updatedAt) 
          : new Date(),
      estimatedDelivery: order.estimatedDelivery 
        ? (order.estimatedDelivery instanceof Date 
          ? order.estimatedDelivery 
          : new Date(order.estimatedDelivery))
        : undefined,
    };

    // Sync order to OrderManagementService
    const syncedOrder = await OrderManagementService.syncOrder(orderToSync);

    // Verify it was synced
    const verifyOrder = await OrderManagementService.getOrder(orderToSync.id);
    if (!verifyOrder) {
      return NextResponse.json(
        { error: 'Order sync failed - order not found after sync' },
        { status: 500 }
      );
    }

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


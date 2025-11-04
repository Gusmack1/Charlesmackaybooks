import { NextRequest, NextResponse } from 'next/server';
import { OrderManagementService } from '@/utils/orderManagement';
import { convertLegacyOrderToNew } from '@/utils/orderSync';

// Helper function to get order from localStorage (server-side compatible)
async function getOrderFromLocalStorage(orderId: string): Promise<any> {
  // This is a placeholder - actual localStorage access happens client-side
  // We'll handle this by having the client sync orders to OrderManagementService
  return null;
}

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

    // Check if order exists in OrderManagementService
    let order = await OrderManagementService.getOrder(orderId);
    
    // If order not found and we're trying to update it, return error
    // (We can't load from localStorage server-side, so client needs to sync first)
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found. Please ensure the order is synced to the system.' },
        { status: 404 }
      );
    }

    let updatedOrder;

    switch (action) {
      case 'confirm_payment':
        updatedOrder = await OrderManagementService.confirmPayment(orderId, data.paymentIntentId);
        break;
      
      case 'process':
        updatedOrder = await OrderManagementService.processOrder(orderId);
        break;
      
      case 'dispatch':
        updatedOrder = await OrderManagementService.dispatchOrder(orderId, data.trackingNumber);
        break;
      
      case 'ship':
        updatedOrder = await OrderManagementService.shipOrder(orderId, data.trackingNumber);
        break;
      
      case 'deliver':
        updatedOrder = await OrderManagementService.deliverOrder(orderId);
        break;
      
      case 'cancel':
        updatedOrder = await OrderManagementService.cancelOrder(orderId, data.reason);
        break;
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    // Note: localStorage updates will be handled client-side
    // The order response includes all updated data for client to sync

    return NextResponse.json({ 
      success: true, 
      order: updatedOrder,
      message: `Order ${action.replace('_', ' ')} successful`,
      // Include legacy format for localStorage sync
      legacyOrder: (action === 'dispatch' || action === 'ship' || action === 'cancel' || action === 'confirm_payment') ? {
        orderId: updatedOrder.id,
        status: action === 'dispatch' ? 'dispatched' : 
                action === 'ship' ? 'shipped' : 
                action === 'cancel' ? 'cancelled' :
                action === 'confirm_payment' ? 'paid' :
                updatedOrder.status,
        trackingNumber: updatedOrder.trackingNumber,
        updatedAt: updatedOrder.updatedAt.toISOString()
      } : undefined
    });

  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update order' },
      { status: 400 }
    );
  }
}

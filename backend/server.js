const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock database for orders (in production, use a real database)
let orders = [];
let orderCounter = 1;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get catalog endpoint
app.get('/api/catalog', (req, res) => {
  try {
    // Read the catalog.json file from the frontend
    const catalogPath = path.join(__dirname, '../catalog.json');
    const catalogData = fs.readFileSync(catalogPath, 'utf8');
    const catalog = JSON.parse(catalogData);
    
    res.json(catalog);
  } catch (error) {
    console.error('Error reading catalog:', error);
    res.status(500).json({ error: 'Failed to load catalog' });
  }
});

// Create order endpoint (integrates with MCP)
app.post('/api/orders', async (req, res) => {
  try {
    const { customer_identifier, account_identifier, order_info } = req.body;
    
    // Validate required fields
    if (!customer_identifier || !account_identifier || !order_info) {
      return res.status(400).json({ 
        error: 'Missing required fields: customer_identifier, account_identifier, order_info' 
      });
    }

    if (!order_info.utid || !order_info.amount || !order_info.recipient) {
      return res.status(400).json({ 
        error: 'Missing required order_info fields: utid, amount, recipient' 
      });
    }

    // Generate a unique reference order ID
    const referenceOrderID = `RA-${String(orderCounter).padStart(8, '0')}`;
    orderCounter++;

    // Create order record
    const order = {
      referenceOrderID,
      status: 'COMPLETE', // In demo mode, all orders are immediately complete
      utid: order_info.utid,
      rewardName: getRewardNameByUtid(order_info.utid),
      recipient: {
        email: order_info.recipient.email
      },
      sendEmail: order_info.sendEmail || true,
      deliveryMethod: 'EMAIL',
      externalRefID: order_info.externalRefID,
      amount: order_info.amount,
      createdAt: new Date().toISOString(),
      // Demo fields
      demo: true,
      message: order_info.message,
      senderName: `${order_info.senderFirstName} ${order_info.senderLastName}`,
    };

    // Store order in mock database
    orders.push(order);

    console.log('Order created:', {
      referenceOrderID,
      recipient: order_info.recipient.email,
      amount: order_info.amount,
      utid: order_info.utid
    });

    // In a real implementation, you would call the MCP API here:
    /*
    const mcpResponse = await fetch('MCP_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MCP_AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    */

    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get order by reference ID
app.get('/api/orders/:referenceOrderId', (req, res) => {
  try {
    const { referenceOrderId } = req.params;
    const order = orders.find(o => o.referenceOrderID === referenceOrderId);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Get all orders (for admin/testing)
app.get('/api/orders', (req, res) => {
  try {
    // Sort by creation date, newest first
    const sortedOrders = orders.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    res.json({
      orders: sortedOrders,
      total: orders.length
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Helper function to get reward name by UTID
function getRewardNameByUtid(utid) {
  const rewardNames = {
    'U163059': 'Amazon eGift Card',
    'U761382': 'Starbucks Card',
    'U147689': 'PayPal USD',
    'U792088': 'Visa Prepaid Card USD',
    'U561593': 'Reward Link Preferred + Donations'
  };
  return rewardNames[utid] || 'Digital Gift Card';
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Kyron HR Backend running on http://localhost:${PORT}`);
  console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
  console.log(`🎁 Gift Catalog: http://localhost:${PORT}/api/catalog`);
  console.log(`📋 Orders: http://localhost:${PORT}/api/orders`);
});

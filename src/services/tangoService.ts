// Tango MCP Integration Service
// This service handles communication with the Tango MCP API for gift card orders

import type { Incentive, GiftCard } from '../types';

interface TangoOrderRequest {
  customer_identifier: string;
  account_identifier: string;
  order_info: {
    utid: string;
    amount: number;
    recipient: {
      email: string;
      firstName: string;
      lastName: string;
    };
    sendEmail: boolean;
    externalRefID?: string;
    message?: string;
    senderFirstName?: string;
    senderLastName?: string;
    senderEmail?: string;
    emailSubject?: string;
  };
}

interface TangoOrderResponse {
  referenceOrderID: string;
  status: string;
  utid: string;
  rewardName: string;
  recipient: {
    email: string;
  };
  sendEmail: boolean;
  deliveryMethod: string;
  externalRefID?: string;
}

class TangoService {
  private baseUrl = 'http://localhost:3001/api'; // Backend proxy URL
  
  // In a real implementation, these would be stored securely
  private customerId = 'kyron-hr-customer';
  private accountId = 'kyron-hr-main-account';

  /**
   * Create a new incentive order via Tango MCP
   */
  async createIncentiveOrder(incentive: Partial<Incentive>, recipient: {
    firstName: string;
    lastName: string;
    email: string;
  }, manager: {
    firstName: string;
    lastName: string;
    email: string;
  }): Promise<TangoOrderResponse> {
    
    const orderRequest: TangoOrderRequest = {
      customer_identifier: this.customerId,
      account_identifier: this.accountId,
      order_info: {
        utid: incentive.giftCardUtid!,
        amount: incentive.amount!,
        recipient: {
          email: recipient.email,
          firstName: recipient.firstName,
          lastName: recipient.lastName,
        },
        sendEmail: true,
        externalRefID: `kyron-${Date.now()}`,
        message: incentive.message || `Recognition from ${manager.firstName} ${manager.lastName}: ${incentive.reason}`,
        senderFirstName: manager.firstName,
        senderLastName: manager.lastName,
        senderEmail: manager.email,
        emailSubject: `🎉 You've received recognition from ${manager.firstName}!`,
      }
    };

    try {
      // This would call your backend proxy which then calls the MCP API
      const response = await fetch(`${this.baseUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify(orderRequest),
      });

      if (!response.ok) {
        throw new Error(`Order failed: ${response.statusText}`);
      }

      const result: TangoOrderResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to create Tango order:', error);
      throw error;
    }
  }

  /**
   * Get catalog items from local storage or backend
   */
  async getCatalog(): Promise<GiftCard[]> {
    try {
      // First try to load from local catalog.json
      const response = await fetch('/catalog.json');
      if (response.ok) {
        const catalog = await response.json();
        return this.transformCatalogToGiftCards(catalog);
      }
      
      // Fallback to backend API
      const backendResponse = await fetch(`${this.baseUrl}/catalog`);
      const catalog = await backendResponse.json();
      return this.transformCatalogToGiftCards(catalog);
    } catch (error) {
      console.error('Failed to load catalog:', error);
      // Return mock data as fallback
      return this.getMockGiftCards();
    }
  }

  /**
   * Check order status
   */
  async checkOrderStatus(referenceOrderId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/orders/${referenceOrderId}`, {
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to check order status: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to check order status:', error);
      throw error;
    }
  }

  /**
   * Transform catalog data to GiftCard format
   */
  private transformCatalogToGiftCards(catalog: any): GiftCard[] {
    if (!catalog.brands) return [];
    
    return catalog.brands.flatMap((brand: any) => 
      brand.items
        .filter((item: any) => item.fulfillmentType === 'DIGITAL')
        .map((item: any) => ({
          brandKey: brand.brandKey,
          brandName: brand.brandName,
          utid: item.utid,
          rewardName: item.rewardName,
          minValue: item.minValue || 1,
          maxValue: item.maxValue || 1000,
          imageUrl: brand.imageUrls?.['200w-326ppi'] || '',
          description: brand.shortDescription || brand.description || '',
          fulfillmentType: item.fulfillmentType,
        }))
    );
  }

  /**
   * Get authentication token (implement based on your auth system)
   */
  private getAuthToken(): string {
    // In a real app, this would retrieve the actual auth token
    return 'your-auth-token-here';
  }

  /**
   * Mock gift cards for fallback
   */
  private getMockGiftCards(): GiftCard[] {
    return [
      {
        brandKey: 'B916708',
        brandName: 'Amazon.com',
        utid: 'U163059',
        rewardName: 'Amazon eGift Card',
        minValue: 0.01,
        maxValue: 2000,
        imageUrl: 'https://dwwvg90koz96l.cloudfront.net/images/brands/b916708-200w-326ppi.png',
        description: 'Amazon.com Gift Cards never expire and can be redeemed towards millions of items.',
        fulfillmentType: 'DIGITAL',
      },
      {
        brandKey: 'B942204',
        brandName: 'Starbucks',
        utid: 'U761382',
        rewardName: 'Starbucks Card',
        minValue: 5.0,
        maxValue: 500.0,
        imageUrl: 'https://dwwvg90koz96l.cloudfront.net/images/brands/b942204-200w-326ppi.png',
        description: 'A Starbucks Card can bring a little goodness into everyone\'s day.',
        fulfillmentType: 'DIGITAL',
      },
    ];
  }
}

export const tangoService = new TangoService();
export default TangoService;

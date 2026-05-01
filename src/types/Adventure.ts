export interface Adventure {
  id: number;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  minPeople: number;
  maxPeople: number;
  minTariff: number;
  status: 'pending_group' | 'confirmed' | 'full';
  members: Member[];
  priceTable: PriceTable[];
  creatorId: number;
  paymentStatus: boolean;
}

export interface PriceTable{
    price: number;
    persons: number;
}

export interface Member {
    userId: number;
    adventureId: number;
    joinedAt: string;
}